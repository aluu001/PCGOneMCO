import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Download, 
  User, 
  Calendar, 
  FileDigit, 
  Briefcase, 
  Building2, 
  MapPin, 
  Activity, 
  FileWarning, 
  ShieldAlert, 
  ChevronRight,
  Check,
  AlertTriangle
} from 'lucide-react';

const mockAssistanceText = "MAGI Deemed Infant, Aged Categorically Needy, SSI Recipient - Aged, MBIWD Basic, LTC-SIL - Waiver Level One, MAGI Child Under 1, MAGI Child 1-5, MAGI Child 6-18, CHIP Child 1, CHIP Child 2, MAGI Pregnant Women, MAGI Parent or Caretaker, TMA (1st 6 Months), Extended Medical Assistance (EMA), Former Foster Care, Ribicoff Kid, MAGI Adult Age 19-20, HCBS, Institutional Setting, Disabled, Blind Categorically Needy, 1619(b) Recipient, RSS Medicaid - Non-SSI, Individual Receiving Mandatory State Supplements...";

const categories = [
  { id: 'criminal', label: 'Criminal History', icon: Building2, status: 'Likely Ineligible' },
  { id: 'assets', label: 'Financial Assets', icon: Briefcase, status: 'Likely Ineligible' },
  { id: 'age', label: 'Age', icon: Calendar, status: 'Eligible' },
  { id: 'citizenship', label: 'Citizenship', icon: MapPin, status: 'Eligible' },
  { id: 'household', label: 'Household', icon: User, status: 'Eligible' },
  { id: 'identity', label: 'Identity', icon: FileWarning, status: 'Eligible' },
  { id: 'income', label: 'Income & Employment', icon: Activity, status: 'Eligible' },
];

