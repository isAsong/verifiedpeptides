// scripts/download-coas-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const MANIFEST_PATH = path.join(__dirname, 'image-manifest.json');
const IMAGE_DIR = path.join(__dirname, '../public/images/coas');

// 确保目录存在
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// 读取清单
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ 找不到图片清单，请先运行 node scripts/convert-coas.js');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

// 下载单张图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
        fileStream.on('error', reject);
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
      }
    }).on('error', reject);
  });
}

// 主函数
async function downloadAll() {
  let success = 0, failed = 0, skipped = 0;

  for (const item of manifest) {
    const { url, filename } = item;
    const filepath = path.join(IMAGE_DIR, filename);

    // 如果已存在，跳过
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  跳过已存在: ${filename}`);
      skipped++;
      continue;
    }

    try {
      console.log(`⬇️  下载: ${filename}`);
      await downloadImage(url, filepath);
      success++;
    } catch (err) {
      console.error(`❌ 下载失败: ${filename} - ${err.message}`);
      failed++;
    }

    // 延迟，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log(`\n📊 下载完成: 成功 ${success}, 失败 ${failed}, 跳过 ${skipped}`);
}

downloadAll();