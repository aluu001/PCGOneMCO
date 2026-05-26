import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 shadow-sm bg-white border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-indigo-700">
                <span className="text-3xl font-black tracking-tight">IEVS</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold mt-0.5 uppercase tracking-wider">Ohio TEST - logged in as Manager Confidential</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wider text-zinc-600">
            <Link to="/" className="hover:text-indigo-700 transition-colors">
              IEVS Results
            </Link>
            <Link to="/new-request" className="hover:text-indigo-700 transition-colors">
              New Request
            </Link>
            <button className="hover:text-indigo-700 transition-colors">
              Task Management
            </button>
            <button className="hover:text-indigo-700 transition-colors font-medium text-zinc-500">
              Identity Investigation
            </button>
            <button className="hover:text-indigo-700 transition-colors">
              Reports
            </button>
            <button className="hover:text-indigo-700 transition-colors">
              Administration
            </button>
            <button className="hover:text-indigo-700 transition-colors md:ml-4 md:pl-4 md:border-l border-zinc-200 text-indigo-600">
              Pcg Dev
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 mt-8 w-full flex-1">
        {children}
      </main>
    </div>
  );
}
