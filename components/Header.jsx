'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Search, Menu, X, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../public/Blogo3.svg';
import { useAuth } from "@/src/contexts/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-5 flex justify-between items-center rounded-bl-3xl rounded-br-3xl z-50 relative font-instrument">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8 pl-8">
          <Link href="/">
            <Image src={Logo} alt="Pharmacy Logo" width={150} height={35} className="object-contain" />
          </Link>

          <nav className="hidden lg:flex gap-10 text-sm font-medium text-black font-instrument">
            <Link href="/#home" className="hover:text-[#0B5C64]">Home</Link>
            <Link href="/#services" className="hover:text-[#0B5C64]">Services</Link>
            <Link href="/booking" className="hover:text-[#0B5C64]">Book Vaccination</Link>
            {/* <Link href="/blog" className="hover:text-[#0B5C64]">Blogs</Link> */}
            <Link href="/#about" className="hover:text-[#0B5C64]">About</Link>
            <Link href="/#faq" className="hover:text-[#0B5C64]">Help</Link>
          </nav>

        </div>

        {/* Right: Contact + Icons */}
        <div className="flex items-center gap-6 pr-4">
          {/* Contact info on desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Phone size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Phone Number</p>
              <p className="font-medium text-[#4C4C4C]">01489892499</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="bg-[#037F91] p-2 rounded-full text-white">
              <Mail size={18} />
            </div>
            <div className="text-xs leading-4 text-black">
              <p className="font-bold">Email Us Here</p>
              <p className="font-medium text-[#4C4C4C]">pharmacy.frn21@nhs.net</p>
            </div>
          </div>



          {/* User dropdown - only shown when authenticated */}
          {isAuthenticated && (
            <div className="hidden md:flex relative" ref={dropdownRef}>
              <button
                className="text-[#0B5C64] hover:text-[#037F91] transition-colors"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <div className="bg-[#0B5C64] p-2 rounded-full text-white">
                  <User size={18} />

                </div>

              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      Signed in as <br />
                      <span className="font-semibold">{user?.email || user?.name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        window.location.href = "/";
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile: Menu button on top, contact info below in one row */}
          <div className="flex flex-col items-end gap-8 lg:hidden">
            <div
              className="text-2xl text-[#0B5C64] cursor-pointer"
              onClick={toggleMenu}
            >
              {menuOpen ? <X /> : <Menu />}
            </div>

            {/* Contact info on mobile - Email and Phone in same row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="bg-[#037F91] p-1 rounded-full text-white">
                  <Mail size={11} />
                </div>
                <p className="text-[10px] font-medium text-[#4C4C4C]">pharmacy.frn21@nhs.net</p>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="bg-[#037F91] p-1 rounded-full text-white">
                  <Phone size={11} />
                </div>
                <p className="text-[10px] font-medium text-[#4C4C4C]">01489892499</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={toggleMenu}
            />
            
            {/* Slide Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center px-6 py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-1 px-6 py-4 flex-1">
                <Link 
                  href="/#home" 
                  onClick={toggleMenu}
                  className="py-3 text-gray-800 hover:text-[#0B5C64] hover:bg-gray-50 rounded-md px-3 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/#services" 
                  onClick={toggleMenu}
                  className="py-3 text-gray-800 hover:text-[#0B5C64] hover:bg-gray-50 rounded-md px-3 transition-colors font-medium"
                >
                  Services
                </Link>
                <Link 
                  href="/booking" 
                  onClick={toggleMenu}
                  className="py-3 text-gray-800 hover:text-[#0B5C64] hover:bg-gray-50 rounded-md px-3 transition-colors font-medium"
                >
                  Book Vaccination
                </Link>
                {/* <Link href="/blog" onClick={toggleMenu}>Blogs</Link> */}
                <Link 
                  href="/#about" 
                  onClick={toggleMenu}
                  className="py-3 text-gray-800 hover:text-[#0B5C64] hover:bg-gray-50 rounded-md px-3 transition-colors font-medium"
                >
                  About
                </Link>
                <Link 
                  href="/#faq" 
                  onClick={toggleMenu}
                  className="py-3 text-gray-800 hover:text-[#0B5C64] hover:bg-gray-50 rounded-md px-3 transition-colors font-medium"
                >
                  Help
                </Link>

                {isAuthenticated && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500 mb-3 px-3">
                      Signed in as <br />
                      <span className="font-semibold text-gray-700">{user?.email || user?.name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                        window.location.href = "/";
                      }}
                      className="w-full text-left py-3 px-3 text-red-500 hover:bg-red-50 rounded-md flex items-center gap-2 font-medium transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;