// app/contact/page.jsx
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us | Veritas Bio Labs',
  description:
    'Get in touch with Veritas Bio Labs for inquiries about our research peptides, COAS, or any questions. We are here to help.',
};

export default function ContactPage() {
  return <ContactClient />;
}