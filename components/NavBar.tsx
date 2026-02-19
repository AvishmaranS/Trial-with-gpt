'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' }
];

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bgPrimary/75 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-serif text-xl tracking-wide text-textPrimary">
          Avishmaran
        </Link>
        <ul className="flex items-center gap-5 text-sm text-textSecondary">
          {links.map((link) => (
            <li key={link.href}>
              <motion.div whileHover={{ opacity: 1, y: -1 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <Link className="opacity-80 transition-opacity hover:opacity-100" href={link.href}>
                  {link.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
