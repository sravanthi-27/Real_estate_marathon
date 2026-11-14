/**
 * Creates every /public/images/<page> folder and writes public/images/IMAGES.md
 * listing the exact file names each page expects (read from src/config/images.js).
 * Run:  npm run images
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/config/images.js'), 'utf8').replace('export const images =', 'const images =');
const images = new Function(`${src}; return images;`)();

const flatten = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(flatten) : Object.values(v).flatMap(flatten));
const files = [...new Set(flatten(images))];

const byFolder = {};
for (const f of files) {
  const [, root, ...parts] = f.split('/');
  if (root !== 'images' || parts.length === 0) throw new Error(`Invalid image path in src/config/images.js: ${f}`);
  const name = parts.pop();
  const folder = parts.join('/');
  (byFolder[folder] ||= []).push(name);
}

let md = '# Image checklist\n\nAdd your images with EXACTLY these names. Until a file exists, a soft placeholder is shown.\nPaths are defined in `src/config/images.js` (change a name there if you prefer a different file name).\nRe-generate this file any time with `npm run images`.\n';
for (const [folder, names] of Object.entries(byFolder)) {
  const dir = join(root, 'public/images', folder);
  mkdirSync(dir, { recursive: true });
  if (folder && !existsSync(join(dir, '.gitkeep'))) writeFileSync(join(dir, '.gitkeep'), '');
  md += `\n## public/images/${folder ? `${folder}/` : ''}\n${names.map((n) => `- ${n}`).join('\n')}\n`;
}
writeFileSync(join(root, 'public/images/IMAGES.md'), md);
console.log(`Created ${Object.keys(byFolder).length} folders, ${files.length} image slots. See public/images/IMAGES.md`);
