// lib/config.js

// ===== WhatsApp 配置 =====
export const WHATSAPP_NUMBER = '85251933716';
export const TELEGRAM_NUMBER = 'verifiedpeptides123'; // 可以单独配置，或与 WhatsApp 相同
export const TELEGRAM_HANDLE = 't.me/verifiedpeptides123'; // Telegram 账号链接，用于复制

// ✅ 安全化：增加默认值和异常处理
export const getWhatsAppLink = (phone = '') => {
    // 如果没有传入号码，使用默认号码
    const cleanNumber = phone || WHATSAPP_NUMBER;
    // 移除所有非数字字符
    const clean = cleanNumber.replace(/\D/g, '');
    return `https://api.whatsapp.com/send?phone=${clean}`;
};

// 预定义的常用消息模板（用于 WhatsApp）
export const WHATSAPP_MESSAGES = {
    default: 'Hello%2C%20I%20have%20a%20question%20about%20verifiedpeptides',
    // ... 其他
};