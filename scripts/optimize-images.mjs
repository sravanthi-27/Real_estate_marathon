import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/images');
const supported = new Set(['.png', '.jpg', '.jpeg']);

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findImages(fullPath);
    return supported.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  }));
  return files.flat();
}

const files = await findImages(root);
let optimized = 0;
let savedBytes = 0;

for (const file of files) {
  const destination = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const sourceInfo = await stat(file);
  try {
    const outputInfo = await stat(destination);
    if (outputInfo.mtimeMs >= sourceInfo.mtimeMs) continue;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const result = await sharp(file)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(destination);

  optimized += 1;
  savedBytes += sourceInfo.size - result.size;
}

console.log(`Optimized ${optimized} of ${files.length} images; saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB.`);
