'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/tours', label: 'Tours' },
    { href: '/about', label: 'Nosotros' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-primary-900/95 via-primary-800/95 to-primary-900/95 backdrop-blur-md border-b border-primary-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white rounded-lg p-2 shadow-md group-hover:shadow-xl transition-shadow">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                KT
              </span>
            </div>
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              KaelTours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white hover:text-primary-200 transition-colors font-medium ${
                  pathname === link.href ? 'text-primary-200 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-white text-primary-700 rounded-lg hover:bg-primary-50 transition-all font-semibold shadow-md hover:shadow-xl transform hover:scale-105"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-700/50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-white hover:text-primary-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/dashboard"
              className="block py-2 text-primary-200 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
