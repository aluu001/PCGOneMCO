import React from 'react';
import { Search, FolderPlus, FileText, Settings, User, ChevronDown, Activity } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 shadow-sm bg-white border-b border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-indigo-700">
                <Activity className="w-8 h-8" />
                <span className="text-3xl font-bold tracking-tight">IEVS</span>
              </div>
              <span className="text-[11px] text-zinc-600 font-semibold mt-1 uppercase tracking-wider">Ohio TEST - logged in as Manager Confidential</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-zinc-600">
            <button className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
              <Search className="w-4 h-4" /> IEVS Results
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
              <FolderPlus className="w-4 h-4" /> New Request
            </button>
            <button className="flex items-center gap-1 hover:text-indigo-700 transition-colors">
              Task Management <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hover:text-indigo-700 transition-colors">
              Identity Investigation
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
              <FileText className="w-4 h-4" /> Reports <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors">
              <Settings className="w-4 h-4" /> Administration <ChevronDown className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-700 transition-colors md:ml-4 md:pl-4 md:border-l border-zinc-200">
              <User className="w-4 h-4" /> Pcg Dev <ChevronDown className="w-3 h-3" />
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
