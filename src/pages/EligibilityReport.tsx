import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const mockAssistanceText = "MAGI Deemed Infant, Aged Categorically Needy, SSI Recipient - Aged, MBIWD Basic, LTC-SIL - Waiver Level One, MAGI Child Under 1, MAGI Child 1-5, MAGI Child 6-18, CHIP Child 1, CHIP Child 2, MAGI Pregnant Women, MAGI Parent or Caretaker, TMA (1st 6 Months), Extended Medical Assistance (EMA), Former Foster Care, Ribicoff Kid, MAGI Adult Age 19-20, HCBS, Institutional Setting, Disabled, Blind Categorically Needy, 1619(b) Recipient, RSS Medicaid - Non-SSI, Individual Receiving Mandatory State Supplements...";

const categories = [
  { id: 'criminal', label: 'Criminal History', status: 'Likely Ineligible' },
  { id: 'assets', label: 'Financial Assets', status: 'Likely Ineligible' },
  { id: 'age', label: 'Age', status: 'Eligible' },
  { id: 'citizenship', label: 'Citizenship', status: 'Eligible' },
  { id: 'household', label: 'Household', status: 'Eligible' },
  { id: 'identity', label: 'Identity', status: 'Eligible' },
  { id: 'income', label: 'Income & Employment', status: 'Eligible' },
];

