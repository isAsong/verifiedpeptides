// scripts/convert-coas.js
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// ==================== 配置 ====================
// 默认文件名（放在项目根目录）
const INPUT_FILE = path.join(process.cwd(), 'coas.xlsx');
// 如果不存在，尝试查找 .csv
const INPUT_FILE_CSV = path.join(process.cwd(), 'coas.csv');
// 输出文件路径
const OUTPUT_JS = path.join(process.cwd(), 'lib/data/coas.js');
// 图片下载清单（用于下载脚本）
const IMAGE_MANIFEST = path.join(process.cwd(), 'scripts/image-manifest.json');

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
    // 日期
    const dateMatch = line.match(/Date tested:\s*(.+)/i);
    if (dateMatch) { result.testDate = dateMatch[1].trim(); return; }

    // 纯度
    const purityMatch = line.match(/Purity:\s*([\d.]+%)/i);
    if (purityMatch) { result.purity = purityMatch[1]; return; }

    // 重量
    const weightMatch = line.match(/Weight:\s*([\d.]+mg)/i);
    if (weightMatch) { result.weight = weightMatch[1]; return; }

    // 批次号
    const batchMatch = line.match(/Batch Number:\s*(\S+)/i);
    if (batchMatch) { result.batchNumber = batchMatch[1]; return; }

    // Endotoxin
    const endotoxinMatch = line.match(/Endotoxin:\s*(Pass|Fail)/i);
    if (endotoxinMatch) { result.endotoxin = endotoxinMatch[1]; return; }

    // Sterility
    const sterilityMatch = line.match(/Sterility:\s*(Pass|Fail)/i);
    if (sterilityMatch) { result.sterility = sterilityMatch[1]; return; }

    // TFA
    const tfaMatch = line.match(/TFA:\s*(Pass|Not detected|Not Detected|Pass – not detected)/i);
    if (tfaMatch) { result.tfa = tfaMatch[1]; return; }

    // 其他混合成分（如 BPC-157: 10.60mg）
    const extraMatch = line.match(/^([A-Za-z0-9\-()]+):\s*([\d.]+mg)/);
    if (extraMatch) {
      result.extra.push({ key: extraMatch[1], value: extraMatch[2] });
      return;
    }

    // 其他杂项
    if (!result.extra.some(e => e.key === line.substring(0, 10))) {
      result.extra.push({ key: 'other', value: line });
    }
  });

  return result;
}

// ==================== 提取月份 ====================
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

// ==================== 生成文件名 ====================
function generateImageName(productName, index, type) {
  const clean = productName.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').toLowerCase();
  return `${clean}-${type || 'img'}-${index}.jpg`;
}

// ==================== 主转换函数 ====================
function convertFromExcel(filePath) {
  // 读取 Excel
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`📄 读取到 ${rows.length} 行数据`);

  const coasList = [];
  const imageManifest = [];
  let id = 1;

  rows.forEach((row, rowIndex) => {
    // 列名映射（根据你的实际列名调整）
    const productName = row['data'] || row['产品名'] || row['Product'] || `Unknown-${rowIndex}`;
    const details = row['data2'] || row['详情'] || row['Details'] || '';
    const imageUrls = [
      row['image'] || row['图片1'],
      row['image2'] || row['图片2'],
      row['image3'] || row['图片3'],
      row['image4'] || row['图片4'],
    ].filter(Boolean);

    if (imageUrls.length === 0) {
      console.warn(`⚠️ 第 ${rowIndex+1} 行没有图片，跳过`);
      return;
    }

    const parsed = parseDetails(details);
    const month = extractMonth(parsed.testDate);

    // 构建图片对象
    const images = imageUrls.map((url, idx) => {
      const type = ['purity', 'endotoxin', 'sterility', 'tfa'][idx] || `img${idx+1}`;
      const filename = generateImageName(productName, idx+1, type);
      const localPath = `/images/coas/${filename}`;
      // 记录到清单供下载
      imageManifest.push({ url, localPath, filename });
      return { url, localPath, filename };
    });

    coasList.push({
      id: id++,
      productName: productName,
      purity: parsed.purity || '',
      weight: parsed.weight || '',
      batchNumber: parsed.batchNumber || '',
      testDate: parsed.testDate || '',
      month: month,
      images: images,
      endotoxin: parsed.endotoxin || '',
      sterility: parsed.sterility || '',
      tfa: parsed.tfa || '',
      extra: parsed.extra,
    });
  });

  return { coasList, imageManifest };
}

// ==================== 导出为 JS ====================
function exportToJs(coasList) {
  const output = `// lib/data/coas.js
// 自动生成于 ${new Date().toISOString()}
// 共 ${coasList.length} 条记录

export const coasList = ${JSON.stringify(coasList, null, 2)};

// 获取所有月份（按时间倒序）
export const getAllMonths = () => {
  const months = [...new Set(coasList.map(item => item.month))];
  return months.sort((a, b) => b.localeCompare(a));
};

// 根据月份获取 COA 列表
export const getCoasByMonth = (month) => {
  return coasList.filter(item => item.month === month);
};

// 格式化月份显示
export const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split('-');
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return \`\${monthNames[parseInt(month, 10) - 1]} \${year}\`;
};

// 格式化日期显示
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// 根据产品名获取 COA（模糊匹配）
export const getCoasByProductName = (name) => {
  if (!name) return coasList;
  return coasList.filter(item => item.productName.includes(name) || name.includes(item.productName));
};
`;

  fs.writeFileSync(OUTPUT_JS, output, 'utf8');
  console.log(`✅ 已生成 ${OUTPUT_JS} (${coasList.length} 条记录)`);
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
      console.log('列名建议: data (产品名), data2 (详情), image, image2, image3, image4 (图片URL)');
      process.exit(1);
    }
  } else {
    console.log('📁 使用 Excel 文件:', inputFile);
  }

  const { coasList, imageManifest } = convertFromExcel(inputFile);
  exportToJs(coasList);
  saveManifest(imageManifest);

  console.log('\n🎉 转换完成！');
  console.log('📋 下一步: 运行 node scripts/download-coas-images.js 下载图片');
}

main();