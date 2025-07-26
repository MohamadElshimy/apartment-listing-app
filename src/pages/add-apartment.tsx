import { useState } from 'react';
import { useRouter } from 'next/router';
import { addApartment } from '@/lib/api';
import { Apartment } from '@/types/apartment';

const initialState = {
  unitName: '',
  unitNumber: '',
  project: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  description: '',
  imageUrl: '',
};

export default function AddApartment() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.unitName || !form.unitNumber || !form.project || !form.price || !form.bedrooms || !form.bathrooms || !form.size || !form.description) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (isNaN(Number(form.price)) || isNaN(Number(form.bedrooms)) || isNaN(Number(form.bathrooms)) || isNaN(Number(form.size))) {
      setError('Price, bedrooms, bathrooms, and size must be numbers.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        size: Number(form.size),
      };
      await addApartment(payload as Omit<Apartment, '_id'>);
      setSuccess('Apartment added successfully! Redirecting...');
      setTimeout(() => router.push('/'), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to add apartment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add New Apartment</h1>
      <div className="mb-4">
        <a href="/" className="text-blue-700 hover:underline">&larr; Back to Home</a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input name="unitName" value={form.unitName} onChange={handleChange} placeholder="Unit Name*" className="w-full border p-2 rounded" />
        <input name="unitNumber" value={form.unitNumber} onChange={handleChange} placeholder="Unit Number*" className="w-full border p-2 rounded" />
        <input name="project" value={form.project} onChange={handleChange} placeholder="Project*" className="w-full border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price*" className="w-full border p-2 rounded" type="number" min="0" />
        <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms*" className="w-full border p-2 rounded" type="number" min="0" />
        <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms*" className="w-full border p-2 rounded" type="number" min="0" />
        <input name="size" value={form.size} onChange={handleChange} placeholder="Size (sq ft)*" className="w-full border p-2 rounded" type="number" min="0" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description*" className="w-full border p-2 rounded" rows={3} />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL (optional)" className="w-full border p-2 rounded" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
          {loading ? 'Adding...' : 'Add Apartment'}
        </button>
      </form>
    </div>
  );
} 