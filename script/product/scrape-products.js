// scripts/product/scrape-products-puppeteer.js
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// ==================== 配置 ====================
const BASE_URL = 'https://verifiedpeptides.com';
const CHROME_PATHS = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\Asong\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
];
const CHROME_EXECUTABLE = CHROME_PATHS.find(p => fs.existsSync(p));
if (!CHROME_EXECUTABLE) {
    console.error('❌ 未找到 Chrome，请安装或指定路径');
    process.exit(1);
}
console.log(`✅ 使用 Chrome: ${CHROME_EXECUTABLE}`);

const OUTPUT_DIR = path.join(__dirname, '../../data');
const IMAGE_DIR = path.join(__dirname, '../../public/images/products');
const OUTPUT_JS = path.join(__dirname, '../../lib/data/products.js');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

// ==================== 工具函数 ====================
function extractCategory(productName) {
    const categories = {
        'GIP/GLP-1': ['tirzepatide', 'retatrutide', 'semaglutide'],
        'Triple G': ['retatrutide'],
        'Growth Hormone': ['bpc', 'tb500', 'cjc', 'ipamorelin', 'ghk', 'mots', 'tesamorelin', 'adamax', 'cjc-1295'],
        'Melanocortin': ['melanotan', 'pt-141'],
        'Fragments': ['frag'],
        'Blends': ['blend'],
    };
    const lower = productName.toLowerCase();
    for (const [cat, keywords] of Object.entries(categories)) {
        for (const kw of keywords) {
            if (lower.includes(kw)) return cat;
        }
    }
    return 'Research Peptide';
}

// scripts/product/scrape-products-puppeteer.js
// ... 前面的代码保持不变 ...

function parseDetailPage(html) {
    const result = {
        description: '',
        specs: {},
        testResults: {},
        productInfo: {},
        faqs: [],
        price: null,
        originalPrice: null,
        bulkPricing: [],
        studyReference: '',
    };

    // ========== 价格 ==========
    const priceMatch = html.match(/"price":"([\d.]+)"/);
    if (priceMatch) result.price = parseFloat(priceMatch[1]);
    const regPriceMatch = html.match(/"regularPrice":"([\d.]+)"/);
    if (regPriceMatch) result.originalPrice = parseFloat(regPriceMatch[1]);

    // ========== 批量折扣 ==========
    const bulkRegex = /(\d+)\s*-\s*(\d+|\+)\s*\|\s*(\d+)%/g;
    let bulkMatch;
    while ((bulkMatch = bulkRegex.exec(html)) !== null) {
        const min = parseInt(bulkMatch[1]);
        const max = bulkMatch[2] === '+' ? null : parseInt(bulkMatch[2]);
        const discount = parseInt(bulkMatch[3]);
        const price = result.price ? Math.round(result.price * (1 - discount / 100) * 100) / 100 : null;
        result.bulkPricing.push({ min, max, discount, label: `${discount}%`, price });
    }

    // ========== 规格 (从表格中提取) ==========
    const specRegex = /###\s*([^<]+)<\/span>.*?([\d.]+(?:mg|g\/mol|%|kDa)?)/gs;
    let specMatch;
    while ((specMatch = specRegex.exec(html)) !== null) {
        const key = specMatch[1].trim();
        const value = specMatch[2].trim();
        if (key && value) result.specs[key] = value;
    }

    // ========== 测试结果（修正版：精准提取） ==========
    // 先找到 "Test Results" 区域，只在这个区域内提取数据
    const testSectionStart = html.indexOf('Test Results');
    const testSectionEnd = html.indexOf('##', testSectionStart + 50);
    const testSection = testSectionStart !== -1
        ? html.substring(testSectionStart, testSectionEnd !== -1 ? testSectionEnd : testSectionStart + 2000)
        : html;

    const testMap = {};
    // 精准匹配 Date Tested / Purity / Weight / Endotoxin / Sterility / TFA / Batch
    const testPatterns = [
        { key: 'date', regex: /Date tested:\s*([^\n<]+)/i },
        { key: 'purity', regex: /Purity:\s*([\d.]+%)/i },
        { key: 'weight', regex: /Weight:\s*([\d.]+(?:mg|g))/i },
        { key: 'endotoxins', regex: /Endotoxin[s]?:\s*(Pass|Fail)/i },
        { key: 'sterility', regex: /Sterility:\s*(Pass|Fail)/i },
        { key: 'tfa', regex: /TFA:\s*(Pass|Not detected|Not Detected|Pass\s*[-–]\s*not detected)/i },
        { key: 'batch', regex: /Batch\s*(?:Number)?:\s*([A-Za-z0-9]+)/i },
    ];

    // 在测试区域内尝试匹配
    for (const pattern of testPatterns) {
        const match = testSection.match(pattern.regex);
        if (match) {
            testMap[pattern.key] = match[1].trim();
        }
    }

    // 如果测试区域没找到，在整个 HTML 中再尝试一次
    if (Object.keys(testMap).length === 0) {
        for (const pattern of testPatterns) {
            const match = html.match(pattern.regex);
            if (match) {
                testMap[pattern.key] = match[1].trim();
            }
        }
    }

    if (Object.keys(testMap).length > 0) {
        result.testResults = testMap;
    }

    // ========== FAQ (以 "What" 开头的问题) ==========
    const faqRegex = /<h[23][^>]*>What[^?]*\?/gi;
    let faqMatch;
    const faqItems = [];
    while ((faqMatch = faqRegex.exec(html)) !== null) {
        const question = faqMatch[0].replace(/<[^>]+>/g, '').trim();
        const start = faqMatch.index + faqMatch[0].length;
        const nextFaq = html.indexOf('<h', start);
        const end = nextFaq !== -1 ? nextFaq : html.length;
        const answerHtml = html.substring(start, end);
        const answer = answerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
        if (question && answer && question.startsWith('What')) {
            faqItems.push({ question, answer });
        }
    }
    if (faqItems.length > 0) result.faqs = faqItems;

    // ========== 研究引用 ==========
    const refMatch = html.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
    if (refMatch) result.studyReference = `https://pubmed.ncbi.nlm.nih.gov/${refMatch[1]}/`;

    // ========== 描述 ==========
    const descMatch = html.match(/<p>([\s\S]*?)<\/p>/);
    if (descMatch) {
        const desc = descMatch[1].replace(/<[^>]+>/g, '').trim();
        if (desc.length > 50) result.description = desc;
    }

    return result;
}

