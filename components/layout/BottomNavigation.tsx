'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ThumbsUp,
  Camera,
  LayoutGrid,
  MoreHorizontal,
} from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/home', label: 'ホーム', icon: Home },
    { href: '/favorites', label: 'いいね！', icon: ThumbsUp },
    { href: '/post', label: '出品', icon: Camera },
    { href: '/schedule', label: '時間割', icon: LayoutGrid },
    { href: '/settings', label: 'その他', icon: MoreHorizontal },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0 z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full text-xs ${
                isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
              } hover:text-gray-900 transition-colors`}
            >
              <Icon size={22} className="mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
