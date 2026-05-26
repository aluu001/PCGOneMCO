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
  const [step, setStep] = useState(1);
  
  // Step 1 State: Case Details
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

  // Step 2 State: Applicant details
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

  // Step 3 State: Checkboxes
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

  const handleSubmit = () => {
    if (!caseNumber) {
      alert('Please fill out Case Number');
      return;
    }
    alert(`Case ID ${caseNumber || 'New Request'} has been submitted and queued for verification successfully!`);
    navigate('/');
  };

  const nextStep = () => {
    if (step === 1 && !caseNumber) {
      alert('Please fill out Case Number to proceed');
      return;
    }
    if (step === 2 && (!individual.firstName || !individual.lastName)) {
      alert('Please enter First Name and Last Name of the applicant');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="flex flex-col gap-8 pb-20 w-full animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Verification portal</span>
          <h2 className="text-2xl font-black text-indigo-700 tracking-tight uppercase">New Eligibility Request</h2>
        </div>
        <Link to="/" className="text-xs font-extrabold text-zinc-500 hover:text-zinc-800 transition-colors uppercase tracking-widest bg-white border border-zinc-300 px-4 py-2 rounded-xl shadow-sm">
          Exit Wizard
        </Link>
      </div>

      {/* Modern Stepper Indicator */}
      <div className="bg-white border border-zinc-300 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        
        {/* Step 1 */}
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
            step === 1 ? 'bg-indigo-600 text-white' : step > 1 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-zinc-100 text-zinc-400'
          }`}>
            {step > 1 ? 'OK' : '1'}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Step 1</span>
            <span className={`text-xs font-bold ${step === 1 ? 'text-indigo-650' : 'text-zinc-700'}`}>Case Parameters</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-px bg-zinc-200 mx-4"></div>

        {/* Step 2 */}
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
            step === 2 ? 'bg-indigo-600 text-white' : step > 2 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-zinc-100 text-zinc-400'
          }`}>
            {step > 2 ? 'OK' : '2'}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Step 2</span>
            <span className={`text-xs font-bold ${step === 2 ? 'text-indigo-650' : 'text-zinc-700'}`}>Applicant details</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-px bg-zinc-200 mx-4"></div>

        {/* Step 3 */}
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
            step === 3 ? 'bg-indigo-600 text-white' : step > 3 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-zinc-100 text-zinc-400'
          }`}>
            {step > 3 ? 'OK' : '3'}
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Step 3</span>
            <span className={`text-xs font-bold ${step === 3 ? 'text-indigo-650' : 'text-zinc-700'}`}>Database Selection</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 h-px bg-zinc-200 mx-4"></div>

        {/* Step 4 */}
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
            step === 4 ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'
          }`}>
            4
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Step 4</span>
            <span className={`text-xs font-bold ${step === 4 ? 'text-indigo-650' : 'text-zinc-700'}`}>Review & Submit</span>
          </div>
        </div>

      </div>

      {/* WIZARD STEP PAGES */}
      
      {/* STEP 1: Case parameters */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-zinc-300 p-6 md:p-8 flex flex-col gap-8 shadow-sm animate-in fade-in duration-200">
          
          <div className="border-b border-zinc-200 pb-3">
            <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">Case Parameters</h3>
            <p className="text-xs text-zinc-500 mt-1">Specify core household and program details</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="case-num" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Case Number *</label>
              <input 
                type="text" 
                id="case-num"
                placeholder="e.g. 1000000001"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="app-date" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Application Date *</label>
              <input 
                type="text" 
                id="app-date"
                placeholder="mm/dd/yyyy"
                value={appDate}
                onChange={(e) => setAppDate(e.target.value)}
                className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hh-adults" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Household Adults *</label>
              <input 
                type="number" 
                id="hh-adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="border border-zinc-350 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="program-type" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Type of Programs *</label>
            <select 
              id="program-type"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="border border-zinc-355 rounded-xl px-4 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all focus:bg-white w-full md:w-1/2"
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
                <input type="text" id="size-and" value={programSizes.and} onChange={(e) => handleProgramSizeChange('and', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-950 bg-white" />
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
                <label htmlFor="size-ltc" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">LTC</label>
                <input type="text" id="size-ltc" value={programSizes.ltc} onChange={(e) => handleProgramSizeChange('ltc', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="size-mbiwd" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">MBIWD</label>
                <input type="text" id="size-mbiwd" value={programSizes.mbiwd} onChange={(e) => handleProgramSizeChange('mbiwd', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="size-ssi" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">SSI</label>
                <input type="text" id="size-ssi" value={programSizes.ssi} onChange={(e) => handleProgramSizeChange('ssi', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="size-noactive" className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">No Active Prog</label>
                <input type="text" id="size-noactive" value={programSizes.noActive} onChange={(e) => handleProgramSizeChange('noActive', e.target.value)} className="border border-zinc-300 rounded-lg px-3 py-1.5 text-xs font-bold text-zinc-955 bg-white" />
              </div>

            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-end gap-3 border-t border-zinc-200 pt-5">
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-8 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5"
            >
              Continue to Applicant Info
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: Applicant details */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-zinc-300 p-6 md:p-8 flex flex-col gap-8 shadow-sm animate-in fade-in duration-200">
          
          <div className="border-b border-zinc-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">Applicant Information</h3>
              <p className="text-xs text-zinc-500 mt-1">Specify personal identification and document details</p>
            </div>
            <span className="text-[9px] font-black uppercase bg-indigo-50 border border-indigo-250 text-indigo-700 px-3 py-1 rounded">Primary Applicant</span>
          </div>

          {/* Demographics Sub-grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1">1. Demographics & SSN</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="ind-id" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Individual ID *</label>
                <input type="text" id="ind-id" placeholder="e.g. 1000000001" value={individual.id} onChange={(e) => handleIndividualChange('id', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-950 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
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

          {/* Name Sub-grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1">2. Name Details</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="ind-first" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">First Name *</label>
                <input type="text" id="ind-first" value={individual.firstName} onChange={(e) => handleIndividualChange('firstName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="ind-middle" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Middle Name</label>
                <input type="text" id="ind-middle" value={individual.middleName} onChange={(e) => handleIndividualChange('middleName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="ind-last" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Last Name *</label>
                <input type="text" id="ind-last" value={individual.lastName} onChange={(e) => handleIndividualChange('lastName', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
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

          {/* Address Sub-grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1">3. Residential Address</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label htmlFor="ind-street" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Street Address *</label>
                <input type="text" id="ind-street" value={individual.street} onChange={(e) => handleIndividualChange('street', e.target.value)} className="border border-zinc-355 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="ind-city" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">City *</label>
                <input type="text" id="ind-city" value={individual.city} onChange={(e) => handleIndividualChange('city', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="ind-state" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">State *</label>
                <select id="ind-state" value={individual.state} onChange={(e) => handleIndividualChange('state', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
                  <option>Ohio</option>
                  <option>Indiana</option>
                  <option>Kentucky</option>
                  <option>Michigan</option>
                  <option>Pennsylvania</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="ind-zip" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Zip *</label>
                <input type="text" id="ind-zip" value={individual.zip} onChange={(e) => handleIndividualChange('zip', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>
            </div>
          </div>

          {/* Official Documents Sub-grid */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 block border-b border-zinc-100 pb-1">4. Official Verification Documents</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="ind-doctype" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Type</label>
                <select id="ind-doctype" value={individual.docType} onChange={(e) => handleIndividualChange('docType', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all">
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
                <label htmlFor="ind-docexp" className="text-[9px] font-black uppercase tracking-wider text-zinc-450 ml-1">Document Exp Date</label>
                <input type="text" id="ind-docexp" placeholder="mm/dd/yyyy" value={individual.docExp} onChange={(e) => handleIndividualChange('docExp', e.target.value)} className="border border-zinc-350 rounded-xl px-3.5 py-3 text-xs font-bold text-zinc-955 bg-zinc-50 focus:bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-550 transition-all" />
              </div>
            </div>
          </div>

          {/* Action Buttons & Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 border-t border-zinc-200 pt-5">
            <div className="flex gap-2">
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

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={prevStep}
                className="bg-white border border-zinc-300 hover:border-zinc-550 text-zinc-700 font-extrabold rounded-xl shadow-sm transition-all px-6 py-3 text-xs uppercase tracking-widest"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5"
              >
                Continue to Databases
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STEP 3: Database selection */}
      {step === 3 && (
        <div className="bg-white rounded-3xl border border-zinc-300 p-6 md:p-8 flex flex-col gap-8 shadow-sm animate-in fade-in duration-200">
          
          <div className="border-b border-zinc-200 pb-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">Database Selection</h3>
              <p className="text-xs text-zinc-500 mt-1">Select the databases to query. No accordions: all options are always visible.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setAllCheckboxes(true)} className="border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 font-bold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider">Select All</button>
              <button type="button" onClick={() => setAllCheckboxes(false)} className="border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 font-bold px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-wider">Unselect All</button>
              <span className="w-px h-5 bg-zinc-200 self-center"></span>
              <button type="button" onClick={() => setSources(initialCheckboxState)} className="border border-indigo-200 hover:border-indigo-350 bg-indigo-50/50 text-indigo-700 font-bold px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider">Reset Defaults</button>
            </div>
          </div>

          {/* Flat Grid of Database Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(categoryLabels).map(([catKey, label]) => {
              const catSources = sources[catKey] || {};
              
              return (
                <div key={catKey} className="bg-zinc-50 border border-zinc-300 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  
                  {/* Category Header */}
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

                  {/* Checkboxes List */}
                  <div className="p-4 grid grid-cols-1 gap-2.5">
                    {Object.entries(catSources).map(([sourceName, checked]) => (
                      <label 
                        key={sourceName} 
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                          checked 
                            ? 'bg-indigo-50/30 border-indigo-250 text-indigo-900 shadow-sm/5 font-bold' 
                            : 'bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 font-semibold'
                        }`}
                      >
                        <input 
                          type="checkbox" 
                          checked={checked}
                          onChange={() => toggleCheckbox(catKey, sourceName)}
                          className="w-4 h-4 text-indigo-650 border-zinc-350 rounded focus:ring-indigo-500 bg-white cursor-pointer"
                        />
                        <span className="text-xs">{sourceName}</span>
                      </label>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-3 border-t border-zinc-200 pt-5">
            <button 
              type="button" 
              onClick={prevStep}
              className="bg-white border border-zinc-350 hover:border-zinc-550 text-zinc-705 font-extrabold rounded-xl shadow-sm transition-all px-6 py-3 text-xs uppercase tracking-widest"
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={nextStep}
              className="bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-3 text-xs uppercase tracking-widest hover:-translate-y-0.5"
            >
              Continue to Review
            </button>
          </div>

        </div>
      )}

      {/* STEP 4: Review & Submit */}
      {step === 4 && (
        <div className="bg-white rounded-3xl border border-zinc-300 p-6 md:p-8 flex flex-col gap-8 shadow-sm animate-in fade-in duration-200">
          
          <div className="border-b border-zinc-200 pb-3">
            <h3 className="text-base font-black text-zinc-900 uppercase tracking-tight">Review & Submit</h3>
            <p className="text-xs text-zinc-500 mt-1">Audit the verification request parameters before final submission</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Case Parameters Summary */}
            <div className="bg-zinc-50 border border-zinc-300 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-450 block border-b border-zinc-200 pb-2 mb-3">Case Parameters</span>
              <div className="grid grid-cols-2 gap-y-3.5 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Case Number</span>
                  <span className="font-extrabold text-zinc-900">{caseNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Application Date</span>
                  <span className="font-extrabold text-zinc-900">{appDate || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Household Adults</span>
                  <span className="font-extrabold text-zinc-900">{adults}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Program Type</span>
                  <span className="font-extrabold text-zinc-900">{selectedProgram}</span>
                </div>
              </div>
            </div>

            {/* Applicant details Summary */}
            <div className="bg-zinc-50 border border-zinc-300 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-450 block border-b border-zinc-200 pb-2 mb-3">Applicant Info</span>
              <div className="grid grid-cols-2 gap-y-3.5 text-xs">
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Full Name</span>
                  <span className="font-extrabold text-zinc-900">{individual.firstName} {individual.middleName} {individual.lastName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Date of Birth (Gender)</span>
                  <span className="font-extrabold text-zinc-900">{individual.dob} ({individual.gender})</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">SSN Reference</span>
                  <span className="font-mono font-bold text-zinc-800">{individual.ssn || 'None provided'}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-bold">Residential Address</span>
                  <span className="font-semibold text-zinc-850">{individual.street}, {individual.city}, {individual.state} {individual.zip}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Database Sources Summary */}
          <div className="bg-indigo-50/20 border border-indigo-200 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700 block border-b border-indigo-150 pb-2 mb-3">Target Verification Databases ({countActiveDatabases()} Selected)</span>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1.5">
              {Object.entries(sources).flatMap(([catKey, catSources]) => 
                Object.entries(catSources)
                  .filter(([_, checked]) => checked)
                  .map(([sourceName]) => (
                    <span key={sourceName} className="bg-white border border-indigo-200 text-indigo-850 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm/5">
                      {categoryLabels[catKey]}: {sourceName}
                    </span>
                  ))
              )}
              {countActiveDatabases() === 0 && (
                <span className="text-xs font-semibold text-red-600">Warning: No databases selected. Please go back and select at least one database source.</span>
              )}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between items-center border-t border-zinc-200 pt-5">
            <button 
              type="button" 
              onClick={prevStep}
              className="bg-white border border-zinc-350 hover:border-zinc-550 text-zinc-705 font-extrabold rounded-xl shadow-sm transition-all px-6 py-3 text-xs uppercase tracking-widest"
            >
              Back
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              disabled={countActiveDatabases() === 0}
              className={`font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all px-8 py-3.5 text-xs uppercase tracking-widest hover:-translate-y-0.5 ${
                countActiveDatabases() === 0 
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0' 
                  : 'bg-indigo-600 hover:bg-indigo-750 text-white'
              }`}
            >
              Submit Verification Request
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
