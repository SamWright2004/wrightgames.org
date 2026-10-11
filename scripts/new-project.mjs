import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { parseArgs } from 'node:util';

export async function createProject({
  title,
  category = 'film',
  status = 'development',
  slug,
  root = fileURLToPath(new URL('../', import.meta.url)),
}) {
  if (!title?.trim())
    throw new Error(
      'Provide a project title. Example: npm run new:project -- "My new film" --category film',
    );
  if (!['film', '3d', 'design', 'interactive'].includes(category))
    throw new Error('Category must be film, 3d, design or interactive.');
  if (!['complete', 'development', 'concept', 'archive'].includes(status))
    throw new Error(
      'Status must be complete, development, concept or archive.',
    );
  const id =
    slug ??
    title
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
    throw new Error(
      'Use --slug with lowercase letters, numbers and hyphens only.',
    );
  const destination = path.join(root, 'src/content/projects', `${id}.md`);
  await mkdir(path.dirname(destination), { recursive: true });
  const metadata = {
    title: title.trim(),
    summary:
      'Add a short description of the work and what makes it interesting.',
    categories: [category],
    status,
    role: 'Add your specific contribution',
    draft: true,
  };
  const contents = [
    '---',
    ...Object.entries(metadata).map(
      ([key, value]) => `${key}: ${JSON.stringify(value)}`,
    ),
    '# Uncomment when you have an image:',
    `# cover: { "src": "/media/${id}/cover.jpg", "alt": "Describe the image" }`,
    '# featured: 5',
    '# tools: ["Blender"]',
    '# videos: [{ "id": "YOUTUBE_ID_", "title": "Full film" }]',
    '---',
    '',
    '## The project',
    '',
    'What did you make, and why?',
    '',
    '## My contribution',
    '',
    'Describe what you personally did. Credit collaborators where relevant.',
    '',
    '## The process',
    '',
    'Add the decisions, challenges or experiments that matter. Delete this section if the work speaks for itself.',
    '',
  ].join('\n');
  // Never overwrite an existing project, including on repeat runs.
  await writeFile(destination, contents, { flag: 'wx' });
  await mkdir(path.join(root, 'public/media', id), { recursive: true });
  return { id, destination };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  try {
    const { values, positionals } = parseArgs({
      options: {
        category: { type: 'string' },
        status: { type: 'string' },
        slug: { type: 'string' },
        help: { type: 'boolean' },
      },
      allowPositionals: true,
    });
    if (values.help) {
      console.log(
        'npm run new:project -- "Project title" [--category film|3d|design|interactive] [--status complete|development|concept|archive] [--slug url-name]',
      );
    } else {
      const result = await createProject({
        title: positionals.join(' '),
        category: values.category,
        status: values.status,
        slug: values.slug,
      });
      console.log(
        `Created ${result.destination}\nAdd images to public/media/${result.id}/.\nRun npm run dev to preview /work/${result.id}/.\nSet draft: false when ready to include it in a production build.`,
      );
    }
  } catch (error) {
    console.error(
      error.code === 'EEXIST'
        ? 'That project already exists. Choose another title or --slug; no file was overwritten.'
        : error.message,
    );
    process.exitCode = 1;
  }
}
