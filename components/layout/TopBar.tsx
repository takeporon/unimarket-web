'use client';

import Link from 'next/link';
import { ShoppingCart, Bell, User } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-center relative">
        {/* Logo - Center */}
        <Link href="/home" className="flex items-center">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-lg">🎓</span>
          </div>
        </Link>

        {/* Right icons - Absolute positioned */}
        <div className="absolute right-4 flex items-center gap-5">
          <Link href="/cart" className="text-gray-700 hover:text-gray-900">
            <ShoppingCart size={22} />
          </Link>
          <Link href="/notifications" className="text-gray-700 hover:text-gray-900">
            <Bell size={22} />
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-gray-900">
            <User size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
}
