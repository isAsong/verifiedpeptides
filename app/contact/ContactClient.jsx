// app/contact/ContactClient.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getWhatsAppLink,WHATSAPP_NUMBER } from '@/lib/config';
export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Submit error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* 页面标题 */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Contact Us
        </h1>
        <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Have questions about our peptides, COAS, or your order? Reach out to
          us — our team is ready to assist you.
        </p>
      </div>

      {/* 主内容：表单 + 联系信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧：联系表单 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send a Message
          </h2>

          {/* 状态提示 */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              ✅ Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              ❌ Something went wrong. Please try again or contact us via WhatsApp.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Product inquiry"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Your message here..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500 text-center">
            We typically respond within 24 hours.
          </p>
        </div>

        {/* 右侧：联系信息 */}
        <div className="space-y-6">
          {/* 快速联系卡片 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                    support@verifiedpeptides.hk
                
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">WhatsApp</p>
                  <a
                    href={getWhatsAppLink('')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {`+${WHATSAPP_NUMBER}`}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">Location</p>
                  <p className="text-gray-600">verifiedpeptides Logistics &amp; Distribution Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* 办公时间 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Business Hours
            </h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday – Friday</span>
                <span className="text-gray-800 font-medium">9:00 AM – 6:00 PM (EST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday – Sunday</span>
                <span className="text-gray-800 font-medium">Closed</span>
              </div>
            </div>
          </div>

          {/* 快速链接 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-blue-600 hover:underline">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/coas" className="text-blue-600 hover:underline">
                  View COAS
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-600 hover:underline">
                  Read Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
        <p>
          For urgent inquiries, please contact us via{' '}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            WhatsApp
          </a>{' '}
          for the fastest response.
        </p>
      </div>
    </div>
  );
}