'use client';

import Link from 'next/link';
import { ShoppingCart, Bell, User } from 'lucide-react';
import Image from 'next/image';

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center text-white font-bold">
            U
          </div>
          <span className="font-bold text-lg hidden sm:inline">UniMarket</span>
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-gray-600 hover:text-gray-900">
            <ShoppingCart size={24} />
          </Link>
          <Link href="/notifications" className="text-gray-600 hover:text-gray-900">
            <Bell size={24} />
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            <User size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
