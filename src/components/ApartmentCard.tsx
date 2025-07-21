import Link from 'next/link';
import { Apartment } from '@/types/apartment';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white">
      <img
        src={apartment.imageUrl || '/placeholder.jpg'}
        alt={apartment.unitName}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold">{apartment.unitName}</h2>
      <p className="text-gray-600">Unit: {apartment.unitNumber}</p>
      <p className="text-gray-600">Project: {apartment.project}</p>
      <p className="text-lg font-bold mt-2">${apartment.price.toLocaleString()}</p>
      <Link href={`/apartments/${apartment._id}`}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Details
        </button>
      </Link>
    </div>
  );
}