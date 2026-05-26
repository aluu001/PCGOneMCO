import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const programOptions = [
  'None selected',
  'AND - Aid to the Needy and Disabled',
  'MAGI - Modified Adjusted Gross Income',
  'MSP - Medicare Premium Assistance',
  'LTC - Long-Term Care',
  'MBIWD - Medicaid Buy-In for Workers with Disabilities',
  'SSI - Supplemental Security Income',
  'Other Program Combination',
];

const initialCheckboxState = {
  age: { 
    'Experian Precise ID': true, 
    'Input File Age Validation': true, 
    'TransUnion Person Search': false 
  },
  citizenship: { 
    'Experian Precise ID': true 
  },
  criminal: { 
    'APPRISS': true, 
    'TransUnion Criminal': true 
  },
  death: { 
    'Experian Precise ID': true, 
    'Safe Death File': false, 
    'TransUnion Locate Report': false 
  },
  household: { 
    'APPRISS': true, 
    'Experian Precise ID': false, 
    'ODM Quarterly Wages': false, 
    'ODJFS UCB': false, 
    'TransUnion Household Composition': true, 
    'TransUnion Premium Employment': true, 
    'TransUnion Vehicle View': false 
  },
  identity: { 
    'Experian Precise ID': true 
  },
  residency: { 
    'APPRISS': true, 
    'Equifax Employment Verification': false, 
    'National Directory of New Hires': false, 
    'ODJFS Child Support': false, 
    'TransUnion Property View': true, 
    'TransUnion Vehicle View': false 
  },
  income: { 
    'Equifax Employment Verification': true, 
    'Experian Income Insight': false, 
    'Experian Income Insight Lite': false, 
    'National Directory of New Hires': false, 
    'ODJFS Child Support': false, 
    'ODM Lottery': false, 
    'ODM Quarterly Wages': false, 
    'ODJFS UCB': false, 
    'TransUnion Premium Employment': true 
  },
  property: { 
    'TransUnion Property View': true, 
    'TransUnion Vehicle View': false 
  },
  resources: { 
    'Acuity Asset Verification': true, 
    'ODM Lottery': false, 
    'TransUnion Property View': false, 
    'TransUnion Vehicle View': false 
  }
};

const categoryLabels: Record<string, string> = {
  age: 'Age',
  citizenship: 'Citizenship & Non-Citizen Status',
  criminal: 'Criminal History & Incarceration',
  death: 'Death',
  household: 'Household Composition',
  identity: 'Identity',
  residency: 'In-State Residency',
  income: 'Income & Employment',
  property: 'Property',
  resources: 'Resources',
};

const categoryDescriptions: Record<string, string> = {
  age: 'Verifies candidate date of birth, age thresholds, and vital statistics matches.',
  citizenship: 'Verifies lawful presence and citizenship status against federal SSA and DHS databases.',
  criminal: 'Queries incarceration records, booking dates, and release status from state and national databases.',
  death: 'Checks vital statistics death records to ensure the applicant is not flagged on active death master files.',
  household: 'Evaluates co-occupants, DMV address correlations, and relationship declarations.',
  identity: 'Matches SSN, first name, and last name indexes to establish authentic identity credentials.',
  residency: 'Checks state tax filings, DMV records, property ownership, and utility indicators to confirm in-state residency.',
  income: 'Queries Equifax WorkNumber, child support disbursements, lottery payouts, and state quarterly wage records.',
  property: 'Checks property registry databases, land titles, and vehicle ownership indexes.',
  resources: 'Verifies liquid assets, banking transactions, and financial holdings above program thresholds.',
};

