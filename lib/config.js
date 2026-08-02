// lib/config.js

// ===== WhatsApp 配置 =====
export const WHATSAPP_NUMBER = '85251933716';
export const TELEGRAM_NUMBER = '85251933716'; // 可以单独配置，或与 WhatsApp 相同

// 构建 WhatsApp 链接
export const getWhatsAppLink = (phone) => {
  const clean = phone.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${clean}`;
};

// 预定义的常用消息模板（用于 WhatsApp）
export const WHATSAPP_MESSAGES = {
  default: 'Hello%2C%20I%20have%20a%20question%20about%20verifiedpeptides',
  // ... 其他
};