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
      <nav className="container mx-auto px-6 py-4 flex justify-center items-center space-x-6">
        {pathname === '/myposts' ? (
          // Show only logout if on /myposts
          user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center"
            >
              <FaSignOutAlt className="text-2xl mb-2" /> {/* Logout icon */}
              Logout
            </button>
          )
        ) : (
          // Show full header on all other pages (including /posts)
          <>
            <Link href="/" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaHome className="text-2xl mb-2" /> {/* Home icon */}
              Home
            </Link>
            <Link href="/users" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaUsers className="text-2xl mb-2" /> {/* Users icon */}
              Users
            </Link>
            <Link href="/posts" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaClipboardList className="text-2xl mb-2" /> {/* Posts icon */}
              Posts
            </Link>
            <Link href="/chart" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaChartLine className="text-2xl mb-2" /> {/* Chart icon */}
              Chart
            </Link>
            <Link href="/login" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaSignInAlt className="text-2xl mb-2" /> {/* Login icon */}
              Login
            </Link>
            <Link href="/register" className="text-gray-800 hover:text-blue-600 flex flex-col items-center">
              <FaUserPlus className="text-2xl mb-2" /> {/* Register icon */}
              Register
            </Link>
            
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium flex flex-col items-center"
              >
                <FaSignOutAlt className="text-2xl mb-2" /> {/* Logout icon */}
                Logout
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
  
}
