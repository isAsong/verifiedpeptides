// lib/data/coas.js

export const coasList = [
  // ===== July 2026 =====
  {
    id: 1,
    productId: 307,
    productName: 'Tirzepatide',
    purity: '99.93%',
    weight: '11.00mg',
    batchNumber: 'CJND05260910I',
    testDate: '2026-07-23',
    month: '2026-07',
    imageUrl: '/images/coas/tirzepatide-coa.jpg', // 改为图片路径
  },
  {
    id: 2,
    productId: 306,
    productName: 'Retatrutide',
    purity: '99.91%',
    weight: '97.91mg',
    batchNumber: 'GHK072615100O',
    testDate: '2026-07-23',
    month: '2026-07',
    imageUrl: '/images/coas/retatrutide-coa.jpg',
  },
  {
    id: 3,
    productId: 305,
    productName: 'Semaglutide',
    purity: '98.78%',
    weight: '11.29mg',
    batchNumber: 'TB06261010J',
    testDate: '2026-07-21',
    month: '2026-07',
    imageUrl: '/images/coas/semaglutide-coa.jpg',
  },

  // ===== June 2026 =====
  {
    id: 4,
    productId: 304,
    productName: 'BPC-157',
    purity: '99.73%',
    weight: '11.03mg',
    batchNumber: 'BP06261310K',
    testDate: '2026-06-05',
    month: '2026-06',
    imageUrl: '/images/coas/bpc157-coa.jpg',
  },
  {
    id: 5,
    productId: 303,
    productName: 'TB-500',
    purity: '99.93%',
    weight: '23.80mg',
    batchNumber: 'CAR06260420D',
    testDate: '2026-06-05',
    month: '2026-06',
    imageUrl: '/images/coas/tb500-coa.jpg',
  },
  {
    id: 6,
    productId: 302,
    productName: 'CJC-1295 No DAC',
    purity: '99.68%',
    weight: '12.82mg',
    batchNumber: 'FOX06260210B',
    testDate: '2026-06-05',
    month: '2026-06',
    imageUrl: '/images/coas/cjc1295-coa.jpg',
  },
  {
    id: 7,
    productId: 268,
    productName: 'Melanotan II',
    purity: '98.58%',
    weight: '11.36mg',
    batchNumber: 'P2106260210B',
    testDate: '2026-06-05',
    month: '2026-06',
    imageUrl: '/images/coas/melanotan2-coa.jpg',
  },

  // ===== May 2026 =====
  {
    id: 8,
    productId: 301,
    productName: 'PT-141',
    purity: '99.74%',
    weight: '12.11mg',
    batchNumber: 'PT05261410K',
    testDate: '2026-05-13',
    month: '2026-05',
    imageUrl: '/images/coas/pt141-coa.jpg',
  },
  {
    id: 9,
    productId: 300,
    productName: 'LL-37',
    purity: '99.64%',
    weight: '5.27mg',
    batchNumber: 'LL05260305C',
    testDate: '2026-05-12',
    month: '2026-05',
    imageUrl: '/images/coas/ll37-coa.jpg',
  },
];

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
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

// 格式化日期显示
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};