function StatusBadge({ status }: { status: string }) {
  const isEligible = status === 'Eligible';
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
      isEligible 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
        : 'bg-red-50 text-red-700 border-red-200'
    }`}>
      {isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
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
    <div className="flex flex-col gap-8 pb-16 w-full animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-sm hover:shadow-md w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-bold rounded-lg shadow-sm transition-all px-4 py-2.5 text-xs flex items-center gap-1.5 uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Generate Letter
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all px-4 py-2.5 text-xs flex items-center gap-1.5 uppercase tracking-wider">
            <Download className="w-4 h-4" /> Export Summary
          </button>
        </div>
      </div>

      {/* Case Header & Hero Info Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col md:flex-row relative">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
        
        {/* Left Status Area */}
        <div className="p-6 md:p-8 md:w-[35%] border-b md:border-b-0 md:border-r border-zinc-200 bg-red-50/10 flex flex-col justify-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-600 mb-2 bg-red-50 px-2.5 py-1 rounded w-fit">Final Determination</span>
          <div className="flex items-center gap-3.5 mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600 shrink-0" />
            <h2 className="text-3xl font-black text-red-700 tracking-tight leading-none">Likely Ineligible</h2>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="status-select" className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 ml-0.5">Update Case Status</label>
            <div className="flex gap-2">
              <select 
                id="status-select"
                value={caseStatus}
                onChange={(e) => setCaseStatus(e.target.value)}
                className="border border-zinc-300 rounded-lg px-3 py-2 text-sm font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm flex-1"
              >
                <option>Open</option>
                <option>Closed</option>
              </select>
              <button 
                onClick={() => alert(`Status updated to ${caseStatus}`)}
                className="bg-zinc-800 hover:bg-black text-white text-xs font-bold rounded-lg shadow-sm transition-all px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right Metadata Details Grid */}
        <div className="p-6 md:p-8 md:w-[65%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Case Number</span>
            <span className="text-base font-bold text-zinc-800">{id || '1000000001'}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Client Name</span>
            <span className="text-base font-bold text-zinc-800 flex items-center gap-1.5"><User className="w-4.5 h-4.5 text-indigo-500"/> John M Doe</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Adults</span>
            <span className="text-base font-bold text-zinc-800">1</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Assigned User</span>
            <span className="text-base font-bold text-zinc-800">pcgTomelli</span>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Date Generated</span>
            <span className="text-base font-bold text-zinc-800">12/11/2022 11:15 AM</span>
          </div>
          <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2 lg:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Type of Assistance</span>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 text-xs font-semibold text-zinc-600 leading-relaxed max-h-24 overflow-y-auto shadow-inner">
              {mockAssistanceText}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Left-Nav / Detail Layout */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 w-full">
        
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-72 shrink-0 flex flex-col gap-4 bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm h-fit">
          <div className="px-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Verification Categories</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Select category to inspect details</p>
          </div>
          
          <div className="flex flex-col gap-1.5">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const isEligible = cat.status === 'Eligible';
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 border text-left group w-full ${
                    isActive 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)]' 
                      : 'bg-white border-zinc-100 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                    <span className="text-xs font-bold tracking-wide">
                      {cat.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isEligible ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'
                    }`} />
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 md:p-8 min-h-[500px] flex flex-col">
          
          {/* Detail Pane Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div className={`p-2.5 rounded-xl ${
                activeCategory?.status === 'Eligible' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}>
                {activeCategory && <activeCategory.icon className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Category details</span>
                <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">{activeCategory?.label}</h3>
              </div>
            </div>
            {activeCategory && <StatusBadge status={activeCategory.status} />}
          </div>

          {/* Dynamic Tab Content */}
          {activeTab === 'criminal' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Main Issue Alert Banner */}
              <div className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-red-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <h4 className="font-bold text-sm">Discrepancy Found: Active Incarceration Record</h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    Verification sources report the client is currently incarcerated. Instate residency and household composition details must be reviewed for program eligibility.
                  </p>
                </div>
              </div>

              {/* Side-by-Side reported vs verified comparison */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <FileDigit className="w-4 h-4 text-indigo-500" /> Reported vs Verified Source Data
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reported */}
                  <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-4.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-2.5">Reported on Application</span>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Incarcerated Status</span>
                        <span className="text-zinc-800 font-bold bg-white px-2 py-0.5 rounded border border-zinc-200">No</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Criminal History</span>
                        <span className="text-zinc-800 font-bold bg-white px-2 py-0.5 rounded border border-zinc-200">None Declared</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified */}
                  <div className="bg-red-50/10 border border-red-100/50 rounded-xl p-4.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block mb-2.5">Verified Database Records</span>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Incarcerated Status</span>
                        <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">Yes (Currently Incarcerated)</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Incarceration Date</span>
                        <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">12/30/2019</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Cards */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Database Source Records</h4>
                
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-700">Source: TransUnion Criminal database</span>
                    <span className="text-[10px] bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full font-bold">Likely Ineligible</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="text-xs font-bold text-zinc-800">Burglary of a Building (Felony)</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Database match indicates the client was arrested and incarcerated on <span className="font-bold text-zinc-800">12/30/2019</span>. Facility details and active prisoner record ID are confirmed. Action is required to adjust benefit counts.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-1.5 text-xs border-t border-zinc-100">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Record ID</span>
                        <span className="font-semibold text-zinc-700">TU-99221199A</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Disposition</span>
                        <span className="font-semibold text-zinc-700">Guilty - Incarcerated</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-700">Source: APPRISS Real-Time Incarceration</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">Eligible</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="text-xs font-bold text-zinc-800">Obstructing Officer Without Violence (Misdemeanor)</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Client was incarcerated during the previous 12 months, booking number <span className="font-semibold text-zinc-700">1900034</span>. Client was successfully released on <span className="font-bold text-zinc-800">04/29/2022</span>. No active holds or warrants found.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-1.5 text-xs border-t border-zinc-100">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Booking Number</span>
                        <span className="font-semibold text-zinc-700">1900034</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Release Date</span>
                        <span className="font-semibold text-zinc-700">04/29/2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Profile Verification Detail */}
              <div className="bg-indigo-50/20 border border-indigo-100 rounded-xl p-4.5">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold text-zinc-800">Verified Identity Reference</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Full Name</span>
                    <span className="font-bold text-zinc-800">John Marcus Doe</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Date of Birth</span>
                    <span className="font-semibold text-zinc-700">01/01/1991</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">SSN Reference</span>
                    <span className="font-mono text-zinc-700">XXX-XX-1235</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Address verified</span>
                    <span className="font-medium text-zinc-700">123 Main St, Toledo, OH</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Asset Alert Banner */}
              <div className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl text-red-800">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <h4 className="font-bold text-sm">Discrepancy Found: Asset Transfer Limit Exceeded</h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    Acuity Asset Verification database reports a balance decrease exceeding $5,000.00 within a 60-day period. This may indicate unverified asset transfers, resource divestment, or bank accounts exceeding program asset limits.
                  </p>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <FileDigit className="w-4 h-4 text-indigo-500" /> Asset Value Verification
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Reported */}
                  <div className="bg-zinc-50/50 border border-zinc-200/60 rounded-xl p-4.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-2.5">Reported on Application</span>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Reported Assets</span>
                        <span className="text-zinc-800 font-bold bg-white px-2 py-0.5 rounded border border-zinc-200">$2,000.00</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Bank Accounts Listed</span>
                        <span className="text-zinc-800 font-bold bg-white px-2 py-0.5 rounded border border-zinc-200">1 Account (Savings)</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified */}
                  <div className="bg-red-50/10 border border-red-100/50 rounded-xl p-4.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block mb-2.5">Verified Database Records</span>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Verified Total Assets</span>
                        <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">$45,172.00</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold">Asset Drop Amount</span>
                        <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">$7,828.00 (in 60 Days)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Records */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Database Source Records</h4>
                
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-700">Source: Acuity Asset Verification System</span>
                    <span className="text-[10px] bg-red-50 text-red-700 border border-red-100 px-2 py-0.5 rounded-full font-bold">Likely Ineligible</span>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="text-xs font-bold text-zinc-800">Unreported Financial Asset / Account Match</div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                      Account balance was <span className="text-zinc-950 font-bold bg-zinc-100 px-1 py-0.5 border border-zinc-200 rounded">$53,000.00</span> on 03/01/2022, and dropped to <span className="text-zinc-950 font-bold bg-zinc-100 px-1 py-0.5 border border-zinc-200 rounded">$45,172.00</span> on 05/01/2022. This account is registered at Huntington Bank and is not listed in the application.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2.5 text-xs border-t border-zinc-100">
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Institution</span>
                        <span className="font-semibold text-zinc-700">Huntington National Bank</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Account Number</span>
                        <span className="font-semibold text-zinc-700">XXXX-XXXX-9901</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] uppercase font-bold">Current Balance</span>
                        <span className="font-bold text-red-600">$45,172.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!['criminal', 'assets'].includes(activeTab) && (
            <div className="flex flex-col gap-8 flex-1 justify-center items-center py-10 animate-in fade-in duration-200">
              
              {/* Success Badge */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm animate-bounce">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-zinc-900">Verification Successful</h3>
                  <p className="text-xs text-zinc-500 font-semibold max-w-sm">No negative findings were reported for this category. All application records match database sources.</p>
                </div>
              </div>

              {/* Side-by-Side Match Verification */}
              <div className="w-full max-w-xl">
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden shadow-inner">
                  <div className="bg-zinc-100/50 px-4 py-2 border-b border-zinc-200">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Comparison Details</span>
                  </div>
                  <div className="divide-y divide-zinc-200 text-xs">
                    
                    {activeTab === 'age' && (
                      <>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Reported Date of Birth</span>
                          <span className="font-bold text-zinc-700">01/01/1991</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white">
                          <span className="text-zinc-500 font-medium">Verified Date of Birth</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 01/01/1991 (SSA Verified)</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Calculated Age</span>
                          <span className="font-semibold text-zinc-700">31 Years Old</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'citizenship' && (
                      <>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Reported Citizenship</span>
                          <span className="font-bold text-zinc-700">U.S. Citizen</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white">
                          <span className="text-zinc-500 font-medium">Verified Citizenship</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> U.S. Citizen (SSA/DHS Match)</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Verification Status</span>
                          <span className="font-semibold text-zinc-700">Lawful Presence Verified</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'household' && (
                      <>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Reported Household Size</span>
                          <span className="font-bold text-zinc-700">1 Adult, 0 Children</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white">
                          <span className="text-zinc-500 font-medium">Verified Household Size</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 1 Adult, 0 Children (DMV Match)</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Relationship Details</span>
                          <span className="font-semibold text-zinc-700">Single Person Household</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'identity' && (
                      <>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Reported Name & SSN</span>
                          <span className="font-bold text-zinc-700">John M Doe (XXX-XX-1235)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white">
                          <span className="text-zinc-500 font-medium">Verified SSN Match</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Verified (TransUnion match)</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Biometric / Photo Match</span>
                          <span className="font-semibold text-zinc-700">Verified via Ohio BMV</span>
                        </div>
                      </>
                    )}

                    {activeTab === 'income' && (
                      <>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Reported Monthly Income</span>
                          <span className="font-bold text-zinc-700">$1,200.00</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white">
                          <span className="text-zinc-500 font-medium">Verified Monthly Income</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> $1,200.00 (Equifax WorkNumber Match)</span>
                        </div>
                        <div className="flex justify-between items-center p-3">
                          <span className="text-zinc-500 font-medium">Income Program Limit</span>
                          <span className="font-semibold text-zinc-700">$1,428.00 (Eligible)</span>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
              
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
