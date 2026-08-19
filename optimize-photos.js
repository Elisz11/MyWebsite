// scripts/optimize-images.js
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const SOURCE_DIR = 'public/photos/full';
const OUTPUT_DIR = 'public/photos/optimized';
const SIZES = [400];
const FORMATS = ['webp'];
const JPEG_QUALITY = 80;

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function optimizeImage(inputPath, relativePath) {
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputBase = path.join(OUTPUT_DIR, path.dirname(relativePath), baseName);

  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();

  for (const format of FORMATS) {
    for (const width of SIZES) {
      if (metadata.width && metadata.width < width) continue;

      const outputPath = `${outputBase}.${format}`;
      await ensureDir(path.dirname(outputPath));

      let pipeline = image.clone().resize(width);

      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: JPEG_QUALITY });
      }

      await pipeline.toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }
  }
}

async function walkDirectory(dir, baseDir = '') {
  let results = [];
  const list = await fs.readdir(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      results = results.concat(await walkDirectory(filePath, path.join(baseDir, file)));
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      results.push({ fullPath: filePath, relativePath: path.join(baseDir, file) });
    }
  }
  return results;
}

async function main() {
  console.log('Scanning images...');
  const images = await walkDirectory(SOURCE_DIR);
  if (images.length === 0) {
    console.log('No images found.');
    return;
  }

  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });

  for (const img of images) {
    await optimizeImage(img.fullPath, img.relativePath);
  }
  console.log('All images optimized!');
}

main().catch(console.error);