// ... 后面的代码保持不变 ...
// ==================== 主爬虫 ====================
async function scrapeAll() {
    console.log('🚀 启动浏览器...');
    const browser = await puppeteer.launch({
        executablePath: CHROME_EXECUTABLE,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });

    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });

        // ===== 分页抓取产品链接 =====
        let allProductLinks = [];
        let currentPageNum = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const pageUrl = `${BASE_URL}/peptides/page/${currentPageNum}/`;
            console.log(`\n🌐 访问第 ${currentPageNum} 页: ${pageUrl}`);
            await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
            await page.waitForSelector('.product-item, .product, .products .product', { timeout: 30000 });

            const links = await page.evaluate(() => {
                const items = [];
                document.querySelectorAll('.product-item a, .product a, .products .product a').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href && href.includes('/product/')) items.push(href);
                });
                return [...new Set(items)];
            });

            if (links.length === 0) break;
            allProductLinks = allProductLinks.concat(links);
            console.log(`   ✅ 第 ${currentPageNum} 页找到 ${links.length} 个产品`);

            const nextBtn = await page.$('.next, .nav-links .next, a.next, .woocommerce-pagination .next');
            if (nextBtn) {
                const isDisabled = await page.evaluate(el => {
                    return el.disabled || el.classList.contains('disabled') || el.getAttribute('aria-disabled') === 'true';
                }, nextBtn);
                if (!isDisabled) {
                    currentPageNum++;
                    await new Promise(r => setTimeout(r, 1000));
                } else {
                    hasNextPage = false;
                }
            } else {
                hasNextPage = false;
            }
        }

        console.log(`\n✅ 共发现 ${allProductLinks.length} 个产品链接`);

        // ===== 创建专用的下载页面（携带 Cookie） =====
        const downloadPage = await browser.newPage();
        await downloadPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await downloadPage.setViewport({ width: 1280, height: 800 });

        const allProducts = [];
        let processed = 0;

        for (const link of allProductLinks) {
            processed++;
            const fullUrl = link.startsWith('http') ? link : `${BASE_URL}${link}`;
            console.log(`\n📦 [${processed}/${allProductLinks.length}] 抓取: ${fullUrl}`);

            const detailPage = await browser.newPage();
            await detailPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            await detailPage.setViewport({ width: 1280, height: 800 });

            try {
                await detailPage.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 60000 });
                const html = await detailPage.content();

                // 提取基本信息
                const productData = await detailPage.evaluate(() => {
                    const name = document.querySelector('h1.product_title, .product-title')?.textContent?.trim() || '';
                    const sku = document.querySelector('.sku')?.textContent?.trim() || '';
                    const priceEl = document.querySelector('.price .amount, .price');
                    const price = priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '';
                    const images = [];
                    document.querySelectorAll('.woocommerce-product-gallery img, .product-image img').forEach(img => {
                        const src = img.getAttribute('src') || img.getAttribute('data-src');
                        if (src && src.startsWith('http')) images.push(src);
                    });
                    const desc = document.querySelector('.woocommerce-product-details__short-description, .product-description')?.innerHTML || '';
                    return { name, sku, price, images, description: desc };
                });

                const slug = fullUrl.split('/product/')[1]?.replace(/\/$/, '') || '';
                if (!slug) continue;

                // 解析详情
                const detailData = parseDetailPage(html);

                // 构建产品对象
                const product = {
                    id: slug,
                    slug: slug,
                    name: productData.name || slug,
                    shortName: productData.name.replace(/\(.*?\)/, '').trim() || slug,
                    rating: 0,
                    reviewCount: 0,
                    price: parseFloat(productData.price) || detailData.price || null,
                    originalPrice: detailData.originalPrice || null,
                    currency: '$',
                    description: detailData.description || productData.description || '',
                    images: [],
                    category: extractCategory(productData.name || slug),
                    specs: Object.keys(detailData.specs).length > 0 ? detailData.specs : undefined,
                    testResults: Object.keys(detailData.testResults).length > 0 ? detailData.testResults : undefined,
                    productInfo: Object.keys(detailData.productInfo).length > 0 ? detailData.productInfo : undefined,
                    faqs: detailData.faqs.length > 0 ? detailData.faqs : undefined,
                    whatsappNumber: '85270460355',
                    studyReference: detailData.studyReference || undefined,
                    bulkPricing: detailData.bulkPricing.length > 0 ? detailData.bulkPricing : undefined,
                };

                // ---------- 图片下载（使用下载页面，携带 Cookie） ----------
                // 从详情页获取 cookies 并设置到下载页面
                const cookies = await detailPage.cookies();
                await downloadPage.setCookie(...cookies);

                const imgUrls = productData.images.slice(0, 4);
                const downloaded = [];
                for (let i = 0; i < imgUrls.length; i++) {
                    const url = imgUrls[i];
                    const ext = path.extname(url).split('?')[0] || '.jpg';
                    const filename = `${slug}-${i + 1}${ext}`;
                    const localPath = `/images/products/${filename}`;
                    const filepath = path.join(IMAGE_DIR, filename);

                    if (fs.existsSync(filepath)) {
                        console.log(`   ⏭️  图片已存在: ${filename}`);
                        downloaded.push(localPath);
                        continue;
                    }

                    try {
                        console.log(`   ⬇️  下载图片: ${filename}`);
                        // 使用下载页面访问图片 URL（携带 Cookie）
                        const response = await downloadPage.goto(url, { waitUntil: 'load', timeout: 30000 });
                        if (response && response.status() === 200) {
                            const buffer = await response.buffer();
                            fs.writeFileSync(filepath, buffer);
                            downloaded.push(localPath);
                        } else {
                            console.log(`   ⚠️  图片下载失败 (状态: ${response ? response.status() : 'unknown'}): ${filename}`);
                        }
                    } catch (err) {
                        console.log(`   ⚠️  图片下载异常: ${filename} - ${err.message}`);
                    }
                }
                product.images = downloaded;

                // 清理空字段
                for (const key of ['bulkPricing', 'specs', 'testResults', 'productInfo', 'faqs', 'studyReference']) {
                    if (!product[key] || (Array.isArray(product[key]) && product[key].length === 0)) {
                        delete product[key];
                    }
                    if (typeof product[key] === 'object' && Object.keys(product[key]).length === 0) {
                        delete product[key];
                    }
                }

                allProducts.push(product);
                console.log(`✅ 成功: ${product.name}`);

            } catch (err) {
                console.error(`❌ 抓取失败: ${err.message}`);
            } finally {
                await detailPage.close();
                if (global.gc) global.gc();
            }
            await new Promise(r => setTimeout(r, 300));
        }

        await downloadPage.close();

        // ===== 生成 products.js =====
        const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
        const jsContent = `// lib/data/products.js
// 自动生成于 ${new Date().toISOString()}
// 共 ${allProducts.length} 个产品

export const productCategories = ${JSON.stringify(categories, null, 2)};

export const products = ${JSON.stringify(allProducts, null, 2)};

export const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(p => p.category === category);
};

export const getProductBySlug = (slug) => {
    const found = products.find(p => p.slug === slug);
    return found || null;
};
`;

        fs.writeFileSync(OUTPUT_JS, jsContent, 'utf8');
        console.log(`\n✅ 已生成: ${OUTPUT_JS}`);
        console.log(`📊 共 ${allProducts.length} 个产品`);

        const rawPath = path.join(OUTPUT_DIR, 'products-raw.json');
        fs.writeFileSync(rawPath, JSON.stringify(allProducts, null, 2), 'utf8');
        console.log(`💾 原始数据备份: ${rawPath}`);

    } catch (err) {
        console.error('❌ 程序异常:', err);
    } finally {
        await browser.close();
    }
}

// ==================== 运行 ====================
scrapeAll().catch(err => {
    console.error('❌ 程序异常:', err);
    process.exit(1);
});