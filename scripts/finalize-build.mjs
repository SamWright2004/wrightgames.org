import { copyFile } from 'node:fs/promises';
// Preserve the exact historic .html endpoint as well as the /games/ directory route.
await copyFile(
  new URL('../dist/games/index.html', import.meta.url),
  new URL('../dist/games.html', import.meta.url),
);
