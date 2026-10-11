import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createProject } from '../scripts/new-project.mjs';

test('new projects safely handle titles, default to drafts, and cannot overwrite content', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-'));
  try {
    const project = await createProject({
      title: 'A film: "Between Worlds"',
      category: 'film',
      root,
    });
    assert.equal(project.id, 'a-film-between-worlds');
    const content = await readFile(project.destination, 'utf8');
    assert.match(content, /draft: true/);
    assert.match(content, /title: "A film: \\"Between Worlds\\""/);
    await assert.rejects(
      createProject({ title: 'A film: "Between Worlds"', root }),
      { code: 'EEXIST' },
    );
    assert.equal(await readFile(project.destination, 'utf8'), content);
    await assert.rejects(
      createProject({ title: 'Test', slug: '../escape', root }),
      /lowercase/,
    );
    await assert.rejects(
      createProject({ title: 'Test', category: 'invalid', root }),
      /Category/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