function StatusBadge({ status }: { status: string }) {
  const isEligible = status === 'Eligible';
  return (
    <span className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${
      isEligible 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80 shadow-emerald-100/10' 
        : 'bg-rose-50 text-rose-700 border-rose-200/80 shadow-rose-100/10'
    }`}>
      {status}
    </span>
  );
}

export default function EligibilityReport() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('criminal');
  const [caseStatus, setCaseStatus] = useState('Open');

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="flex flex-col gap-8 pb-20 w-full animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center text-xs font-extrabold text-zinc-500 hover:text-indigo-600 transition-all bg-white px-4.5 py-2.5 rounded-xl border border-zinc-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 w-fit uppercase tracking-widest">
          &larr; Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-zinc-200/80 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-800 text-zinc-700 font-extrabold rounded-xl shadow-sm transition-all px-5 py-3 text-[11px] uppercase tracking-widest">
            Generate Letter
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-5 py-3 text-[11px] uppercase tracking-widest hover:-translate-y-0.5">
            Export Summary
          </button>
        </div>
      </div>

      {/* Case Header & Hero Info Banner */}
      <div className="bg-white rounded-3xl shadow-sm border border-zinc-200/80 overflow-hidden flex flex-col md:flex-row relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
        
        {/* Left Status Area */}
        <div className="p-8 md:w-[35%] border-b md:border-b-0 md:border-r border-zinc-100 bg-gradient-to-b from-rose-50/20 to-transparent flex flex-col justify-center">
          <span className="text-[9px] font-black uppercase tracking-widest text-rose-600 mb-2.5 bg-rose-100/50 px-3 py-1 rounded-md w-fit">
            Final Determination
          </span>
          <div className="mb-8">
            <h2 className="text-3xl font-black text-rose-800 tracking-tight leading-none uppercase">
              Likely Ineligible
            </h2>
            <p className="text-[11px] text-zinc-400 font-semibold mt-1 uppercase tracking-wider">Requires caseworker review</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="status-select" className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-0.5">Update Case Status</label>
            <div className="flex gap-2">
              <select 
                id="status-select"
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value)}
                className="border border-zinc-200 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 bg-white shadow-sm flex-1 transition-all"
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
              <button 
                onClick={() => alert(`Status updated to ${caseStatus}`)}
                className="bg-zinc-900 hover:bg-black text-white text-xs font-black rounded-xl shadow-md hover:shadow-lg transition-all px-5 py-2.5 uppercase tracking-widest"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right Metadata Details Grid */}
        <div className="p-8 md:w-[65%] flex flex-col gap-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-zinc-50/50 border border-zinc-100 p-4.5 rounded-2xl flex flex-col gap-1 shadow-sm/5">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Case Number</span>
              <span className="text-sm font-extrabold text-zinc-800 tracking-wide">{id || '1000000001'}</span>
            </div>
            <div className="bg-zinc-50/50 border border-zinc-100 p-4.5 rounded-2xl flex flex-col gap-1 shadow-sm/5">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Client Name</span>
              <span className="text-sm font-extrabold text-zinc-800 tracking-wide">John M Doe</span>
            </div>
            <div className="bg-zinc-50/50 border border-zinc-100 p-4.5 rounded-2xl flex flex-col gap-1 shadow-sm/5">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Adults</span>
              <span className="text-sm font-extrabold text-zinc-800 tracking-wide">1</span>
            </div>
            <div className="bg-zinc-50/50 border border-zinc-100 p-4.5 rounded-2xl flex flex-col gap-1 shadow-sm/5">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Assigned User</span>
              <span className="text-sm font-extrabold text-zinc-800 tracking-wide">pcgTomelli</span>
            </div>
            <div className="bg-zinc-50/50 border border-zinc-100 p-4.5 rounded-2xl flex flex-col gap-1 shadow-sm/5 sm:col-span-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400">Date Generated</span>
              <span className="text-sm font-extrabold text-zinc-800 tracking-wide">12/11/2022 11:15 AM</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 ml-1">Type of Assistance</span>
            <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-4 text-xs font-semibold text-zinc-600 leading-relaxed max-h-24 overflow-y-auto shadow-inner hover:border-zinc-300 transition-colors">
              {mockAssistanceText}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Left-Nav / Detail Layout */}
      <div className="flex flex-col md:flex-row items-stretch gap-8 w-full">
        
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-5 bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-sm h-fit">
          <div className="px-2 border-b border-zinc-100 pb-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Verification Categories</h3>
            <p className="text-[11px] text-zinc-500 mt-1">Select a category below to verify findings</p>
          </div>
          
          <div className="flex flex-col gap-2">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const isEligible = cat.status === 'Eligible';
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 border text-left group w-full ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-600 text-white shadow-[0_6px_20px_rgba(79,70,229,0.25)] font-bold -translate-y-0.5' 
                      : 'bg-white border-zinc-100 text-zinc-700 hover:bg-zinc-50/50 hover:border-zinc-200 font-semibold'
                  }`}
                >
                  {/* Left indicator accent strip inside active button */}
                  {isActive && <div className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r"></div>}
                  
                  <span className="text-xs tracking-wide">
                    {cat.label}
                  </span>
                  
                  <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest shrink-0 transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/10'
                      : (isEligible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60')
                  }`}>
                    {isEligible ? 'Eligible' : 'Ineligible'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 bg-white rounded-3xl border border-zinc-200/80 shadow-sm p-8 min-h-[550px] flex flex-col justify-between">
          
          <div className="flex flex-col gap-6">
            {/* Detail Pane Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-5">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Caseworker inspection report</span>
                <h3 className="text-2xl font-black text-zinc-900 tracking-tight uppercase">{activeCategory?.label}</h3>
              </div>
              {activeCategory && <StatusBadge status={activeCategory.status} />}
            </div>

            {/* Dynamic Tab Content */}
            {activeTab === 'criminal' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Main Issue Alert Banner */}
                <div className="p-5 bg-gradient-to-r from-rose-50/40 to-rose-50/10 border-l-4 border-rose-500 border-y border-r border-rose-100 rounded-2xl text-rose-900 shadow-sm">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-rose-800">Discrepancy Found: Active Incarceration Record</h4>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                    Database matching reports that the client is currently incarcerated. Caseworker must verify residential status and adjust household composition counts as this directly impacts program eligibility rules.
                  </p>
                </div>

                {/* Side-by-Side reported vs verified comparison */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Application Comparison Profile
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Reported */}
                    <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-5 shadow-inner">
                      <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block mb-3 border-b border-zinc-200/50 pb-2">Reported on Application</span>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Incarcerated Status</span>
                          <span className="text-zinc-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-zinc-200">No</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Criminal History</span>
                          <span className="text-zinc-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-zinc-200">None Declared</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified */}
                    <div className="bg-rose-50/10 border border-rose-100/60 rounded-2xl p-5 shadow-sm">
                      <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 block mb-3 border-b border-rose-100 pb-2">Verified Database Records</span>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Incarcerated Status</span>
                          <span className="text-rose-700 font-extrabold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">Yes (Currently Incarcerated)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Incarceration Date</span>
                          <span className="text-rose-700 font-extrabold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">12/30/2019</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Cards */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Database Source Records</h4>
                  
                  <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-zinc-50 border-b border-zinc-200/80 px-5 py-3 flex justify-between items-center">
                      <span className="text-xs font-extrabold text-zinc-800 uppercase tracking-wider">Source: TransUnion Criminal database</span>
                      <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-100/80 px-2.5 py-1 rounded-lg font-black uppercase tracking-widest">Ineligibility Flag</span>
                    </div>
                    <div className="p-5 flex flex-col gap-3.5">
                      <div className="text-xs font-extrabold text-zinc-800">Burglary of a Building (Felony)</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Database match indicates the client was arrested and incarcerated on <span className="font-bold text-zinc-800 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-150">12/30/2019</span>. Facility details and active prisoner record ID are confirmed. Action is required to adjust benefit counts.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-3 text-xs border-t border-zinc-100/80">
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Record ID</span>
                          <span className="font-extrabold text-zinc-700">TU-99221199A</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Disposition</span>
                          <span className="font-extrabold text-zinc-700">Guilty - Incarcerated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-zinc-50 border-b border-zinc-200/80 px-5 py-3 flex justify-between items-center">
                      <span className="text-xs font-extrabold text-zinc-800 uppercase tracking-wider">Source: APPRISS Real-Time Incarceration</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100/80 px-2.5 py-1 rounded-lg font-black uppercase tracking-widest">Match Clear</span>
                    </div>
                    <div className="p-5 flex flex-col gap-3.5">
                      <div className="text-xs font-extrabold text-zinc-800">Obstructing Officer Without Violence (Misdemeanor)</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Client was incarcerated during the previous 12 months, booking number <span className="font-semibold text-zinc-700 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-150">1900034</span>. Client was successfully released on <span className="font-bold text-zinc-800">04/29/2022</span>. No active holds or warrants found.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-3 text-xs border-t border-zinc-100/80">
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Booking Number</span>
                          <span className="font-extrabold text-zinc-700">1900034</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Release Date</span>
                          <span className="font-extrabold text-zinc-700">04/29/2022</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Profile Verification Detail */}
                <div className="bg-indigo-50/10 border border-indigo-100/60 rounded-2xl p-5">
                  <div className="mb-3 border-b border-indigo-100 pb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-700">Verified Identity Reference</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Full Name</span>
                      <span className="font-extrabold text-zinc-800">John Marcus Doe</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Date of Birth</span>
                      <span className="font-bold text-zinc-700">01/01/1991</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">SSN Reference</span>
                      <span className="font-mono font-bold text-zinc-700">XXX-XX-1235</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Address verified</span>
                      <span className="font-semibold text-zinc-700">123 Main St, Toledo, OH</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assets' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Asset Alert Banner */}
                <div className="p-5 bg-gradient-to-r from-rose-50/40 to-rose-50/10 border-l-4 border-rose-500 border-y border-r border-rose-100 rounded-2xl text-rose-900 shadow-sm">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-rose-800">Discrepancy Found: Asset Transfer Limit Exceeded</h4>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                    Acuity Asset Verification database reports a balance decrease exceeding $5,000.00 within a 60-day period. This may indicate unverified asset transfers, resource divestment, or bank accounts exceeding program asset limits.
                  </p>
                </div>

                {/* Side-by-Side Comparison */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Asset Value Verification
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Reported */}
                    <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-2xl p-5 shadow-inner">
                      <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block mb-3 border-b border-zinc-200/50 pb-2">Reported on Application</span>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Reported Assets</span>
                          <span className="text-zinc-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-zinc-200">$2,000.00</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Bank Accounts Listed</span>
                          <span className="text-zinc-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-zinc-200">1 Account (Savings)</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified */}
                    <div className="bg-rose-50/10 border border-rose-100/60 rounded-2xl p-5 shadow-sm">
                      <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 block mb-3 border-b border-rose-100 pb-2">Verified Database Records</span>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Verified Total Assets</span>
                          <span className="text-rose-700 font-extrabold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">$45,172.00</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-500 font-semibold">Asset Drop Amount</span>
                          <span className="text-rose-700 font-extrabold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">$7,828.00 (in 60 Days)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Records */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Database Source Records</h4>
                  
                  <div className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-zinc-50 border-b border-zinc-200/80 px-5 py-3 flex justify-between items-center">
                      <span className="text-xs font-extrabold text-zinc-800 uppercase tracking-wider">Source: Acuity Asset Verification System</span>
                      <span className="text-[9px] bg-rose-50 text-rose-700 border border-rose-100/80 px-2.5 py-1 rounded-lg font-black uppercase tracking-widest">Ineligibility Flag</span>
                    </div>
                    <div className="p-5 flex flex-col gap-3.5">
                      <div className="text-xs font-extrabold text-zinc-800">Unreported Financial Asset / Account Match</div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                        Account balance was <span className="text-zinc-950 font-bold bg-zinc-100 px-2 py-0.5 border border-zinc-200 rounded">$53,000.00</span> on 03/01/2022, and dropped to <span className="text-zinc-950 font-bold bg-zinc-100 px-2 py-0.5 border border-zinc-200 rounded">$45,172.00</span> on 05/01/2022. This account is registered at Huntington Bank and is not listed in the application.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 text-xs border-t border-zinc-100/80">
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Institution</span>
                          <span className="font-extrabold text-zinc-700">Huntington National Bank</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Account Number</span>
                          <span className="font-semibold text-zinc-700">XXXX-XXXX-9901</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[9px] uppercase font-black tracking-wider">Current Balance</span>
                          <span className="font-black text-rose-600">$45,172.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!['criminal', 'assets'].includes(activeTab) && (
              <div className="flex flex-col gap-8 flex-1 justify-center items-center py-10 animate-in fade-in duration-200">
                
                {/* Success Banner */}
                <div className="p-6 bg-gradient-to-r from-emerald-50/40 to-emerald-50/10 border border-emerald-100 rounded-3xl flex flex-col items-center text-center gap-2 max-w-lg shadow-sm">
                  <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200/50 px-3 py-1 rounded-md uppercase tracking-widest mb-1 shadow-sm">
                    Verification Certificate
                  </span>
                  <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Verification Passed</h3>
                  <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                    No negative findings were reported for this category. The client's self-reported application details match state and federal databases perfectly.
                  </p>
                </div>

                {/* Side-by-Side Match Verification */}
                <div className="w-full max-w-xl">
                  <div className="bg-zinc-50/50 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-zinc-100/50 px-5 py-3 border-b border-zinc-200">
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Comparison Audit Trails</span>
                    </div>
                    <div className="divide-y divide-zinc-250/60 text-xs">
                      
                      {activeTab === 'age' && (
                        <>
                          <div className="flex justify-between items-center p-4.5">
                            <span className="text-zinc-500 font-semibold">Reported Date of Birth</span>
                            <span className="font-extrabold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">01/01/1991</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-emerald-50/10">
                            <span className="text-zinc-500 font-semibold">Verified Date of Birth</span>
                            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">01/01/1991 (SSA MATCH)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-white">
                            <span className="text-zinc-500 font-semibold">Calculated Age</span>
                            <span className="font-extrabold text-zinc-800">31 Years Old</span>
                          </div>
                        </>
                      )}

                      {activeTab === 'citizenship' && (
                        <>
                          <div className="flex justify-between items-center p-4.5">
                            <span className="text-zinc-500 font-semibold">Reported Citizenship</span>
                            <span className="font-extrabold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">U.S. Citizen</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-emerald-50/10">
                            <span className="text-zinc-500 font-semibold">Verified Citizenship</span>
                            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">U.S. Citizen (SSA/DHS MATCH)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-white">
                            <span className="text-zinc-500 font-semibold">Verification Status</span>
                            <span className="font-bold text-zinc-800 uppercase tracking-widest text-[10px]">Lawful Presence Verified</span>
                          </div>
                        </>
                      )}

                      {activeTab === 'household' && (
                        <>
                          <div className="flex justify-between items-center p-4.5">
                            <span className="text-zinc-500 font-semibold">Reported Household Size</span>
                            <span className="font-extrabold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">1 Adult, 0 Children</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-emerald-50/10">
                            <span className="text-zinc-500 font-semibold">Verified Household Size</span>
                            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">1 Adult, 0 Children (DMV MATCH)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-white">
                            <span className="text-zinc-500 font-semibold">Relationship Details</span>
                            <span className="font-extrabold text-zinc-800">Single Person Household</span>
                          </div>
                        </>
                      )}

                      {activeTab === 'identity' && (
                        <>
                          <div className="flex justify-between items-center p-4.5">
                            <span className="text-zinc-500 font-semibold">Reported Name & SSN</span>
                            <span className="font-extrabold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">John M Doe (XXX-XX-1235)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-emerald-50/10">
                            <span className="text-zinc-500 font-semibold">Verified SSN Match</span>
                            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">Verified (TransUnion Match)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-white">
                            <span className="text-zinc-500 font-semibold">Biometric / Photo Match</span>
                            <span className="font-extrabold text-zinc-800">Verified via Ohio BMV</span>
                          </div>
                        </>
                      )}

                      {activeTab === 'income' && (
                        <>
                          <div className="flex justify-between items-center p-4.5">
                            <span className="text-zinc-500 font-semibold">Reported Monthly Income</span>
                            <span className="font-extrabold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">$1,200.00</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-emerald-50/10">
                            <span className="text-zinc-500 font-semibold">Verified Monthly Income</span>
                            <span className="font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg">$1,200.00 (Equifax WorkNumber MATCH)</span>
                          </div>
                          <div className="flex justify-between items-center p-4.5 bg-white">
                            <span className="text-zinc-500 font-semibold">Income Program Limit</span>
                            <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">$1,428.00 (Eligible)</span>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </div>
                
              </div>
            )}

          </div>

          {/* CAS Details Footer Actions */}
          <div className="mt-8 pt-5 border-t border-zinc-150 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <span>Audit Code: IEVS-OH-{(id || '1000000001').substring(5)}</span>
            <span>Last Checked: Today</span>
          </div>

        </div>

      </div>
    </div>
  );
}
