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

export default function NewRequest() {
  const navigate = useNavigate();
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNumber) {
      alert('Please fill out Case Number');
      return;
    }
    alert(`Case ID ${caseNumber} has been successfully submitted and queued for verification!`);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-20 w-full animate-in fade-in duration-300">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-205 pb-5">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Verification Request Center</span>
          <h2 className="text-2xl font-black text-indigo-700 tracking-tight uppercase">New Instant Eligibility Request</h2>
        </div>
        <Link to="/" className="text-xs font-extrabold text-zinc-500 hover:text-zinc-800 transition-colors uppercase tracking-widest bg-white border border-zinc-300 px-4.5 py-2.5 rounded-xl shadow-sm">
          Cancel Request
        </Link>
      </div>

      {/* SECTION 1: Case Parameters */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col gap-6">
        <div className="border-b border-zinc-200 pb-3">
          <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">1. Case Parameters</h3>
          <p className="text-xs text-zinc-500 mt-1">Define household structures, dates, and assistance programs</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="case-num" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Case Number *</label>
            <input 
              type="text" 
              id="case-num"
              required
              placeholder="e.g. 1000000001"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="app-date" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Application Date *</label>
            <input 
              type="text" 
              id="app-date"
              required
              placeholder="mm/dd/yyyy"
              value={appDate}
              onChange={(e) => setAppDate(e.target.value)}
              className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="hh-adults" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Household Adults *</label>
            <input 
              type="number" 
              id="hh-adults"
              required
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="program-type" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Type of Programs *</label>
            <select 
              id="program-type"
              required
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="border border-zinc-355 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
            >
              {programOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Program Household Sizes Grid (Full Width) */}
        <div className="bg-zinc-100 border border-zinc-300 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block border-b border-zinc-250 pb-2">Program Household Size Configuration</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            
            <div className="flex flex-col gap-1">
              <label htmlFor="size-and" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">AND</label>
              <input type="text" id="size-and" value={programSizes.and} onChange={(e) => handleProgramSizeChange('and', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-950 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-magi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MAGI</label>
              <input type="text" id="size-magi" value={programSizes.magi} onChange={(e) => handleProgramSizeChange('magi', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-msp" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MSP</label>
              <input type="text" id="size-msp" value={programSizes.msp} onChange={(e) => handleProgramSizeChange('msp', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-other" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Other</label>
              <input type="text" id="size-other" value={programSizes.other} onChange={(e) => handleProgramSizeChange('other', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-ltc" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">LTC</label>
              <input type="text" id="size-ltc" value={programSizes.ltc} onChange={(e) => handleProgramSizeChange('ltc', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-mbiwd" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MBIWD</label>
              <input type="text" id="size-mbiwd" value={programSizes.mbiwd} onChange={(e) => handleProgramSizeChange('mbiwd', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-ssi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">SSI</label>
              <input type="text" id="size-ssi" value={programSizes.ssi} onChange={(e) => handleProgramSizeChange('ssi', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-noactive" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">No Active</label>
              <input type="text" id="size-noactive" value={programSizes.noActive} onChange={(e) => handleProgramSizeChange('noActive', e.target.value)} className="border border-zinc-300 rounded-lg px-2.5 py-1 text-xs font-bold text-zinc-955 bg-white" />
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: Applicant Information */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col gap-8">
        
        <div className="border-b border-zinc-200 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">2. Applicant details</h3>
            <p className="text-xs text-zinc-500 mt-1">Specify personal identification data, residential address, and document indexes</p>
          </div>
          <span className="text-[9px] font-black uppercase bg-indigo-50 border border-indigo-250 text-indigo-700 px-3 py-1 rounded">Primary Applicant</span>
        </div>

        {/* Demographics & SSN Grid */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-650 block border-b border-zinc-100 pb-1 font-extrabold">1. Demographics & SSN</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-id" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Individual ID *</label>
              <input type="text" id="ind-id" required placeholder="e.g. 1000000001" value={individual.id} onChange={(e) => handleIndividualChange('id', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-ssn" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">SSN</label>
              <input type="text" id="ind-ssn" placeholder="XXX-XX-XXXX" value={individual.ssn} onChange={(e) => handleIndividualChange('ssn', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-dob" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">DOB *</label>
              <input type="text" id="ind-dob" required placeholder="mm/dd/yyyy" value={individual.dob} onChange={(e) => handleIndividualChange('dob', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-gender" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Gender *</label>
              <select id="ind-gender" required value={individual.gender} onChange={(e) => handleIndividualChange('gender', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Name Grid */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-650 block border-b border-zinc-100 pb-1 font-extrabold">2. Name Details</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-first" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">First Name *</label>
              <input type="text" id="ind-first" required value={individual.firstName} onChange={(e) => handleIndividualChange('firstName', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-last" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Last Name *</label>
              <input type="text" id="ind-last" required value={individual.lastName} onChange={(e) => handleIndividualChange('lastName', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-middle" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Middle Name</label>
              <input type="text" id="ind-middle" value={individual.middleName} onChange={(e) => handleIndividualChange('middleName', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-apply" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Apply Ind *</label>
              <select id="ind-apply" required value={individual.applyInd} onChange={(e) => handleIndividualChange('applyInd', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                <option value="Select Option">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Grid */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1 font-extrabold">3. Residential Address</span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="flex flex-col gap-1.5 md:col-span-6">
              <label htmlFor="ind-street" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Street Address *</label>
              <input type="text" id="ind-street" required value={individual.street} onChange={(e) => handleIndividualChange('street', e.target.value)} className="border border-zinc-355 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-3">
              <label htmlFor="ind-city" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">City *</label>
              <input type="text" id="ind-city" required value={individual.city} onChange={(e) => handleIndividualChange('city', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label htmlFor="ind-state" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">State *</label>
              <select id="ind-state" required value={individual.state} onChange={(e) => handleIndividualChange('state', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                <option>Ohio</option>
                <option>Indiana</option>
                <option>Kentucky</option>
                <option>Michigan</option>
                <option>Pennsylvania</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-1">
              <label htmlFor="ind-zip" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Zip *</label>
              <input type="text" id="ind-zip" required value={individual.zip} onChange={(e) => handleIndividualChange('zip', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>
          </div>
        </div>

        {/* Verification Documents Grid */}
        <div className="flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1 font-extrabold">4. Verification Documents</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-doctype" className="text-[9px] font-black uppercase tracking-wider text-zinc-455 ml-1">Document Type</label>
              <select id="ind-doctype" value={individual.docType} onChange={(e) => handleIndividualChange('docType', e.target.value)} className="border border-zinc-355 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                <option value="Select Document">Select Document</option>
                <option value="Driver License">Driver License</option>
                <option value="US Passport">US Passport</option>
                <option value="Alien Registration Card">Alien Registration Card</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-alien" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Alien Number</label>
              <input type="text" id="ind-alien" value={individual.alienNum} onChange={(e) => handleIndividualChange('alienNum', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-docnum" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Number</label>
              <input type="text" id="ind-docnum" value={individual.docNum} onChange={(e) => handleIndividualChange('docNum', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ind-docexp" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Doc Exp Date</label>
              <input type="text" id="ind-docexp" placeholder="mm/dd/yyyy" value={individual.docExp} onChange={(e) => handleIndividualChange('docExp', e.target.value)} className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
            </div>
          </div>
        </div>

        {/* Sub-action buttons */}
        <div className="flex gap-3 border-t border-zinc-200 pt-5">
          <button type="button" onClick={() => alert('Add Bank functionality clicked')} className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4.5 py-2.5 uppercase tracking-wider">
            Add Bank
          </button>
          <button type="button" onClick={() => alert('Add Another Individual functionality clicked')} className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4.5 py-2.5 uppercase tracking-wider">
            Add Another Individual
          </button>
        </div>

      </div>

      {/* SECTION 3: Database Selection (Accordion-Free Grid) */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col gap-6">
        
        <div className="border-b border-zinc-200 pb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">3. Database Sources to Query</h3>
            <p className="text-xs text-zinc-500 mt-1">Select targets to run query scans. All items are permanently visible.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1.5">
            <button type="button" onClick={() => setAllCheckboxes(true)} className="border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-705 font-bold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider">Select All</button>
            <button type="button" onClick={() => setAllCheckboxes(false)} className="border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-705 font-bold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider">Unselect All</button>
            <span className="w-px h-5 bg-zinc-200 self-center"></span>
            <button type="button" onClick={() => setSources(initialCheckboxState)} className="border border-indigo-200 hover:border-indigo-350 bg-indigo-50/50 text-indigo-750 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider">Reset Defaults</button>
          </div>
        </div>

        {/* Flat Grid Layout of Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoryLabels).map(([catKey, label]) => {
            const catSources = sources[catKey] || {};
            
            return (
              <div key={catKey} className="bg-zinc-50 border border-zinc-300 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                
                {/* Category Sub-header */}
                <div className="bg-zinc-100 px-4.5 py-3 border-b border-zinc-300 flex justify-between items-center">
                  <span className="text-xs font-black text-zinc-800 uppercase tracking-wider">{label}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => setCategoryAll(catKey, true)}
                      className="text-[9px] font-black text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50/50 px-2 py-0.5 rounded"
                    >
                      All
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCategoryAll(catKey, false)}
                      className="text-[9px] font-black text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-100 px-2 py-0.5 rounded"
                    >
                      None
                    </button>
                  </div>
                </div>

                {/* Checklist Category Body */}
                <div className="p-4 flex flex-col gap-2 bg-white flex-1 justify-center">
                  {Object.entries(catSources).map(([sourceName, checked]) => (
                    <label 
                      key={sourceName} 
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                        checked 
                          ? 'bg-indigo-50/30 border-indigo-250 text-indigo-905 shadow-sm font-bold' 
                          : 'bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 font-semibold'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={checked}
                        onChange={() => toggleCheckbox(catKey, sourceName)}
                        className="w-4 h-4 text-indigo-650 border-zinc-350 rounded focus:ring-indigo-500 bg-white cursor-pointer"
                      />
                      <span className="text-xs leading-none">{sourceName}</span>
                    </label>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Query Status inside select card */}
        <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span>{countActiveDatabases()} Databases Targets Selected</span>
          <span>Automatic validation active</span>
        </div>
      </div>

      {/* Bottom Form Action Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-zinc-200 pt-6">
        <Link 
          to="/" 
          className="text-xs font-extrabold text-zinc-500 hover:text-zinc-800 transition-colors uppercase tracking-widest px-5 py-3"
        >
          Cancel Request
        </Link>
        <button 
          type="submit"
          disabled={countActiveDatabases() === 0}
          className={`font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-8 py-4 text-xs uppercase tracking-widest hover:-translate-y-0.5 ${
            countActiveDatabases() === 0 
              ? 'bg-zinc-300 text-zinc-505 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0' 
              : 'bg-indigo-600 hover:bg-indigo-750 text-white'
          }`}
        >
          Submit Verification Request
        </button>
      </div>

    </form>
  );
}
