import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchApartmentById } from '@/lib/api';
import { Apartment } from '@/types/apartment';

export default function ApartmentDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      const fetchApartment = async () => {
        try {
          setLoading(true);
          const data = await fetchApartmentById(id);
          setApartment(data);
        } catch (error) {
          console.error('Error fetching apartment:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchApartment();
    }
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!apartment) return <div className="text-center p-4">Apartment not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{apartment.unitName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={apartment.imageUrl || '/placeholder.jpg'}
            alt={apartment.unitName}
            className="w-full h-96 object-cover rounded"
          />
        </div>
        <div className="space-y-4">
          <p><strong>Unit Number:</strong> {apartment.unitNumber}</p>
          <p><strong>Project:</strong> {apartment.project}</p>
          <p><strong>Price:</strong> ${apartment.price.toLocaleString()}</p>
          <p><strong>Bedrooms:</strong> {apartment.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {apartment.bathrooms}</p>
          <p><strong>Size:</strong> {apartment.size} sq ft</p>
          <p><strong>Description:</strong> {apartment.description}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Back to Listings
          </button>
        </div>
      </div>
    </div>
  );
}