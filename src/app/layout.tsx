import './globals.css';
import { Inter } from 'next/font/google';
import { LayoutDashboard } from 'lucide-react';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Waste Management Dashboard',
  description: 'Report and track waste issues seamlessly.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <LayoutDashboard className="w-6 h-6 text-emerald-600 mr-3" />
            <h1 className="text-xl font-semibold text-slate-800">Waste Management Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

