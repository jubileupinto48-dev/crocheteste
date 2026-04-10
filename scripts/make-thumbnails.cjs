const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const THUMBS = path.join(__dirname, '../public/thumbnails');
const OUT_W = 600;
const OUT_H = 400;
const BAR_H = 39;
const CONTENT_H = OUT_H - BAR_H; // 361

// Layout: top row (2 cols), bottom row (3 cols)
const LAYOUT_2_3 = [
  { x: 0,   y: 0,   w: 300, h: 183 },
  { x: 301, y: 0,   w: 299, h: 183 },
  { x: 0,   y: 184, w: 200, h: 177 },
  { x: 201, y: 184, w: 200, h: 177 },
  { x: 402, y: 184, w: 198, h: 177 },
];

// Layout: 2x2 grid
const LAYOUT_2_2 = [
  { x: 0,   y: 0,   w: 300, h: 181 },
  { x: 301, y: 0,   w: 299, h: 181 },
  { x: 0,   y: 182, w: 300, h: 179 },
  { x: 301, y: 182, w: 299, h: 179 },
];

// Layout: 3 cols top, 2 cols bottom
const LAYOUT_3_2 = [
  { x: 0,   y: 0,   w: 200, h: 183 },
  { x: 201, y: 0,   w: 200, h: 183 },
  { x: 402, y: 0,   w: 198, h: 183 },
  { x: 0,   y: 184, w: 300, h: 177 },
  { x: 301, y: 184, w: 299, h: 177 },
];

async function createCollage(outputName, photoPaths, layout) {
  const canvas = new Jimp({ width: OUT_W, height: OUT_H, color: 0xf8f0f8ff });

  for (let i = 0; i < Math.min(photoPaths.length, layout.length); i++) {
    const cell = layout[i];
    const imgPath = path.join(THUMBS, photoPaths[i]);
    if (!fs.existsSync(imgPath)) {
      console.warn(`  WARN: ${photoPaths[i]} not found, skipping`);
      continue;
    }
    try {
      const img = await Jimp.read(imgPath);
      // Cover: resize to fill cell, then crop to exact size
      img.cover({ w: cell.w, h: cell.h });
      canvas.composite(img, cell.x, cell.y);
    } catch (e) {
      console.warn(`  WARN: Could not process ${photoPaths[i]}: ${e.message}`);
    }
  }

  // Pink-purple gradient bar at bottom (simulate with solid color)
  const bar = new Jimp({ width: OUT_W, height: BAR_H, color: 0xc45fa0ff });
  canvas.composite(bar, 0, CONTENT_H);

  const outPath = path.join(THUMBS, outputName);
  await canvas.write(outPath);
  console.log(`  ✓ ${outputName}`);
}

async function main() {
  console.log('Creating module thumbnail collages...\n');

  await createCollage('modulo-chapeus-thumb.jpg', [
    'hat-2463525.jpg',
    'hat-732425.jpg',
    'hat-11964380.jpg',
    'hat-2976288.jpg',
    'hat-8092097.jpg',
  ], LAYOUT_2_3);

  await createCollage('modulo-iniciante-thumb.jpg', [
    'crochet-hook-pink.jpg',
    'crochet-hands-purple.jpg',
    'yarn-13428009.jpg',
    'knitting-books.jpg',
  ], LAYOUT_2_2);

  await createCollage('modulo-receitas-thumb.jpg', [
    'knitting-books.jpg',
    'amigurumi-2731820.jpg',
    'yarn-13428009.jpg',
    'woman-books.jpg',
    'crochet-hands-purple.jpg',
  ], LAYOUT_3_2);

  await createCollage('modulo-infantil-thumb.jpg', [
    'baby-713959.jpg',
    'amigurumi-2731820.jpg',
    'crochet-hook-pink.jpg',
    'woman-blanket.jpg',
  ], LAYOUT_2_2);

  await createCollage('modulo-sapatinhos-thumb.jpg', [
    'amigurumi-2731820.jpg',
    'crochet-hook-pink.jpg',
    'baby-713959.jpg',
    'crochet-hands-purple.jpg',
    'yarn-13428009.jpg',
  ], LAYOUT_3_2);

  await createCollage('modulo-bolsas-thumb.jpg', [
    'bag-11124945.jpg',
    'bag-1936848.jpg',
    'crochet-hook-pink.jpg',
    'woman-blanket.jpg',
  ], LAYOUT_2_2);

  console.log('\nDone!');
}

main().catch(console.error);
