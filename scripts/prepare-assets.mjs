import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public');
await mkdir(output, { recursive: true });
// Original files stay at their existing paths in Git. Copy them for static publishing.
for (const filename of ['images', 'CNAME', '.htaccess', 'pTable.html']) {
  await cp(path.join(root, filename), path.join(output, filename), {
    recursive: true,
  });
}
// Preserve the app's extensionless privacy-policy URL on static hosts too.
await mkdir(path.join(output, 'pTable'), { recursive: true });
await cp(
  path.join(root, 'pTable.html'),
  path.join(output, 'pTable/index.html'),
);
console.log(
  'Prepared original images, domain configuration and pTable privacy routes.',
);
