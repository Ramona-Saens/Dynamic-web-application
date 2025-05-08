'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaHome, FaUsers, FaClipboardList, FaChartLine, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'; // Import icons


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Hide header on /login or /register
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gray/60 backdrop-blur-md shadow-md z-10">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        {pathname === '/myposts' ? (
          user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center"
            >
              <FaSignOutAlt className="text-2xl mb-1" />
              <span className="text-sm">Logout</span>
            </button>
          )
        ) : (
          <>
            <Link href="/" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaHome className="text-2xl mb-1" />
              <span className="text-sm">Home</span>
            </Link>
            <Link href="/users" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaUsers className="text-2xl mb-1" />
              <span className="text-sm">Users</span>
            </Link>
            <Link href="/posts" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaClipboardList className="text-2xl mb-1" />
              <span className="text-sm">Posts</span>
            </Link>
            <Link href="/chart" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaChartLine className="text-2xl mb-1" />
              <span className="text-sm">Chart</span>
            </Link>
            <Link href="/login" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaSignInAlt className="text-2xl mb-1" />
              <span className="text-sm">Login</span>
            </Link>
            <Link href="/register" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaUserPlus className="text-2xl mb-1" />
              <span className="text-sm">Register</span>
            </Link>
  
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center"
              >
                <FaSignOutAlt className="text-2xl mb-1" />
                <span className="text-sm">Logout</span>
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
  
  
}
