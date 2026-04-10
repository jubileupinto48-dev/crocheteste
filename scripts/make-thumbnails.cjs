const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

const THUMBS = path.join(__dirname, '../public/thumbnails');
const OUT_W = 600;
const OUT_H = 400;
const BAR_H = 39;
const CONTENT_H = OUT_H - BAR_H; // 361

// Layout: single full photo
const LAYOUT_1 = [
  { x: 0, y: 0, w: OUT_W, h: CONTENT_H },
];

// Layout: 2 side by side
const LAYOUT_2H = [
  { x: 0,   y: 0, w: 299, h: CONTENT_H },
  { x: 301, y: 0, w: 299, h: CONTENT_H },
];

// Layout: left big + right stack of 2
const LAYOUT_BIG_LEFT = [
  { x: 0,   y: 0,   w: 340, h: CONTENT_H },
  { x: 342, y: 0,   w: 257, h: 178 },
  { x: 342, y: 183, w: 257, h: 178 },
];

// Layout: top big + 3 bottom
const LAYOUT_TOP_BIG = [
  { x: 0,   y: 0,   w: OUT_W, h: 220 },
  { x: 0,   y: 222, w: 198,   h: 139 },
  { x: 201, y: 222, w: 198,   h: 139 },
  { x: 402, y: 222, w: 198,   h: 139 },
];

// Layout: 2x2
const LAYOUT_2X2 = [
  { x: 0,   y: 0,   w: 299, h: 178 },
  { x: 301, y: 0,   w: 299, h: 178 },
  { x: 0,   y: 183, w: 299, h: 178 },
  { x: 301, y: 183, w: 299, h: 178 },
];

// Layout: 3 side by side
const LAYOUT_3H = [
  { x: 0,   y: 0, w: 198, h: CONTENT_H },
  { x: 201, y: 0, w: 198, h: CONTENT_H },
  { x: 402, y: 0, w: 198, h: CONTENT_H },
];

async function createCollage(outputName, photoPaths, layout) {
  const canvas = new Jimp({ width: OUT_W, height: OUT_H, color: 0xf8f0f8ff });

  for (let i = 0; i < Math.min(photoPaths.length, layout.length); i++) {
    const cell = layout[i];
    const imgPath = path.join(THUMBS, photoPaths[i]);
    if (!fs.existsSync(imgPath)) {
      console.warn(`  WARN: ${photoPaths[i]} not found`);
      continue;
    }
    try {
      const img = await Jimp.read(imgPath);
      img.cover({ w: cell.w, h: cell.h });
      canvas.composite(img, cell.x, cell.y);
    } catch (e) {
      console.warn(`  WARN: ${photoPaths[i]}: ${e.message}`);
    }
  }

  // Pink-purple bar
  const bar = new Jimp({ width: OUT_W, height: BAR_H, color: 0xc45fa0ff });
  canvas.composite(bar, 0, CONTENT_H);

  await canvas.write(path.join(THUMBS, outputName));
  console.log(`  ✓ ${outputName}`);
}

