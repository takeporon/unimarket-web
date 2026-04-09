'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Heart,
  Plus,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム', icon: Home },
    { href: '/favorites', label: 'いいね', icon: Heart },
    { href: '/post', label: '出品', icon: Plus },
    { href: '/schedule', label: '時間割', icon: Calendar },
    { href: '/menu', label: 'その他', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href.split('/')[1]);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full text-xs ${
                isActive ? 'text-gray-800' : 'text-gray-500'
              } hover:text-gray-800 transition-colors`}
            >
              <Icon size={24} className="mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
