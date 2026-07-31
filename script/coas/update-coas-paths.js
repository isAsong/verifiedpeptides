const fs = require('fs');
const path = require('path');

const COAS_JS_PATH = path.join(__dirname, '../lib/data/coas.js');
const IMAGE_DIR = path.join(__dirname, '../public/images/coas');

if (!fs.existsSync(COAS_JS_PATH)) {
  console.error('❌ coas.js 不存在');
  process.exit(1);
}

// 读取当前 coas.js 内容
const content = fs.readFileSync(COAS_JS_PATH, 'utf8');

// 提取 coasList 数组（使用 eval 简单解析，但更安全用正则）
// 由于 coasList 是 export const 形式，我们直接匹配数组部分
const match = content.match(/export const coasList = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('❌ 未找到 coasList 数组');
  process.exit(1);
}

let coasList;
try {
  coasList = eval(`(${match[1]})`);
} catch (e) {
  console.error('❌ 解析 coasList 失败', e);
  process.exit(1);
}

// 遍历更新图片路径
let updated = 0;
coasList.forEach(coa => {
  if (coa.images && coa.images.length > 0) {
    const img = coa.images[0];
    const filename = img.filename;
    const localPath = `/images/coas/${filename}`;
    // 检查文件是否存在
    const filePath = path.join(IMAGE_DIR, filename);
    if (fs.existsSync(filePath)) {
      img.localPath = localPath;
      img.url = localPath; // 同时更新 url 以保持一致性
      updated++;
    } else {
      console.warn(`⚠️ 文件不存在: ${filename}`);
    }
  }
});

// 重新生成文件内容（保留辅助函数）
const helperMatch = content.match(/(\/\/ 获取所有月份[\s\S]*)/);
if (!helperMatch) {
  console.error('❌ 未找到辅助函数');
  process.exit(1);
}
const helpers = helperMatch[1];

const newContent = `// lib/data/coas.js
// 更新于 ${new Date().toISOString()}
// 共 ${coasList.length} 条记录

export const coasList = ${JSON.stringify(coasList, null, 2)};

${helpers}`;

fs.writeFileSync(COAS_JS_PATH, newContent, 'utf8');
console.log(`✅ 已更新 ${updated} 条记录的图片路径`);