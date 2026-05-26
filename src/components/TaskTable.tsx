import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const mockTasks = Array(15).fill(null).map((_, i) => ({
  id: `100000000${i + 1}`,
  assignedTo: i % 2 === 0 ? 'pcgTomelli' : 'pcgSmith',
  county: 'Adams',
  timeStamp: `12/12/2022 ${10 + i}:47`,
  applicationDate: '12/12/2022',
  householdAdults: 1,
  taskStatus: i % 3 === 0 ? 'Closed' : 'Open',
  reportStatus: i % 4 === 0 ? 'Pending' : 'Likely Ineligible',
  reason: 'Income & Employment, Any Household, Unverified Wage Data',
}));

export default function TaskTable() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex items-center gap-2 text-red-500 text-[11px] font-semibold tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        * Denotes New Data
      </div>
      
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-zinc-200 overflow-hidden flex flex-col transition-all">
        <div className="overflow-hidden">
          <table className="w-full text-left table-fixed">
            <thead className="bg-zinc-50/80 border-b border-zinc-200 backdrop-blur-sm">
              <tr>
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[12%]">Case Number</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[10%]">Assigned To</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[8%]">County</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[10%]">Time Stamp</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[9%]">App Date</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[7%] text-center">Adults</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[10%]">Task Status</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[10%]">Report Status</th>
                <th className="py-3 px-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[17%]">Reason(s)</th>
                <th className="py-3 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest w-[7%] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockTasks.map((task, i) => (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="py-3 px-4 text-[12px] font-bold text-indigo-700 cursor-pointer group-hover:underline truncate">{task.id}</td>
                  <td className="py-3 px-2 text-[12px] font-medium text-zinc-700 truncate">{task.assignedTo}</td>
                  <td className="py-3 px-2 text-[12px] text-zinc-600 truncate">{task.county}</td>
                  <td className="py-3 px-2 text-[11px] text-zinc-500 truncate">{task.timeStamp}</td>
                  <td className="py-3 px-2 text-[11px] text-zinc-500 truncate">{task.applicationDate}</td>
                  <td className="py-3 px-2 text-[12px] font-semibold text-zinc-700 text-center">{task.householdAdults}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${task.taskStatus === 'Open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : 'bg-zinc-100 text-zinc-600 border border-zinc-200'}`}>
                      {task.taskStatus === 'Open' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {task.taskStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${task.reportStatus === 'Likely Ineligible' ? 'bg-red-50 text-red-700 border border-red-200/50' : 'bg-orange-50 text-orange-700 border border-orange-200/50'}`}>
                      {task.reportStatus === 'Likely Ineligible' ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {task.reportStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-[11px] font-medium text-zinc-600 whitespace-normal break-words leading-snug">{task.reason}</td>
                  <td className="py-3 px-4 text-right">
                    <Link to={`/task/${task.id}`} className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-1.5 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase tracking-widest whitespace-nowrap text-center">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-zinc-200 bg-zinc-50/80">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Showing 1 to 15 of 45 items
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-[11px] font-bold bg-indigo-700 text-white shadow-sm transition-transform hover:scale-105">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-[11px] font-semibold text-zinc-600 hover:bg-zinc-200/50 transition-colors">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-[11px] font-semibold text-zinc-600 hover:bg-zinc-200/50 transition-colors">
              3
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
