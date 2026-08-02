// lib/config.js

export const WHATSAPP_NUMBER = '85251933716';

// ✅ 安全化：增加默认值和异常处理
export const getWhatsAppLink = (phone = '') => {
  // 如果没有传入号码，使用默认号码
  const cleanNumber = phone || WHATSAPP_NUMBER;
  // 移除所有非数字字符
  const clean = cleanNumber.replace(/\D/g, '');
  return `https://api.whatsapp.com/send?phone=${clean}`;
};

export const WHATSAPP_MESSAGES = {
  default: 'Hello%2C%20I%20have%20a%20question%20about%20verifiedpeptides',
  calculatorHelp: 'Hello%2C%20I%20need%20help%20with%20peptide%20reconstitution%20calculation',
  coaRequest: 'Hello%2C%20I%20need%20a%20specific%20COA',
};