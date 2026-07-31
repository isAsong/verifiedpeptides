// scripts/download-coas-puppeteer.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, 'image-manifest.json');
const IMAGE_DIR = path.join(__dirname, '../public/images/coas');

// 确保目录存在
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// 读取图片清单
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ 找不到图片清单，请先运行 node scripts/convert-coas.js');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

/**
 * 使用 Puppeteer 下载图片
 */
async function downloadWithPuppeteer() {
  console.log('🚀 启动浏览器...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // 设置视口和用户代理
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });

  // 先访问一次首页以获取 cookie
  console.log('🌐 初始化会话...');
  await page.goto('https://verifiedpeptides.com/lab-reports/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  let success = 0,
    failed = 0,
    skipped = 0;

  for (const item of manifest) {
    const { url, filename } = item;
    const filepath = path.join(IMAGE_DIR, filename);

    if (fs.existsSync(filepath)) {
      console.log(`⏭️  跳过已存在: ${filename}`);
      skipped++;
      continue;
    }

    try {
      console.log(`⬇️  下载: ${filename}`);
      // 直接访问图片 URL
      const response = await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      if (response && response.status() === 200) {
        const buffer = await response.buffer();
        fs.writeFileSync(filepath, buffer);
        success++;
        console.log(`✅ 成功: ${filename}`);
      } else {
        throw new Error(`HTTP ${response ? response.status() : 'unknown'}`);
      }
    } catch (err) {
      console.error(`❌ 失败: ${filename} - ${err.message}`);
      failed++;
    }

    // 延迟，避免请求过快
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  await browser.close();
  console.log(`\n📊 下载完成: 成功 ${success}, 失败 ${failed}, 跳过 ${skipped}`);
}

downloadWithPuppeteer().catch((err) => {
  console.error('❌ 程序异常:', err);
  process.exit(1);
});