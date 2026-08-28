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
    <footer className="bg-white text-slate-700 pt-14 pb-8 shadow-[0_-8px_30px_rgba(15,23,42,0.04)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 border-b border-slate-200 pb-10">
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/images/logo.jpg"
                alt="verifiedpeptides"
                width={50}
                height={50}
                className="h-auto w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm text-slate-600 leading-relaxed">
              Verified peptides with lab-grade documentation, trusted COAs, and responsive support for research teams.
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  ✉️
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Contact</p>
                  <a href="mailto:support@verifiedpeptides.vip" className="hover:text-blue-600 transition-colors">
                    ababy1blue@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  📍
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Location</p>
                  <p>Logistics & Distribution Hub</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-5">Quick links</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <span className="text-blue-600">•</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-semibold mb-5">Investor inquiries</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Contact our team for investor relations and corporate information.
            </p>
            <a href="mailto:support@verifiedpeptides.vip" className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              ababy1blue@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-8 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-3">
          <span>© {currentYear} verifiedpeptides. All rights reserved.</span>
          <span className="text-xs text-slate-500">Products are for research and laboratory use only.</span>
        </div>
      </div>
    </footer>
  );
}