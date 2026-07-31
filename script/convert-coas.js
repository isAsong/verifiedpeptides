// scripts/convert-coas.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// ==================== 产品名到 ID 的映射 ====================
const productNameToId = {
  'Tirzepatide': 307,
  'Retatrutide': 306,
  'Semaglutide': 305,
  'BPC-157': 304,
  'TB-500': 303,
  'CJC-1295 No DAC': 302,
  'Melanotan II': 268,
  'PT-141': 301,
  'LL-37': 300,
  'BPC157': 304,
  'TB500': 303,
  'CJC1295': 302,
  'MOTS-C': 299,
  'GHK-Cu': 298,
  'Epitalon': 297,
  'Thymalin': 296,
  'KPV': 295,
  'DSIP': 294,
  'NAD+': 293,
  'Glutathione': 292,
  'Tesamorelin': 291,
  'FOXO4-DRI': 290,
  'AOD9604': 289,
  'SNAP-8': 288,
  'Pinealon': 287,
  'Cartalax': 286,
  'Thymosin Alpha-1': 285,
  'Kisspeptin': 284,
  'Selank': 283,
  'Semax': 282,
  'P21': 281,
  'Prostamax': 280,
  'Vesugen': 279,
  'Vilon': 278,
  'Cardiogen': 277,
  'G-6': 276,
  'ARA-290': 275,
  'Testagen': 274,
  '5-Amino 1MQ': 273,
  'Frag(17-23)': 272,
  'Ipamorelin': 271,
  'CJC-1295 DAC': 270,
  'GLOW Peptide': 269,
  'KLOW Peptide': 268,
};

function getProductId(name) {
  if (!name) return null;
  // 去掉 "Buy " 前缀
  const cleanName = name.replace(/^Buy\s*/i, '').trim();
  if (productNameToId[cleanName]) return productNameToId[cleanName];
  // 模糊匹配
  for (const [key, id] of Object.entries(productNameToId)) {
    if (cleanName.includes(key) || key.includes(cleanName)) return id;
  }
  return null;
}

// ==================== 配置 ====================
const PROJECT_ROOT = path.resolve(__dirname, '..');
const INPUT_FILE = path.join(PROJECT_ROOT, 'coas.xlsx');
const INPUT_FILE_CSV = path.join(PROJECT_ROOT, 'coas.csv');
const COAS_JS_PATH = path.join(PROJECT_ROOT, 'lib/data/coas.js');
const IMAGE_MANIFEST = path.join(__dirname, 'image-manifest.json');

// 确保目录存在
const outputDir = path.dirname(COAS_JS_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ==================== 解析详情 ====================
function parseDetails(details) {
  const result = {
    testDate: '',
    purity: '',
    weight: '',
    endotoxin: '',
    sterility: '',
    tfa: '',
    batchNumber: '',
    extra: [],
  };
  if (!details) return result;

  const lines = details.split('\n').map(l => l.trim()).filter(Boolean);
  lines.forEach(line => {
    const dateMatch = line.match(/Date tested:\s*(.+)/i);
    if (dateMatch) { result.testDate = dateMatch[1].trim(); return; }
    const purityMatch = line.match(/Purity:\s*([\d.]+%)/i);
    if (purityMatch) { result.purity = purityMatch[1]; return; }
    const weightMatch = line.match(/Weight:\s*([\d.]+mg)/i);
    if (weightMatch) { result.weight = weightMatch[1]; return; }
    const batchMatch = line.match(/Batch Number:\s*(\S+)/i);
    if (batchMatch) { result.batchNumber = batchMatch[1]; return; }
    const endotoxinMatch = line.match(/Endotoxin:\s*(Pass|Fail)/i);
    if (endotoxinMatch) { result.endotoxin = endotoxinMatch[1]; return; }
    const sterilityMatch = line.match(/Sterility:\s*(Pass|Fail)/i);
    if (sterilityMatch) { result.sterility = sterilityMatch[1]; return; }
    const tfaMatch = line.match(/TFA:\s*(Pass|Not detected|Not Detected|Pass – not detected)/i);
    if (tfaMatch) { result.tfa = tfaMatch[1]; return; }
    // 提取混合成分（如 BPC-157: 10.60mg）
    const extraMatch = line.match(/^([A-Za-z0-9\-()]+):\s*([\d.]+mg)/);
    if (extraMatch) {
      result.extra.push({ key: extraMatch[1], value: extraMatch[2] });
      return;
    }
  });
  return result;
}

function extractMonth(dateStr) {
  if (!dateStr) return '2026-01';
  const months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12'
  };
  for (const [month, num] of Object.entries(months)) {
    if (dateStr.includes(month)) {
      const yearMatch = dateStr.match(/(\d{4})/);
      if (yearMatch) return `${yearMatch[1]}-${num}`;
      return `2026-${num}`;
    }
  }
  return '2026-01';
}

