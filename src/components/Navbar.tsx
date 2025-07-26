import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg border-b-4 border-blue-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-lg">🏠</span>
              </div>
              <span className="font-bold text-xl group-hover:text-blue-200 transition-colors">
                Nawy
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/">
              <span className="hover:text-blue-200 transition-colors font-medium cursor-pointer">
                Browse Properties
              </span>
            </Link>
            <Link href="/add-apartment">
              <span className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium cursor-pointer">
                List Property
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 