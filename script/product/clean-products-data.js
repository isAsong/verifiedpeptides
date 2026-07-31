// scripts/clean-products-data.js
const fs = require('fs');
const path = require('path');

const RAW_PATH = path.join(__dirname, '../../data/products-raw.json');
const OUTPUT_PATH = path.join(__dirname, '../data/products-raw-cleaned.json');

if (!fs.existsSync(RAW_PATH)) {
    console.error('❌ 找不到 products-raw.json');
    process.exit(1);
}

const products = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));

function cleanTestResults(testResults) {
    if (!testResults || typeof testResults !== 'object') return undefined;

    const cleaned = {};
    const validKeys = ['date', 'purity', 'weight', 'endotoxins', 'sterility', 'tfa', 'batch'];
    const patterns = [
        { key: 'date', regex: /(?:Date tested:|Date:)\s*([^\n<]+)/i },
        { key: 'purity', regex: /Purity:\s*([\d.]+%)/i },
        { key: 'weight', regex: /Weight:\s*([\d.]+(?:mg|g))/i },
        { key: 'endotoxins', regex: /Endotoxin[s]?:\s*(Pass|Fail|Not detected)/i },
        { key: 'sterility', regex: /Sterility:\s*(Pass|Fail)/i },
        { key: 'tfa', regex: /TFA:\s*(Pass|Not detected|Not Detected)/i },
        { key: 'batch', regex: /Batch\s*(?:Number)?:\s*([A-Za-z0-9]+)/i },
    ];

    // 如果 testResults 是对象，尝试从中提取有效字段
    for (const [key, value] of Object.entries(testResults)) {
        // 如果是有效字段且不是长字符串（CSS样式），直接保留
        if (validKeys.includes(key) && typeof value === 'string' && value.length < 200) {
            cleaned[key] = value;
        }
    }

    // 如果没提取到，尝试从原始值中匹配
    for (const pattern of patterns) {
        if (cleaned[pattern.key]) continue;
        // 遍历 testResults 的所有值
        for (const value of Object.values(testResults)) {
            if (typeof value === 'string') {
                const match = value.match(pattern.regex);
                if (match) {
                    cleaned[pattern.key] = match[1].trim();
                    break;
                }
            }
        }
    }

    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

const cleanedProducts = products.map(p => {
    const cleaned = { ...p };
    cleaned.testResults = cleanTestResults(p.testResults);
    return cleaned;
});

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cleanedProducts, null, 2), 'utf8');
console.log(`✅ 已清洗 ${cleanedProducts.length} 个产品`);
console.log(`💾 输出: ${OUTPUT_PATH}`);

// 统计清洗结果
const withValidTestResults = cleanedProducts.filter(p => p.testResults && Object.keys(p.testResults).length > 0);
console.log(`📊 有有效测试结果的产品: ${withValidTestResults.length}`);