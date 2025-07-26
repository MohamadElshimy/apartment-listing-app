import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="font-bold text-xl cursor-pointer">Apartments</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/add-apartment">
            <span className="hover:underline cursor-pointer">Add Apartment</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 