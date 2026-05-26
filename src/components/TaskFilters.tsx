import React from 'react';
import { Filter, UserCircle } from 'lucide-react';

export default function TaskFilters() {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-zinc-200 overflow-hidden mb-8">
      <div className="bg-zinc-50/50 border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-zinc-800 tracking-wide flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          Filter Criteria
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="caseNumber" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">Case Number</label>
            <input type="text" id="caseNumber" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm placeholder:text-zinc-400" placeholder="8 to 10 digits" />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="taskStatus" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">Task Status</label>
            <select id="taskStatus" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm">
              <option>Open</option>
              <option>Closed</option>
              <option>All</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reportStatus" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">Report Status</label>
            <select id="reportStatus" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm">
              <option>All</option>
              <option>Likely Ineligible</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reason" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">Reason</label>
            <select id="reason" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm">
              <option>All</option>
              <option>Income & Employment</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="county" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">County</label>
            <select id="county" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm">
              <option>Adams</option>
              <option>Allen</option>
              <option>Ashland</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="renewalMonth" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-0.5">Renewal Month</label>
            <select id="renewalMonth" className="border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all shadow-sm">
              <option value="">Select month</option>
              <option>January</option>
              <option>February</option>
            </select>
          </div>

          <div className="lg:col-span-2 flex items-end justify-end gap-3 pt-2">
            <button className="bg-white border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 text-indigo-700 font-semibold rounded-lg shadow-sm transition-all px-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm transition-all px-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 flex items-center gap-2">
              <UserCircle className="w-4 h-4" /> My Tasks
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
