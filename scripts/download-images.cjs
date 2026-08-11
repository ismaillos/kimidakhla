const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://eaq4q5ztpfe7c.kimi.page/images';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images');

const images = [
  'bio-eclat-1.webp',
  'bio-eclat-2.webp',
  'bio-eclat-3.webp',
  'bio-eclat-4.webp',
  'biotin-1.webp',
  'biotin-2.webp',
  'biotin/biotin-ingredients-1.webp',
  'blush-1.webp',
  'blush-2.webp',
  'blush-3.webp',
  'blush-4.webp',
  'cycle-bio-1.webp',
  'cycle-bio-2.webp',
  'cycle-bio-3.webp',
  'cycle-bio-4.webp',
  'eclarte-1.webp',
  'eclarte-2.webp',
  'eclarte-3.webp',
  'eclarte-4.webp',
  'eclat-artisan-1.webp',
  'eclat-artisan-2.webp',
  'eclat-artisan-3.webp',
  'eclat-artisan-4.webp',
  'eclat-artisan-card.webp',
  'elixir-1.webp',
  'elixir-2.webp',
  'elixir-maca-1.webp',
  'elixir-maca-2.webp',
  'elixir-maca-3.webp',
  'elixir-maca-4.webp',
  'feminite-1.webp',
  'feminite-2.webp',
  'floro-calm-1.webp',
  'floro-calm-3.webp',
  'floro-calm-4.webp',
  'floro-calm-pack-1.webp',
  'floro-calm/floro-calm-athlete-1.webp',
  'hemorcalm-1.webp',
  'hemorcalm-2.webp',
  'hemorcalm-3.webp',
  'hemorcalm-4.webp',
  'huile-1.webp',
  'huile-2.webp',
  'loubane-1.webp',
  'loubane-2.webp',
  'loubane-3.webp',
  'loubane-4.webp',
  'loubane-card.webp',
  'masque-1.webp',
  'masque-2.webp',
  'pack-anti-chute-1.webp',
  'pack-anti-chute.webp',
  'pack-anti-gris.webp',
  'pack-feminite.webp',
  'psoriasis-1.webp',
  'psoriasis-2.webp',
  'psoriasis-3.webp',
  'psoriasis-4.webp',
  'rawnaq-1.webp',
  'rawnaq-2.webp',
  'rawnaq-3.webp',
  'rawnaq-4.webp',
  'retinol-pack-1.webp',
  'retinol-pack-2.webp',
  'serum-1.webp',
  'serumintime-1.webp',
  'serumintime-2.webp',
  'shampoing-proteines-1.webp',
  'shampoing-proteines-2.webp',
  'shampoing-proteines-3.webp',
  'shampoing-proteines-4.webp',
  'shampoing.webp',
  'spray-1.webp',
  'spray-2.webp',
  'toutia/toutia.webp',
  'tranquilysse-1.webp',
  'tranquilysse-2.webp',
  'tranquilysse-3.webp',
  'tranquilysse-4.webp',
  'v-eclat-1.webp',
  'v-eclat-2.webp',
  'v-eclat-3.webp',
  'v-eclat-4.webp',
  'vitamin-c-1.webp',
  'vitamin-c-2.webp',
  'vitamin-c-3.webp',
  'vitamin-c-4.webp',
  'vitamined3k2/d3k2-2.webp',
  'vitamined3k2/d3k2.webp',
];

function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log(`Downloading ${images.length} images...`);
  for (const img of images) {
    const url = `${BASE_URL}/${img}`;
    const outputPath = path.join(OUTPUT_DIR, img);
    try {
      await downloadFile(url, outputPath);
      console.log(`✓ ${img}`);
    } catch (err) {
      console.error(`✗ ${img}: ${err.message}`);
    }
  }
  console.log('Done!');
}

downloadAll();
