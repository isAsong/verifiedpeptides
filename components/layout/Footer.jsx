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
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 border-b border-slate-800 pb-10">
          <div className="space-y-6">
            <Link href="/">
              <Image
                src="/images/common/logo.png"
                alt="verifiedpeptides"
                width={160}
                height={40}
                className="brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
              Verified peptides with lab-grade documentation, trusted COAs, and responsive support for research teams.
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  ✉️
                </span>
                <div>
                  <p className="font-semibold text-slate-100">Contact</p>
                  <a href="mailto:support@verifiedpeptides.vip" className="hover:text-white transition-colors">
                    support@verifiedpeptides.vip
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                  📍
                </span>
                <div>
                  <p className="font-semibold text-slate-100">Location</p>
                  <p>Logistics & Distribution Hub</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5">Quick links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-cyan-300">•</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5">Media inquiries</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              For press or partnership questions, reach out via email and we will respond promptly.
            </p>
            <a href="mailto:support@verifiedpeptides.vip" className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-white transition-colors">
              support@verifiedpeptides.vip
            </a>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5">Investor inquiries</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Contact our team for investor relations and corporate information.
            </p>
            <a href="mailto:support@verifiedpeptides.vip" className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-white transition-colors">
              support@verifiedpeptides.vip
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