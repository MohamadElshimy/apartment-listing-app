import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🏠</span>
              </div>
              <div>
                <span className="font-bold text-2xl text-gray-900 group-hover:text-blue-600 transition-colors">
                  Nawy
                </span>
                <div className="text-xs text-gray-500 -mt-1">Real Estate</div>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
                Browse Properties
              </span>
            </Link>
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
                About Us
              </span>
            </Link>
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
                Contact
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/add-apartment">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                List Property
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 