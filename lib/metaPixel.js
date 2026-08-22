'use client';

// ===== Meta Pixel (Facebook Pixel) 工具库 =====
// 提供安全的 fbq 调用、事件 ID 生成与事件去重。
// 配合 app/layout.jsx 中的像素初始化脚本使用。

// 会话内 Contact 事件去重标记（sessionStorage key）
const CONTACT_DEDUP_KEY = 'vp:meta:contact_sent';

/**
 * 生成唯一事件 ID（UUID）。
 *
 * 用途：Meta 官方"事件去重"机制。
 * 当同一转化既通过浏览器像素上报，又通过服务器端 Conversions API (CAPI)
 * 上报时，两侧使用相同的 eventID，Meta 会将其合并为一条事件，避免重复计数。
 */
function generateEventId() {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * 获取可用的 fbq 函数。
 * - 若像素脚本已加载，直接返回 window.fbq。
 * - 若尚未加载，创建一个带队列的占位函数（与官方初始化脚本的队列机制一致），
 *   像素脚本就绪后会自动补发队列中的事件，保证事件不丢失。
 */
function getFbq() {
  if (typeof window === 'undefined') return null;

  // fbq 已由像素脚本定义（含 queue 机制）
  if (typeof window.fbq === 'function' && window.fbq.queue) {
    return window.fbq;
  }

  // 像素脚本尚未加载：创建带队列的占位 fbq
  if (!window.fbq) {
    const fbq = function () {
      const callMethod = fbq.callMethod;
      if (callMethod) {
        callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;
  }
  return window.fbq;
}

/**
 * 上报 Contact 事件（已做去重）。
 *
 * 去重策略（双重）：
 * 1. 会话级去重：同一浏览器会话内 Contact 事件只上报一次
 *    （通过 sessionStorage 标记），避免按钮被重复点击或组件
 *    重复渲染导致同一转化被多次统计。
 * 2. eventID 去重：为每次事件生成唯一 eventID，若后续接入服务器端
 *    Conversions API (CAPI)，浏览器事件与服务器事件会按相同 eventID
 *    由 Meta 端自动合并去重。
 *
 * @returns {boolean} true 表示本次事件已发送；false 表示因去重被跳过
 */
export function trackContact() {
  // 1) 会话级去重：同一会话内只允许上报一次
  let alreadySent = false;
  try {
    alreadySent = window.sessionStorage.getItem(CONTACT_DEDUP_KEY) === '1';
  } catch {
    // sessionStorage 不可用（如部分隐私模式），跳过会话去重
  }
  if (alreadySent) return false;

  // 2) 生成事件 ID 并发送事件（事件数据为空，仅标注 eventID 用于去重）
  const eventID = generateEventId();
  const fbq = getFbq();
  if (fbq) {
    fbq('track', 'Contact', {}, { eventID });
  }

  // 3) 标记本会话已发送
  try {
    window.sessionStorage.setItem(CONTACT_DEDUP_KEY, '1');
  } catch {}

  return true;
}
