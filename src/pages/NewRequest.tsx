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
  
  // Form State
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

  // Collapse Sections State
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

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

  const collapseAll = (value: boolean) => {
    const updated: Record<string, boolean> = {};
    Object.keys(categoryLabels).forEach(key => {
      updated[key] = value;
    });
    setCollapsed(updated);
  };

  const toggleCollapse = (category: string) => {
    setCollapsed(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseNumber) {
      alert('Please fill out Case Number');
      return;
    }
    alert(`Case ${caseNumber} submitted successfully!`);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-20 w-full animate-in fade-in duration-300">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-650">New Submission</span>
          <h2 className="text-2xl font-black text-indigo-700 tracking-tight uppercase">New Instant Eligibility Verification Request</h2>
        </div>
        <Link to="/" className="inline-flex items-center text-xs font-extrabold text-zinc-550 hover:text-indigo-650 transition-all bg-white px-4.5 py-2.5 rounded-xl border border-zinc-300 shadow-sm hover:shadow-md w-fit uppercase tracking-widest">
          Cancel &rarr;
        </Link>
      </div>

      {/* Card 1: Case Details */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col gap-6">
        <div className="border-b border-zinc-200 pb-3">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight">Case Parameters</h3>
          <p className="text-xs text-zinc-500 mt-1">Specify core household and program details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="case-num" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Case Number *</label>
            <input 
              type="text" 
              id="case-num"
              required
              placeholder="e.g. 1000000001"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              className="border border-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all"
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
              className="border border-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all"
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
              className="border border-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="program-type" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Type of Programs *</label>
          <select 
            id="program-type"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="border border-zinc-300 rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all w-full md:w-1/2"
          >
            {programOptions.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Program Household Sizes Grid */}
        <div className="bg-zinc-50 border border-zinc-250 p-6 rounded-2xl flex flex-col gap-4">
          <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block border-b border-zinc-200 pb-2">Program Household Size Configuration</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            
            <div className="flex flex-col gap-1">
              <label htmlFor="size-and" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">AND</label>
              <input type="text" id="size-and" value={programSizes.and} onChange={(e) => handleProgramSizeChange('and', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-magi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MAGI</label>
              <input type="text" id="size-magi" value={programSizes.magi} onChange={(e) => handleProgramSizeChange('magi', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-msp" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MSP</label>
              <input type="text" id="size-msp" value={programSizes.msp} onChange={(e) => handleProgramSizeChange('msp', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-other" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Other</label>
              <input type="text" id="size-other" value={programSizes.other} onChange={(e) => handleProgramSizeChange('other', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-ltc" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">LTC</label>
              <input type="text" id="size-ltc" value={programSizes.ltc} onChange={(e) => handleProgramSizeChange('ltc', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-mbiwd" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MBIWD</label>
              <input type="text" id="size-mbiwd" value={programSizes.mbiwd} onChange={(e) => handleProgramSizeChange('mbiwd', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-ssi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">SSI</label>
              <input type="text" id="size-ssi" value={programSizes.ssi} onChange={(e) => handleProgramSizeChange('ssi', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="size-noactive" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">No Active Prog</label>
              <input type="text" id="size-noactive" value={programSizes.noActive} onChange={(e) => handleProgramSizeChange('noActive', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 bg-white" />
            </div>

          </div>
        </div>
      </div>

      {/* Card 2: Individual 1 Form */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden">
        
        {/* Card Header Section Tab */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white border-b border-indigo-700">
          <span className="text-xs font-black uppercase tracking-widest">Individual 1 Details</span>
          <span className="text-[10px] font-bold uppercase bg-indigo-550 border border-indigo-500 px-2.5 py-1 rounded">Primary Applicant</span>
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="flex flex-col gap-1">
              <label htmlFor="ind-id" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Individual ID *</label>
              <input type="text" id="ind-id" required value={individual.id} onChange={(e) => handleIndividualChange('id', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-ssn" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">SSN</label>
              <input type="text" id="ind-ssn" placeholder="XXX-XX-XXXX" value={individual.ssn} onChange={(e) => handleIndividualChange('ssn', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-dob" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">DOB *</label>
              <input type="text" id="ind-dob" required placeholder="mm/dd/yyyy" value={individual.dob} onChange={(e) => handleIndividualChange('dob', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-gender" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Gender *</label>
              <select id="ind-gender" value={individual.gender} onChange={(e) => handleIndividualChange('gender', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550">
                <option value="Select Gender">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-first" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">First Name *</label>
              <input type="text" id="ind-first" required value={individual.firstName} onChange={(e) => handleIndividualChange('firstName', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-middle" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Middle Name</label>
              <input type="text" id="ind-middle" value={individual.middleName} onChange={(e) => handleIndividualChange('middleName', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-last" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Last Name *</label>
              <input type="text" id="ind-last" required value={individual.lastName} onChange={(e) => handleIndividualChange('lastName', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-apply" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Apply Ind *</label>
              <select id="ind-apply" value={individual.applyInd} onChange={(e) => handleIndividualChange('applyInd', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550">
                <option value="Select Option">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="ind-street" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Street Address *</label>
              <input type="text" id="ind-street" required value={individual.street} onChange={(e) => handleIndividualChange('street', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-city" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">City *</label>
              <input type="text" id="ind-city" required value={individual.city} onChange={(e) => handleIndividualChange('city', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-state" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">State *</label>
              <select id="ind-state" value={individual.state} onChange={(e) => handleIndividualChange('state', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550">
                <option>Ohio</option>
                <option>Indiana</option>
                <option>Kentucky</option>
                <option>Michigan</option>
                <option>Pennsylvania</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-zip" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Zip *</label>
              <input type="text" id="ind-zip" required value={individual.zip} onChange={(e) => handleIndividualChange('zip', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-doctype" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Type</label>
              <select id="ind-doctype" value={individual.docType} onChange={(e) => handleIndividualChange('docType', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550">
                <option value="Select Document">Select Document</option>
                <option value="Driver License">Driver License</option>
                <option value="US Passport">US Passport</option>
                <option value="Alien Registration Card">Alien Registration Card</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-alien" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Alien Number</label>
              <input type="text" id="ind-alien" value={individual.alienNum} onChange={(e) => handleIndividualChange('alienNum', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-docnum" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Number</label>
              <input type="text" id="ind-docnum" value={individual.docNum} onChange={(e) => handleIndividualChange('docNum', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ind-docexp" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Exp Date</label>
              <input type="text" id="ind-docexp" placeholder="mm/dd/yyyy" value={individual.docExp} onChange={(e) => handleIndividualChange('docExp', e.target.value)} className="border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-zinc-900 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550" />
            </div>

          </div>

          {/* Individual Action Buttons */}
          <div className="flex gap-3 border-t border-zinc-200 pt-5">
            <button 
              type="button" 
              onClick={() => alert('Add Bank functionality clicked')}
              className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4 py-2.5 uppercase tracking-wider"
            >
              Add Bank
            </button>
            <button 
              type="button" 
              onClick={() => alert('Add Another Individual functionality clicked')}
              className="bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-800 text-xs font-bold rounded-xl shadow-sm transition-all px-4 py-2.5 uppercase tracking-wider"
            >
              Add Another Individual
            </button>
          </div>
        </div>

      </div>

      {/* Card 3: Data Sources to be Run */}
      <div className="bg-white rounded-3xl border border-zinc-300 shadow-sm overflow-hidden p-6 md:p-8 flex flex-col gap-6">
        
        <div className="border-b border-zinc-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-tight">Data Sources to be Run</h3>
            <p className="text-xs text-zinc-500 mt-1">Configure individual databases to run queries against</p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1.5">
            <button type="button" onClick={() => collapseAll(false)} className="border border-zinc-300 bg-white text-zinc-700 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider hover:bg-zinc-50">Expand All</button>
            <button type="button" onClick={() => collapseAll(true)} className="border border-zinc-300 bg-white text-zinc-700 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider hover:bg-zinc-50">Collapse All</button>
            <span className="w-px h-5 bg-zinc-200 self-center"></span>
            <button type="button" onClick={() => setAllCheckboxes(true)} className="border border-zinc-300 bg-white text-zinc-700 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider hover:bg-zinc-50">Select All</button>
            <button type="button" onClick={() => setAllCheckboxes(false)} className="border border-zinc-300 bg-white text-zinc-700 font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider hover:bg-zinc-50">Unselect All</button>
            <span className="w-px h-5 bg-zinc-200 self-center"></span>
            <button type="button" onClick={() => setSources(initialCheckboxState)} className="border border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 text-indigo-700 font-bold px-3.5 py-1.5 rounded-lg text-[10px] uppercase tracking-wider">Default by Category</button>
          </div>
        </div>

        {/* Verification Categories List */}
        <div className="flex flex-col gap-6">
          {Object.entries(categoryLabels).map(([catKey, label]) => {
            const isCollapsed = collapsed[catKey];
            const catSources = sources[catKey] || {};
            
            return (
              <div key={catKey} className="border border-zinc-300 rounded-2xl overflow-hidden shadow-sm hover:border-zinc-350 transition-colors">
                
                {/* Category Header Bar */}
                <div 
                  onClick={() => toggleCollapse(catKey)}
                  className="bg-zinc-100 px-5 py-3.5 flex justify-between items-center border-b border-zinc-300 cursor-pointer hover:bg-zinc-150 transition-colors select-none"
                >
                  <span className="text-xs font-black text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                    {label}
                  </span>
                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <button 
                      type="button" 
                      onClick={() => setCategoryAll(catKey, true)}
                      className="text-[9px] font-black text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-250 px-2 py-1 rounded"
                    >
                      Select All
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCategoryAll(catKey, false)}
                      className="text-[9px] font-black text-zinc-700 bg-zinc-55 hover:bg-zinc-100 border border-zinc-300 px-2 py-1 rounded"
                    >
                      Unselect All
                    </button>
                  </div>
                </div>

                {/* Category Content List */}
                {!isCollapsed && (
                  <div className="p-5 bg-zinc-50/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                    {Object.entries(catSources).map(([sourceName, checked]) => (
                      <label 
                        key={sourceName} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                          checked 
                            ? 'bg-indigo-50/30 border-indigo-200 text-indigo-900 shadow-sm' 
                            : 'bg-white border-zinc-250 hover:border-zinc-300 text-zinc-800 hover:bg-zinc-50'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={checked}
                          onChange={() => toggleCheckbox(catKey, sourceName)}
                          className="w-4 h-4 text-indigo-650 border-zinc-300 rounded focus:ring-indigo-500 bg-white"
                        />
                        <span className="text-xs font-bold leading-none">{sourceName}</span>
                      </label>
                    ))}
                  </div>
                )}

              </div>
            )
          })}
        </div>

      </div>

      {/* Bottom Form Actions */}
      <div className="flex items-center justify-end gap-4 border-t border-zinc-200 pt-6">
        <Link 
          to="/" 
          className="text-xs font-extrabold text-zinc-500 hover:text-zinc-800 transition-colors uppercase tracking-widest px-5 py-3"
        >
          Cancel
        </Link>
        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-8 py-3.5 text-xs uppercase tracking-widest hover:-translate-y-0.5"
        >
          Submit Case
        </button>
      </div>

    </form>
  );
}
