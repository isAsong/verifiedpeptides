// app/calculator/page.jsx
import CalculatorClient from './CalculatorClient';

export const metadata = {
  title: 'Peptide Calculator | verifiedpeptides',
  description: 'Calculate your peptide dosage and reconstitution volume accurately. Free peptide calculator for research purposes.',
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}