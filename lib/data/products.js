// lib/data/products.js
export const productCategories = ['GIP/GLP-1', 'Triple G', 'Growth Hormone', 'Melanocortin'];

export const products = [
    {
        id: 307,
        slug: 'tirzepatide-lyophilized-powder',
        name: 'Tirzepatide (Lyophilized Powder)',
        shortName: 'Tirzepatide',
        rating: 4.8,
        reviewCount: 124,

        description:
            'High-purity (>99%) sterile lyophilized Tirzepatide vial for metabolic and dual GIP/GLP-1 receptor synergism research. Available in versatile customizable dosing from 5 mg up to 120 mg.',
        images: [
            '/images/products/tirzepatide-1.jpg',
            '/images/products/tirzepatide-2.jpg',
            '/images/products/tirzepatide-3.jpg',
        ],
        category: 'GIP/GLP-1',
        specs: {
            'Form': 'Powder (lyophilized)',
            'Purity': '>99%',
            'Dosage': '5-120 mg customizable',
            'Vial Size': '3ML',
            'Storage': 'Lyophilized powder',
        },
        testResults: {
            date: 'May 11, 2026',
            purity: '99.46%',
            weight: '6.08mg',
            endotoxins: 'Pass',
            tfa: 'Pass',
            sterility: 'Pass',
            batch: 'CJD06261105j',
        },
        productInfo: {
            cas: '446262-90-4',
            otherNames: 'CJC1295, CJC-1295 with DAC',
            molecularWeight: '3647.15 g/mol',
            sequence: 'Tyr-D-Ala-Asp-Ala-Ile-Phe-Thr-Gln-Ser-Tyr-Arg-Lys-Val-Leu-Ala-Gln-Leu-Ser-Ala-Arg-Lys-Leu-Leu-Gln-Asp-Ile-Leu-Ser-Arg-LysLys(Maleimidopropionyl)-NH2',
        },
        faqs: [
            {
                question: 'What is Tirzepatide?',
                answer: 'Tirzepatide is a dual GIP/GLP-1 receptor agonist...',
            },
        ],
        whatsappNumber: '85270460355',
    }

    // ... 添加更多产品（Semaglutide, BPC-157 等）
];

export const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(p => p.category === category);
};

export const getProductBySlug = (slug) => {
    console.log('🔍 Searching for slug:', slug);
    console.log('📦 All slugs:', products.map(p => p.slug));
    const found = products.find(p => p.slug === slug);
    console.log('✅ Found:', found ? found.name : 'NOT FOUND');
    return found;
};