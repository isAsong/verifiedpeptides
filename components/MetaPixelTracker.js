'use client';

import { useEffect } from 'react';
import { trackContact } from '@/lib/metaPixel';

/**
 * 全局 Meta 像素事件委托。
 *
 * 监听页面上所有指向 WhatsApp 的链接/按钮点击，自动上报 Contact 事件（已去重）。
 * - 覆盖服务器组件渲染的链接（如 about 页），无需逐一手动绑定 onClick。
 * - 未来新增任何 WhatsApp 链接（href 含 api.whatsapp.com/send）也会自动生效。
 * - trackContact 内部有会话级去重，多个入口点击同一会话只上报一次。
 */
export default function MetaPixelTracker() {
  useEffect(() => {
    function handleClick(e) {
      const el = e.target?.closest?.('a[href*="api.whatsapp.com/send"]');
      if (el) {
        trackContact();
      }
    }
    // 捕获阶段监听，确保任何目标（含 SVG 图标）都能命中最近的 <a>
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
