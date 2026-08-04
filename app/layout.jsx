import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';

export const metadata = {
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
      </body>
    </html>
  );
}