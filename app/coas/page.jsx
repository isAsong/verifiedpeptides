// app/coas/page.jsx
import { getAllCoas, groupCoasByMonth } from '@/lib/data/coas';
import CoasClient from './CoasClient';

export const metadata = {
  title: 'COAs | Veritas Bio Labs',
  description: 'Certificates of Analysis for our products.',
};

export default function CoasPage() {
  const allCoas = getAllCoas();
  const monthGroups = groupCoasByMonth(allCoas);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Certificates of Analysis (COAs)
      </h1>
      <CoasClient initialMonthGroups={monthGroups} />
    </div>
  );
}