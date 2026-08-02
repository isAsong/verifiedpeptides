// lib/config.js

// ===== WhatsApp 配置 =====
export const WHATSAPP_NUMBER = '85294506791';

// 构建 WhatsApp 链接
export const getWhatsAppLink = (message) => {
  const baseUrl = 'https://api.whatsapp.com/send';
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message || '',
  });
  return `${baseUrl}?${params.toString()}`;
};

// 预定义的常用消息模板
export const WHATSAPP_MESSAGES = {
  default: 'Hello%2C%20I%20have%20a%20question%20about%20verifiedpeptides',
  productInquiry: (productName) => 
    `Hello%2C%20I%27m%20interested%20in%20${encodeURIComponent(productName)}`,
  coaRequest: 'Hello%2C%20I%20need%20a%20specific%20COA',
  calculatorHelp: 'Hello%2C%20I%20need%20help%20with%20peptide%20reconstitution%20calculation',
  contact: 'Hello%2C%20I%20have%20a%20question%20about%20verifiedpeptides',
};