async function main() {
  console.log('Gerando thumbnails dos módulos...\n');

  // CHAPÉUS: chapéu rosa de crochê (foto real do próprio módulo) + foto de tutorial
  await createCollage('modulo-chapeus-thumb.jpg', [
    'chapeu-gdrive-2.jpg',         // chapéu rosa de crochê real
    'ini-vimeo-1167451668.jpg',    // mãos fazendo correntinha (crochê)
  ], LAYOUT_BIG_LEFT.slice(0, 2).map((c, i) =>
    i === 0 ? { x: 0, y: 0, w: OUT_W, h: CONTENT_H } : null
  ).filter(Boolean).concat([]).length > 0
    ? LAYOUT_2H
    : LAYOUT_1);

  // Usar layout simples para chapéus - foto grande do chapéu
  const chapeuPath = path.join(THUMBS, 'chapeu-gdrive-2.jpg');
  if (fs.existsSync(chapeuPath)) {
    const canvas = new Jimp({ width: OUT_W, height: OUT_H, color: 0x000000ff });
    const img = await Jimp.read(chapeuPath);
    img.cover({ w: OUT_W, h: CONTENT_H });
    canvas.composite(img, 0, 0);
    const bar = new Jimp({ width: OUT_W, height: BAR_H, color: 0xc45fa0ff });
    canvas.composite(bar, 0, CONTENT_H);
    await canvas.write(path.join(THUMBS, 'modulo-chapeus-thumb.jpg'));
    console.log('  ✓ modulo-chapeus-thumb.jpg (single)');
  }

  // BOLSAS: 3 bolsas de crochê lindas — foto perfeita já existe
  const bolsasPath = path.join(THUMBS, 'bolsas-mochilas.jpg');
  if (fs.existsSync(bolsasPath)) {
    const canvas = new Jimp({ width: OUT_W, height: OUT_H, color: 0x000000ff });
    const img = await Jimp.read(bolsasPath);
    img.cover({ w: OUT_W, h: CONTENT_H });
    canvas.composite(img, 0, 0);
    const bar = new Jimp({ width: OUT_W, height: BAR_H, color: 0xc45fa0ff });
    canvas.composite(bar, 0, CONTENT_H);
    await canvas.write(path.join(THUMBS, 'modulo-bolsas-thumb.jpg'));
    console.log('  ✓ modulo-bolsas-thumb.jpg (single)');
  }

  // INICIANTE: 4 fotos reais de mãos fazendo crochê (do próprio curso da Josi)
  await createCollage('modulo-iniciante-thumb.jpg', [
    'ini-vimeo-1167451333.jpg',   // mão segurando agulha
    'ini-vimeo-1167451433.jpg',   // duas mãos com agulha
    'ini-vimeo-1167451668.jpg',   // mãos fazendo crochê
    'ini-vimeo-1167451940.jpg',   // mãos fazendo correntinha
  ], LAYOUT_2X2);

  // INFANTIL: bebê com roupa de crochê + roupinhas expostas
  await createCollage('modulo-infantil-thumb.jpg', [
    'inf-yt-EJQXSPohZqc.jpg',              // bebê usando roupa de crochê com cerejas
    'inf-yt-k2ugSEGPnFo.jpg',             // vestido rosa + bebê usando
    'roupas-infantis.jpg',                  // roupinhas expostas na gaveta
  ], LAYOUT_BIG_LEFT);

  // SAPATINHOS: sapatinhos de crochê reais do módulo
  await createCollage('modulo-sapatinhos-thumb.jpg', [
    'sap2-1TKrQJzB1KeJ_mstEKtqAHuFDMG5yck6O.jpg',  // sapatinho rosa sendo segurado
    'sap2-1QzvUSSDvol9K9YYnWHYtLxIgB5r8HDhh.jpg',  // tênis azul de crochê
    'sap2-1X-RTGw7Bc8SvdxycEzQY1-aIINT_OpY0.jpg',  // croc rosa de crochê
  ], LAYOUT_3H);

  // RECEITAS: livros de receitas com fios (perfeito para +2000 modelos)
  const receitasPath = path.join(THUMBS, 'todas-receitas.jpg');
  if (fs.existsSync(receitasPath)) {
    const canvas = new Jimp({ width: OUT_W, height: OUT_H, color: 0x000000ff });
    const img = await Jimp.read(receitasPath);
    img.cover({ w: OUT_W, h: CONTENT_H });
    canvas.composite(img, 0, 0);
    const bar = new Jimp({ width: OUT_W, height: BAR_H, color: 0xc45fa0ff });
    canvas.composite(bar, 0, CONTENT_H);
    await canvas.write(path.join(THUMBS, 'modulo-receitas-thumb.jpg'));
    console.log('  ✓ modulo-receitas-thumb.jpg (single)');
  }

  console.log('\nPronto!');
}

main().catch(console.error);
