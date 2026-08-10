// scripts/download-coas-stable.js
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// 本地 Chrome 可执行文件路径
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\Asong\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
];

let chromeExecutable = CHROME_PATHS.find(p => fs.existsSync(p));
if (!chromeExecutable) {
  console.error('❌ 未找到本地 Chrome 安装，请安装 Chrome 或指定路径。');
  process.exit(1);
}
console.log(`✅ 使用 Chrome: ${chromeExecutable}`);

const MANIFEST_PATH = path.join(__dirname, 'image-manifest.json');
const IMAGE_DIR = path.join(__dirname, '../public/images/coas');

if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error('❌ 找不到图片清单，请先运行 node scripts/convert-coas.js');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

async function downloadAll() {
  const browser = await puppeteer.launch({
    executablePath: chromeExecutable,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // 防止 /dev/shm 不足
      '--disable-gpu',
    ],
  });

  // 初始化会话（获取 cookies）
  const initPage = await browser.newPage();
  await initPage.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  await initPage.setViewport({ width: 1280, height: 800 });
  console.log('🌐 初始化会话...');
  await initPage.goto('https://verifiedpeptides.com/lab-reports/', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });
  await initPage.close();

  let success = 0,
    failed = 0,
    skipped = 0;

  // 串行下载
  for (const item of manifest) {
    const { url, filename } = item;
    const filepath = path.join(IMAGE_DIR, filename);

    if (fs.existsSync(filepath)) {
      console.log(`⏭️  跳过已存在: ${filename}`);
      skipped++;
      continue;
    }

    // 每个任务使用独立的页面，用完关闭
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    try {
      console.log(`⬇️  下载: ${filename}`);
      const response = await page.goto(url, {
        waitUntil: 'load',
        timeout: 30000,
      });

      if (response && response.status() === 200) {
        const buffer = await response.buffer();
        fs.writeFileSync(filepath, buffer);
        console.log(`✅ 成功: ${filename}`);
        success++;
      } else {
        throw new Error(`HTTP ${response ? response.status() : 'unknown'}`);
      }
    } catch (err) {
      console.error(`❌ 失败: ${filename} - ${err.message}`);
      failed++;
    } finally {
      await page.close(); // 确保关闭页面释放内存
    }

    // 释放可能的缓存
    if (global.gc) global.gc();
  }

  await browser.close();
  console.log(`\n📊 下载完成: 成功 ${success}, 失败 ${failed}, 跳过 ${skipped}`);
}

// 主动启动垃圾回收（需要 --expose-gc 参数）
if (global.gc) {
  global.gc();
}

downloadAll().catch((err) => {
  console.error('❌ 程序异常:', err);
  process.exit(1);
});