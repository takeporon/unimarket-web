import TopBar from '@/components/layout/TopBar';
import BottomNavigation from '@/components/layout/BottomNavigation';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar />

      {/* Main content area with padding for top and bottom navigation */}
      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 pt-20 pb-20">
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
}