function generateImageName(productName, index) {
  const clean = productName
    .replace(/^Buy\s*/i, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  return `${clean}-coa-${index}.jpg`;
}

// ==================== 转换数据 ====================
function convertFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);
  console.log(`📄 读取到 ${rows.length} 行数据`);

  const coasList = [];
  const imageManifest = [];
  let id = 1;

  rows.forEach((row, rowIndex) => {
    // 列名映射：data2 = 产品名, data3 = 详情, image = 图片
    const productName = row['data2'] || row['data'] || row['产品名'] || `Unknown-${rowIndex}`;
    const details = row['data3'] || row['data2'] || row['详情'] || '';
    
    // ✅ 只取 image 列（第一张图片）
    const imageUrl = row['image4'] || row['图片4'] || '';

    if (!imageUrl) {
      console.warn(`⚠️ 第 ${rowIndex+1} 行没有图片，跳过`);
      return;
    }

    const parsed = parseDetails(details);
    const month = extractMonth(parsed.testDate);
    const productId = getProductId(productName);

    // 生成图片信息
    const filename = generateImageName(productName, id);
    const localPath = `/images/coas/${filename}`;
    imageManifest.push({ url: imageUrl, localPath, filename });

    coasList.push({
      id: id++,
      productId: productId,
      productName: productName.replace(/^Buy\s*/i, '').trim(),
      purity: parsed.purity || '',
      weight: parsed.weight || '',
      batchNumber: parsed.batchNumber || '',
      testDate: parsed.testDate || '',
      month: month,
      images: [{ url: imageUrl, localPath, filename }],
      endotoxin: parsed.endotoxin || '',
      sterility: parsed.sterility || '',
      tfa: parsed.tfa || '',
      extra: parsed.extra,
    });
  });

  return { coasList, imageManifest };
}

// ==================== 更新 coas.js（保留辅助函数） ====================
function updateCoasJs(newCoasList) {
  if (!fs.existsSync(COAS_JS_PATH)) {
    console.error('❌ coas.js 不存在，请先创建基础文件');
    process.exit(1);
  }

  const existingContent = fs.readFileSync(COAS_JS_PATH, 'utf8');
  const helperMatch = existingContent.match(/(\/\/ 获取所有月份[\s\S]*)/);
  if (!helperMatch) {
    console.error('❌ 无法找到辅助函数部分，请检查 coas.js 格式');
    process.exit(1);
  }

  const helpers = helperMatch[1];
  const newContent = `// lib/data/coas.js
// 自动生成于 ${new Date().toISOString()}
// 共 ${newCoasList.length} 条记录

export const coasList = ${JSON.stringify(newCoasList, null, 2)};

${helpers}`;

  fs.writeFileSync(COAS_JS_PATH, newContent, 'utf8');
  console.log(`✅ 已更新 ${COAS_JS_PATH} (${newCoasList.length} 条记录，保留辅助函数)`);
}

// ==================== 保存图片清单 ====================
function saveManifest(manifest) {
  fs.writeFileSync(IMAGE_MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✅ 图片清单已保存到 ${IMAGE_MANIFEST} (${manifest.length} 张图片)`);
}

// ==================== 主流程 ====================
function main() {
  let inputFile = INPUT_FILE;
  if (!fs.existsSync(inputFile)) {
    if (fs.existsSync(INPUT_FILE_CSV)) {
      inputFile = INPUT_FILE_CSV;
      console.log('📁 使用 CSV 文件:', inputFile);
    } else {
      console.error(`❌ 找不到输入文件: ${INPUT_FILE} 或 ${INPUT_FILE_CSV}`);
      console.log('请将 Excel/CSV 文件放在项目根目录，命名为 coas.xlsx 或 coas.csv');
      process.exit(1);
    }
  } else {
    console.log('📁 使用 Excel 文件:', inputFile);
  }

  const { coasList, imageManifest } = convertFromExcel(inputFile);
  updateCoasJs(coasList);
  saveManifest(imageManifest);

  console.log('\n🎉 转换完成！');
  console.log(`📊 共 ${coasList.length} 条 COA 记录`);
  console.log(`🖼️  共 ${imageManifest.length} 张图片待下载`);
  console.log('📋 下一步: 运行 node scripts/download-coas-images.js 下载图片');
}

main();