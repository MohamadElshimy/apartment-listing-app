import { useState, useEffect } from 'react';
import { fetchApartments } from '@/lib/api';
import ApartmentCard from '@/components/ApartmentCard';
import { Apartment } from '@/types/apartment';

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [search, setSearch] = useState('');
  const [project, setProject] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApartments = async () => {
      try {
        setLoading(true);
        const data = await fetchApartments(search, project);
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadApartments();
  }, [search, project]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Apartment Listings</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or unit number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Filter by project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.length > 0 ? (
            apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))
          ) : (
            <p className="text-center col-span-full">No apartments found.</p>
          )}
        </div>
      )}
    </div>
  );
}