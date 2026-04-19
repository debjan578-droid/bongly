import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '../src/frontend/public/assets');

await sharp(join(assetsDir, 'chalok-logo.png'))
  .webp({ quality: 92, lossless: false, effort: 6 })
  .toFile(join(assetsDir, 'chalok-logo.webp'))
  .then(info => console.log('WebP created successfully:', JSON.stringify(info)))
  .catch(err => { console.error('Error:', err); process.exit(1); });