export default function NewRequest() {
  const navigate = useNavigate();
  
  // Navigation & Collapse State
  const [activeTab, setActiveTab] = useState('case'); // 'case' | 'applicant' | 'databases'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Database sub-navigation Category tab
  const [activeDbCategory, setActiveDbCategory] = useState('age');

  // Case Details State
  const [caseNumber, setCaseNumber] = useState('');
  const [appDate, setAppDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [selectedProgram, setSelectedProgram] = useState('None selected');
  const [programSizes, setProgramSizes] = useState({
    and: '',
    magi: '',
    msp: '',
    other: '',
    ltc: '',
    mbiwd: '',
    ssi: '',
    noActive: '',
  });

  // Applicant Details State
  const [individual, setIndividual] = useState({
    id: '',
    ssn: '',
    dob: '',
    gender: 'Select Gender',
    firstName: '',
    middleName: '',
    lastName: '',
    applyInd: 'Select Option',
    street: '',
    city: '',
    state: 'Ohio',
    zip: '',
    docType: 'Select Document',
    alienNum: '',
    docNum: '',
    docExp: '',
  });

  // Checkboxes State
  const [sources, setSources] = useState<Record<string, Record<string, boolean>>>(initialCheckboxState);

  const handleProgramSizeChange = (key: string, val: string) => {
    setProgramSizes(prev => ({ ...prev, [key]: val }));
  };

  const handleIndividualChange = (key: string, val: string) => {
    setIndividual(prev => ({ ...prev, [key]: val }));
  };

  const toggleCheckbox = (category: string, source: string) => {
    setSources(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [source]: !prev[category][source]
      }
    }));
  };

  const setCategoryAll = (category: string, value: boolean) => {
    setSources(prev => {
      const updatedCategory = { ...prev[category] };
      Object.keys(updatedCategory).forEach(key => {
        updatedCategory[key] = value;
      });
      return {
        ...prev,
        [category]: updatedCategory
      };
    });
  };

  const setAllCheckboxes = (value: boolean) => {
    setSources(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(catKey => {
        const cat = { ...updated[catKey] };
        Object.keys(cat).forEach(srcKey => {
          cat[srcKey] = value;
        });
        updated[catKey] = cat;
      });
      return updated;
    });
  };

  const countActiveDatabases = () => {
    let count = 0;
    Object.values(sources).forEach(cat => {
      Object.values(cat).forEach(val => {
        if (val) count++;
      });
    });
    return count;
  };

  // Section Progress Checkers
  const isCaseReady = caseNumber.trim().length > 0;
  const isApplicantReady = individual.firstName.trim().length > 0 && individual.lastName.trim().length > 0;
  const isDatabasesReady = countActiveDatabases() > 0;

  const handleSubmit = () => {
    if (!caseNumber) {
      alert('Please fill out Case Number');
      return;
    }
    alert(`Case ID ${caseNumber} has been successfully submitted and queued for verification!`);
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-8 pb-20 w-full animate-in fade-in duration-300">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-605">Submission Portal</span>
          <h2 className="text-2xl font-black text-indigo-700 tracking-tight uppercase">New Instant Eligibility Request</h2>
        </div>
        <Link to="/" className="text-xs font-extrabold text-zinc-555 hover:text-indigo-650 transition-all bg-white border border-zinc-300 px-4.5 py-2.5 rounded-xl shadow-sm">
          Cancel Request
        </Link>
      </div>

      {/* Main Container Layout */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">
        
        {/* LEFT COLUMN: Collapsible Sidebar Navigation */}
        {!sidebarCollapsed && (
          <div className="w-full md:w-80 shrink-0 flex flex-col justify-between bg-white p-6 rounded-3xl border border-zinc-300 shadow-sm h-fit gap-6 animate-in slide-in-from-left-4 duration-200">
            <div className="flex flex-col gap-5">
              <div className="px-2 border-b border-zinc-200 pb-3">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-450">Request Sections</h3>
                <p className="text-[11px] text-zinc-505 mt-1">Select page to update fields</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-col gap-2.5">
                
                {/* Tab 1: Case Details */}
                <button
                  type="button"
                  onClick={() => setActiveTab('case')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-150 border text-left w-full ${
                    activeTab === 'case' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-700 text-white shadow-md font-bold' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold'
                  }`}
                >
                  <span className="text-xs tracking-wide">1. Case Parameters</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                    activeTab === 'case'
                      ? 'bg-white/20 text-white'
                      : (isCaseReady ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200')
                  }`}>
                    {isCaseReady ? 'Ready' : 'Pending'}
                  </span>
                </button>

                {/* Tab 2: Applicant details */}
                <button
                  type="button"
                  onClick={() => setActiveTab('applicant')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-150 border text-left w-full ${
                    activeTab === 'applicant' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-700 text-white shadow-md font-bold' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold'
                  }`}
                >
                  <span className="text-xs tracking-wide">2. Applicant details</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                    activeTab === 'applicant'
                      ? 'bg-white/20 text-white'
                      : (isApplicantReady ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200')
                  }`}>
                    {isApplicantReady ? 'Ready' : 'Pending'}
                  </span>
                </button>

                {/* Tab 3: Databases */}
                <button
                  type="button"
                  onClick={() => setActiveTab('databases')}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-150 border text-left w-full ${
                    activeTab === 'databases' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-700 text-white shadow-md font-bold' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold'
                  }`}
                >
                  <span className="text-xs tracking-wide">3. Database Sources</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-widest ${
                    activeTab === 'databases'
                      ? 'bg-white/20 text-white'
                      : (isDatabasesReady ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200')
                  }`}>
                    {isDatabasesReady ? 'Ready' : 'Pending'}
                  </span>
                </button>

              </div>
            </div>

            {/* Sidebar Collapse Action */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(true)}
              className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-zinc-500 font-extrabold px-4 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest text-center mt-4 transition-all"
            >
              &larr; Hide Navigation
            </button>
          </div>
        )}

        {/* RIGHT COLUMN: Active Form details canvas */}
        <div className="flex-1 bg-white rounded-3xl border border-zinc-300 shadow-sm p-6 md:p-8 flex flex-col justify-between min-h-[500px]">
          
          <div className="flex flex-col gap-6">
            {/* Collapse Toggle Trigger */}
            {sidebarCollapsed && (
              <button
                type="button"
                onClick={() => setSidebarCollapsed(false)}
                className="bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 text-indigo-700 font-extrabold px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest w-fit mb-2 transition-all"
              >
                &rarr; Show Navigation Menu
              </button>
            )}

            {/* Active Tab Heading */}
            <div className="border-b border-zinc-200 pb-5">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Active form section</span>
              <h3 className="text-xl font-black text-zinc-905 tracking-tight uppercase">
                {activeTab === 'case' && '1. Case Parameters'}
                {activeTab === 'applicant' && '2. Applicant details'}
                {activeTab === 'databases' && '3. Database Sources to Query'}
              </h3>
            </div>

            {/* TAB CONTENT 1: Case Details */}
            {activeTab === 'case' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="case-num" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Case Number *</label>
                    <input 
                      type="text" 
                      id="case-num"
                      placeholder="e.g. 1000000001"
                      value={caseNumber}
                      onChange={(e) => setCaseNumber(e.target.value)}
                      className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="app-date" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Application Date *</label>
                    <input 
                      type="text" 
                      id="app-date"
                      placeholder="mm/dd/yyyy"
                      value={appDate}
                      onChange={(e) => setAppDate(e.target.value)}
                      className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="hh-adults" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Household Adults *</label>
                    <input 
                      type="number" 
                      id="hh-adults"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="program-type" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Type of Programs *</label>
                  <select 
                    id="program-type"
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="border border-zinc-355 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white w-full md:w-1/2"
                  >
                    {programOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Program Household Sizes Grid */}
                <div className="bg-zinc-100 border border-zinc-300 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                  <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block border-b border-zinc-250 pb-2">Program Household Size Configuration</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-and" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">AND</label>
                      <input type="text" id="size-and" value={programSizes.and} onChange={(e) => handleProgramSizeChange('and', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-magi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MAGI</label>
                      <input type="text" id="size-magi" value={programSizes.magi} onChange={(e) => handleProgramSizeChange('magi', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-msp" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MSP</label>
                      <input type="text" id="size-msp" value={programSizes.msp} onChange={(e) => handleProgramSizeChange('msp', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-other" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Other</label>
                      <input type="text" id="size-other" value={programSizes.other} onChange={(e) => handleProgramSizeChange('other', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-ltc" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450">LTC</label>
                      <input type="text" id="size-ltc" value={programSizes.ltc} onChange={(e) => handleProgramSizeChange('ltc', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-mbiwd" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450">MBIWD</label>
                      <input type="text" id="size-mbiwd" value={programSizes.mbiwd} onChange={(e) => handleProgramSizeChange('mbiwd', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-ssi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450">SSI</label>
                      <input type="text" id="size-ssi" value={programSizes.ssi} onChange={(e) => handleProgramSizeChange('ssi', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="size-noactive" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450">No Active</label>
                      <input type="text" id="size-noactive" value={programSizes.noActive} onChange={(e) => handleProgramSizeChange('noActive', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: Applicant details */}
            {activeTab === 'applicant' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Demographics & SSN */}
                <div className="flex flex-col gap-4">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-650 block border-b border-zinc-100 pb-0.5">Demographics & SSN</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-id" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Individual ID *</label>
                      <input type="text" id="ind-id" placeholder="e.g. 1000000001" value={individual.id} onChange={(e) => handleIndividualChange('id', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-ssn" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">SSN</label>
                      <input type="text" id="ind-ssn" placeholder="XXX-XX-XXXX" value={individual.ssn} onChange={(e) => handleIndividualChange('ssn', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-dob" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">DOB *</label>
                      <input type="text" id="ind-dob" placeholder="mm/dd/yyyy" value={individual.dob} onChange={(e) => handleIndividualChange('dob', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-gender" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Gender *</label>
                      <select id="ind-gender" value={individual.gender} onChange={(e) => handleIndividualChange('gender', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                        <option value="Select Gender">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-4">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-650 block border-b border-zinc-100 pb-0.5">Name Details</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-first" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">First Name *</label>
                      <input type="text" id="ind-first" value={individual.firstName} onChange={(e) => handleIndividualChange('firstName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-last" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Last Name *</label>
                      <input type="text" id="ind-last" value={individual.lastName} onChange={(e) => handleIndividualChange('lastName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-middle" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Middle Name</label>
                      <input type="text" id="ind-middle" value={individual.middleName} onChange={(e) => handleIndividualChange('middleName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-apply" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Apply Ind *</label>
                      <select id="ind-apply" value={individual.applyInd} onChange={(e) => handleIndividualChange('applyInd', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                        <option value="Select Option">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-4">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-0.5">Residency & Address</span>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-street" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Street Address *</label>
                      <input type="text" id="ind-street" value={individual.street} onChange={(e) => handleIndividualChange('street', e.target.value)} className="border border-zinc-355 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1 col-span-1">
                        <label htmlFor="ind-city" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">City *</label>
                        <input type="text" id="ind-city" value={individual.city} onChange={(e) => handleIndividualChange('city', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1 col-span-1">
                        <label htmlFor="ind-state" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">State *</label>
                        <select id="ind-state" value={individual.state} onChange={(e) => handleIndividualChange('state', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                          <option>Ohio</option>
                          <option>Indiana</option>
                          <option>Kentucky</option>
                          <option>Michigan</option>
                          <option>Pennsylvania</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1 col-span-1">
                        <label htmlFor="ind-zip" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Zip *</label>
                        <input type="text" id="ind-zip" value={individual.zip} onChange={(e) => handleIndividualChange('zip', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="flex flex-col gap-4">
                  <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-0.5">Verification Documents</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-doctype" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Doc Type</label>
                      <select id="ind-doctype" value={individual.docType} onChange={(e) => handleIndividualChange('docType', e.target.value)} className="border border-zinc-355 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                        <option value="Select Document">Select Document</option>
                        <option value="Driver License">Driver License</option>
                        <option value="US Passport">US Passport</option>
                        <option value="Alien Registration Card">Alien Registration Card</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-alien" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Alien Number</label>
                      <input type="text" id="ind-alien" value={individual.alienNum} onChange={(e) => handleIndividualChange('alienNum', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-docnum" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Number</label>
                      <input type="text" id="ind-docnum" value={individual.docNum} onChange={(e) => handleIndividualChange('docNum', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="ind-docexp" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Doc Exp Date</label>
                      <input type="text" id="ind-docexp" placeholder="mm/dd/yyyy" value={individual.docExp} onChange={(e) => handleIndividualChange('docExp', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
                    </div>
                  </div>
                </div>

                {/* Sub-action buttons */}
                <div className="flex gap-3 border-t border-zinc-200 pt-5">
                  <button type="button" onClick={() => alert('Add Bank functionality clicked')} className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4.5 py-2.5 uppercase tracking-wider">
                    Add Bank
                  </button>
                  <button type="button" onClick={() => alert('Add Another Individual functionality clicked')} className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4.5 py-2.5 uppercase tracking-wider">
                    Add Individual
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: Database Selection (Nested Categories Menu) */}
            {activeTab === 'databases' && (
              <div className="flex flex-col gap-8 animate-in fade-in duration-200">
                
                {/* Global database control header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-200">
                  <div className="flex flex-col">
                    <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">Database Sources to Query</h4>
                    <span className="text-xs text-zinc-500 font-semibold mt-0.5">{countActiveDatabases()} of 38 databases selected</span>
                  </div>
                  <div className="flex gap-3 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    <button type="button" onClick={() => setAllCheckboxes(true)} className="hover:text-indigo-650 transition-colors">Select All</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setAllCheckboxes(false)} className="hover:text-indigo-650 transition-colors">Deselect All</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setSources(initialCheckboxState)} className="hover:text-indigo-650 transition-colors">Reset Defaults</button>
                  </div>
                </div>

                {/* Nested Category-by-Category Layout */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full min-h-[400px]">
                  
                  {/* Nested Sub-Sidebar: Categories Menu */}
                  <div className="w-full lg:w-60 shrink-0 flex flex-col gap-1 pr-4 lg:border-r border-zinc-200">
                    {Object.entries(categoryLabels).map(([key, label]) => {
                      const isActive = activeDbCategory === key;
                      const selectedCount = Object.values(sources[key] || {}).filter(Boolean).length;
                      
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setActiveDbCategory(key)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all text-xs font-semibold ${
                            isActive 
                              ? 'bg-zinc-100 text-zinc-950 font-bold' 
                              : 'bg-transparent text-zinc-505 hover:bg-zinc-50 hover:text-zinc-800'
                          }`}
                        >
                          <span>{label}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest ${
                            isActive 
                              ? 'bg-indigo-600 text-white' 
                              : selectedCount > 0 
                                ? 'bg-indigo-50 text-indigo-750' 
                                : 'bg-zinc-100 text-zinc-450'
                          }`}>
                            {selectedCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Nested Sub-Pane: Checklist of databases for active category */}
                  <div className="flex-1 flex flex-col gap-6 pl-2 animate-in fade-in duration-150">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{categoryLabels[activeDbCategory]} Databases</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">{categoryDescriptions[activeDbCategory]}</p>
                    </div>

                    {/* Category-specific controls */}
                    <div className="flex gap-3 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                      <button 
                        type="button" 
                        onClick={() => setCategoryAll(activeDbCategory, true)}
                        className="hover:text-indigo-650 transition-colors"
                      >
                        Select All in {categoryLabels[activeDbCategory]}
                      </button>
                      <span>&bull;</span>
                      <button 
                        type="button" 
                        onClick={() => setCategoryAll(activeDbCategory, false)}
                        className="hover:text-indigo-650 transition-colors"
                      >
                        Clear Category
                      </button>
                    </div>

                    {/* Checkboxes Checklist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
                      {Object.entries(sources[activeDbCategory] || {}).map(([sourceName, checked]) => (
                        <label 
                          key={sourceName} 
                          className="flex items-start gap-3 cursor-pointer select-none group"
                        >
                          <input 
                            type="checkbox" 
                            checked={checked}
                            onChange={() => toggleCheckbox(activeDbCategory, sourceName)}
                            className="w-4 h-4 mt-0.5 text-indigo-600 border-zinc-300 rounded focus:ring-indigo-550/20 bg-white cursor-pointer transition-all"
                          />
                          <span className={`text-xs transition-colors ${
                            checked 
                              ? 'text-zinc-950 font-extrabold' 
                              : 'text-zinc-650 font-medium group-hover:text-zinc-800'
                          }`}>
                            {sourceName}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Bottom Pane Navigation Helpers / Action Buttons */}
          <div className="flex items-center justify-between border-t border-zinc-200 pt-6 mt-8">
            <div>
              {activeTab === 'case' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('applicant')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md px-6 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all"
                >
                  Next: Applicant details &rarr;
                </button>
              )}
              {activeTab === 'applicant' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('case')}
                    className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-700 font-extrabold rounded-xl shadow-sm px-6 py-3 text-xs uppercase tracking-widest transition-all"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('databases')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md px-6 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5 transition-all"
                  >
                    Next: Database Sources &rarr;
                  </button>
                </div>
              )}
              {activeTab === 'databases' && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('applicant')}
                    className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-700 font-extrabold rounded-xl shadow-sm px-6 py-3 text-xs uppercase tracking-widest transition-all"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={countActiveDatabases() === 0}
                    className={`font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-8 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5 ${
                      countActiveDatabases() === 0 
                        ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0' 
                        : 'bg-indigo-600 hover:bg-indigo-750 text-white'
                    }`}
                  >
                    Submit Verification Request
                  </button>
                </div>
              )}
            </div>
            
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              {activeTab === 'case' && 'Section 1 of 3'}
              {activeTab === 'applicant' && 'Section 2 of 3'}
              {activeTab === 'databases' && 'Section 3 of 3'}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
