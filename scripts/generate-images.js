const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [720, 1200, 1600];
const srcBase = path.join('assets', 'img', 'header-1-');

async function generate() {
  for (const s of sizes) {
    const src = `${srcBase}${s}.jpg`;
    if (!fs.existsSync(src)) {
      console.warn(`Source not found: ${src} — skipping`);
      continue;
    }

    const webpOut = `${srcBase}${s}.webp`;
    const avifOut = `${srcBase}${s}.avif`;

    try {
      await sharp(src)
        .webp({ quality: 80 })
        .toFile(webpOut);
      await sharp(src)
        .avif({ quality: 50 })
        .toFile(avifOut);
      console.log(`Generated: ${webpOut}, ${avifOut}`);
    } catch (err) {
      console.error(`Error processing ${src}:`, err.message || err);
    }
  }
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
