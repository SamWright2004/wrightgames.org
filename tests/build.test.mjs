import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? filesIn(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
async function exists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}
function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&quot;', '"');
}

test('every generated internal link and local media file resolves', async () => {
  const pages = (await filesIn(dist)).filter((file) => file.endsWith('.html'));
  assert.ok(
    pages.length >= 20,
    'Expected all portfolio pages in dist; run npm run build first.',
  );
  const broken = [];
  for (const file of pages) {
    const html = await readFile(file, 'utf8');
    const relative = path.relative(dist, file).replaceAll(path.sep, '/');
    const base = new URL(
      relative.endsWith('index.html') ? relative.slice(0, -10) : relative,
      'https://wrightgames.org/',
    );
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const value = decode(match[1]);
      if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(value)) continue;
      const url = new URL(value, base);
      const local = path.join(dist, decodeURIComponent(url.pathname));
      if (
        !(await exists(local)) &&
        !(await exists(path.join(local, 'index.html')))
      )
        broken.push(`${relative}: ${value}`);
    }
  }
  assert.deepEqual(broken, []);
});

test('preserves privacy policy and legacy game routes', async () => {
  const original = await readFile(path.join(root, 'pTable.html'), 'utf8');
  assert.equal(
    await readFile(path.join(dist, 'pTable.html'), 'utf8'),
    original,
  );
  assert.equal(
    await readFile(path.join(dist, 'pTable/index.html'), 'utf8'),
    original,
  );
  assert.ok(await exists(path.join(dist, 'games/index.html')));
  assert.ok(await exists(path.join(dist, 'games.html')));
  assert.equal(
    (await readFile(path.join(dist, 'CNAME'), 'utf8')).trim(),
    'wrightgames.org',
  );
});

test('project bodies render without JavaScript and embeds wait for interaction', async () => {
  const film = await readFile(
    path.join(dist, 'work/across-the-field/index.html'),
    'utf8',
  );
  assert.match(film, /My contribution/);
  assert.match(film, /Editing/);
  assert.match(film, /youtube.com\/watch\?v=B2sAUnq1YBw/);
  assert.doesNotMatch(film, /<iframe/);
  const home = await readFile(path.join(dist, 'index.html'), 'utf8');
  for (const title of [
    'pTable',
    'The relic',
    'Black hole',
    'New home',
    'Across the Field',
  ])
    assert.ok(home.includes(title), title);
  assert.doesNotMatch(home, /jquery|elfsight|googletagmanager/);
});

test('production drafts are absent from pages, navigation and sitemap', async () => {
  const projects = await readdir(path.join(root, 'src/content/projects'));
  const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  for (const filename of projects.filter((file) => file.endsWith('.md'))) {
    const contents = await readFile(
      path.join(root, 'src/content/projects', filename),
      'utf8',
    );
    if (!/^draft:\s*true\s*$/m.test(contents)) continue;
    const id = filename.slice(0, -3);
    assert.equal(
      await exists(path.join(dist, 'work', id, 'index.html')),
      false,
    );
    assert.ok(!sitemap.includes(`/work/${id}/`));
    for (const listing of [
      'index.html',
      'work/index.html',
      'development/index.html',
      'games/index.html',
    ]) {
      assert.ok(
        !(await readFile(path.join(dist, listing), 'utf8')).includes(
          `/work/${id}/`,
        ),
      );
    }
  }
});
