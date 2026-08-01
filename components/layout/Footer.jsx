// components/layout/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'COAS', href: '/coas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* 主体网格 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-800">
          {/* 1. Logo + 联系信息 */}
          <div className="col-span-1">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/common/logo.png"
                  alt="verifiedpeptides"
                  width={160}
                  height={40}
                  className="brightness-0 invert"
                />
              </Link>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Email/Form Inquiry Only</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>verifiedpeptides Logistics & Distribution Hub</span>
              </div>
            </div>
          </div>

          {/* 2. Useful Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Media Inquiries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Media Inquiries</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a>
                  support@verifiedpeptides.hk
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Investor Inquiries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Investor Inquiries</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a>
                  support@verifiedpeptides.hk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权行 */}
        <div className="pt-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>
            Copyright © {currentYear} verifiedpeptides. All Rights Reserved.
          </span>
          <span className="text-xs">
            Products are for research and laboratory use only.
          </span>
        </div>
      </div>
    </footer >
  );
}