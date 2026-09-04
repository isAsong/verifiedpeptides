import './globals.css';
import Script from 'next/script';
import { META_PIXEL_ID } from '@/lib/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
import MetaPixelTracker from '@/components/MetaPixelTracker';

export const metadata = {
  metadataBase: new URL('https://verifiedpeptides.vip'),
  title: {
    default: 'verifiedpeptides - Research Peptides',
    template: '%s | verifiedpeptides',
  },
  description: 'High-purity research peptides for laboratory use. Shop Tirzepatide, Retatrutide, Semaglutide and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <MetaPixelTracker />

        {/* ===== Meta Pixel Code ===== */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1886834652486700');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>< img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=1886834652486700&ev=PageView&noscript=1"
        /></noscript>
        {/* ===== End Meta Pixel Code ===== */}
      </body>
    </html>
  );
}