import Link from 'next/link';
import { Apartment } from '@/types/apartment';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative overflow-hidden">
        <img
          src={apartment.imageUrl || '/placeholder.jpg'}
          alt={apartment.unitName}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {apartment.project}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Available
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {apartment.unitName}
          </h2>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(apartment.price)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          Unit {apartment.unitNumber} • {apartment.size.toLocaleString()} sq ft
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">🛏️</span>
              <span>{apartment.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">🚿</span>
              <span>{apartment.bathrooms} bath</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {apartment.description}
        </p>
        
        <Link href={`/apartments/${apartment._id}`}>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium group-hover:shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}