import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Info, AlertTriangle, CheckCircle, FileText, Download, UserCircle2 } from 'lucide-react';

const mockAssistanceText = "MAGI Deemed Infant, Aged Categorically Needy, SSI Recipient - Aged, MBIWD Basic, LTC-SIL - Waiver Level One, MAGI Child Under 1, MAGI Child 1-5, MAGI Child 6-18, CHIP Child 1, CHIP Child 2, MAGI Pregnant Women, MAGI Parent or Caretaker, TMA (1st 6 Months), Extended Medical Assistance (EMA), Former Foster Care, Ribicoff Kid, MAGI Adult Age 19-20, HCBS, Institutional Setting, Disabled, Blind Categorically Needy, 1619(b) Recipient, RSS Medicaid - Non-SSI, Individual Receiving Mandatory State Supplements...";

function StatusBadge({ status }: { status: string }) {
  const isEligible = status === 'Eligible';
  if (isEligible) {
    return (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[13px] font-bold tracking-wide shadow-sm">
        <CheckCircle className="w-4 h-4" /> {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200/50 text-[13px] font-bold tracking-wide shadow-sm">
      <AlertTriangle className="w-4 h-4" /> {status}
    </span>
  );
}

function Accordion({ title, name, status, children, defaultExpanded = false }: { title: string, name: string, status: string, children?: React.ReactNode, defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <div className={`border-b border-zinc-200 transition-all duration-300 ${expanded ? 'bg-white mb-8 mt-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-b-transparent rounded-[20px]' : 'hover:bg-zinc-50/50'}`}>
      <button 
        onClick={() => setExpanded(!expanded)} 
        className={`w-full flex items-center justify-between py-8 px-10 focus:outline-none transition-colors ${expanded ? 'bg-indigo-50/30 rounded-t-[20px]' : ''}`}
      >
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-xl shadow-sm ${status === 'Eligible' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {status === 'Eligible' ? <CheckCircle className="w-7 h-7" /> : <AlertTriangle className="w-7 h-7" />}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-[20px] font-bold text-zinc-800 tracking-tight">{title}</span>
            <div className="flex items-center gap-2 text-[14px] text-zinc-500 font-semibold">
              <UserCircle2 className="w-4 h-4" /> {name}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <StatusBadge status={status} />
          <div className={`p-2.5 rounded-full transition-colors ${expanded ? 'bg-indigo-100 text-indigo-700' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'}`}>
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </button>
      
      {expanded && children && (
        <div className="px-10 py-10 bg-white border-t border-zinc-100 rounded-b-[20px]">
          {children}
        </div>
      )}
    </div>
  );
}

function SubCard({ source, status, title, description }: { source: string, status: string, title: string, description: string }) {
  const isEligible = status === 'Eligible';
  return (
    <div className="flex flex-col xl:flex-row gap-10 p-8 rounded-[20px] border border-zinc-100 bg-zinc-50/50 hover:bg-white transition-colors hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
      <div className="flex flex-col gap-4 xl:w-[300px] shrink-0 border-b xl:border-b-0 xl:border-r border-zinc-200 pb-8 xl:pb-0">
        <span className="text-[13px] font-extrabold text-indigo-700 uppercase tracking-widest">{source}</span>
        <div><StatusBadge status={status} /></div>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <div className="flex items-center gap-3">
          <span className={`text-[18px] font-bold ${isEligible ? 'text-zinc-800' : 'text-red-700'}`}>{title}</span>
          <Info className="w-5 h-5 text-blue-500 cursor-help" />
        </div>
        <p className="text-[15px] text-zinc-600 leading-loose max-w-4xl">{description}</p>
      </div>
    </div>
  );
}

export default function EligibilityReport() {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-10 pb-20 animate-in fade-in duration-500">
      
      {/* Top Nav & Actions */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-widest text-zinc-500 hover:text-indigo-700 transition-colors bg-white px-6 py-3 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-white border border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 font-bold rounded-xl shadow-sm transition-all px-8 py-3.5 text-[14px] flex items-center gap-2 uppercase tracking-widest">
            <FileText className="w-5 h-5" /> Generate Letter
          </button>
          <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-sm transition-all px-8 py-3.5 text-[14px] flex items-center gap-2 uppercase tracking-widest">
            <Download className="w-5 h-5" /> Export Summary
          </button>
        </div>
      </div>

      {/* Hero Summary Card */}
      <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-zinc-200 overflow-hidden flex flex-col xl:flex-row relative">
        <div className="absolute top-0 left-0 w-3 h-full bg-red-500"></div>
        
        {/* Left Side: Result & Actions */}
        <div className="p-12 xl:w-2/5 border-b xl:border-b-0 xl:border-r border-zinc-200 bg-red-50/30 flex flex-col justify-center relative overflow-hidden">
          <AlertTriangle className="absolute -right-12 -bottom-12 w-64 h-64 text-red-500/5 rotate-12" />
          
          <div className="relative z-10">
            <span className="inline-block text-[13px] font-extrabold uppercase tracking-widest text-red-600 mb-4 bg-red-100/80 px-3 py-1 rounded-md">Final Determination</span>
            <h2 className="text-[48px] font-extrabold text-red-700 tracking-tight mb-12 leading-none">Likely Ineligible</h2>
            
            <div className="flex flex-col gap-3">
              <label className="text-[13px] font-bold uppercase tracking-widest text-zinc-500">Update Status</label>
              <div className="flex items-center gap-3">
                <select className="border border-zinc-300 rounded-xl px-5 py-3.5 text-[15px] font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white shadow-sm flex-1">
                  <option>Open</option>
                  <option>Closed</option>
                </select>
                <button className="bg-zinc-800 hover:bg-black text-white font-bold rounded-xl shadow-sm transition-all px-8 py-3.5 text-[15px]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Case Metadata */}
        <div className="p-12 xl:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-12 bg-white">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Case Number</span>
            <span className="text-[18px] font-bold text-zinc-800">{id || '123456789'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Client Name</span>
            <span className="text-[18px] font-bold text-zinc-800 flex items-center gap-2"><UserCircle2 className="w-5 h-5 text-indigo-500"/> John M Doe</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Adults</span>
            <span className="text-[18px] font-bold text-zinc-800">1</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Assigned User</span>
            <span className="text-[18px] font-bold text-zinc-800">pcgTomelli</span>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Date</span>
            <span className="text-[18px] font-bold text-zinc-800">12/11/2022 11:15 AM</span>
          </div>
          <div className="flex flex-col gap-3 col-span-2 md:col-span-3">
            <span className="text-[12px] font-bold uppercase tracking-widest text-zinc-400">Type of Assistance</span>
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-[14px] font-medium text-zinc-600 leading-loose max-h-40 overflow-y-auto shadow-inner">
              {mockAssistanceText}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-8 border-b border-zinc-200 pb-px">
        <button className="px-8 py-4 text-[15px] font-bold text-indigo-700 bg-white border border-zinc-200 border-b-white rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)] translate-y-px">
          Instant Eligibility Verification
        </button>
        <button className="px-8 py-4 text-[15px] font-bold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 rounded-t-xl transition-colors border border-transparent">
          Verification Documents
        </button>
      </div>

      {/* Accordions Container */}
      <div className="flex flex-col mt-4 border-t border-zinc-200 pt-4">
        <Accordion title="Age" name="John M Doe" status="Eligible" />
        <Accordion title="Citizenship & Non-Citizen Status" name="John M Doe" status="Eligible" />
        
        <Accordion title="Criminal History & Incarceration" name="John M Doe" status="Likely Ineligible" defaultExpanded={true}>
          <div className="flex flex-col gap-6">
            
            <SubCard 
              source="TransUnion Criminal" 
              status="Likely Ineligible"
              title="Client is currently incarcerated"
              description="This individual may be currently incarcerated. The individual was incarcerated on 12/30/2019. Offense: BURGLARY OF A BUILDING. Explore household composition."
            />

            <SubCard 
              source="APPRISS" 
              status="Eligible"
              title="Client incarcerated during previous 12 months"
              description="This individual was incarcerated in the past 12 months. The individual was released on 4/29/2022. Booking Number: 1900034. Charges: OBSTRUCTING OR RESISTING OFFICER WITHOUT VIOLENCE, POSSESSION STOLEN VEHICLE."
            />

            {/* Redesigned Nested Table */}
            <div className="mt-8 border border-zinc-200 rounded-[20px] overflow-hidden shadow-sm">
              <div className="bg-zinc-100/80 px-8 py-5 border-b border-zinc-200">
                <span className="text-[13px] font-extrabold uppercase tracking-widest text-zinc-600">Verification Source Data</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead className="bg-white border-b border-zinc-100">
                    <tr>
                      <th className="py-5 px-8 text-[12px] font-bold text-zinc-400 uppercase tracking-widest w-[20%]">Identity</th>
                      <th className="py-5 px-8 text-[12px] font-bold text-zinc-400 uppercase tracking-widest w-[40%]">Summary Details</th>
                      <th className="py-5 px-8 text-[12px] font-bold text-zinc-400 uppercase tracking-widest w-[20%]">High Risk Areas</th>
                      <th className="py-5 px-8 text-[12px] font-bold text-zinc-400 uppercase tracking-widest w-[20%]">Address</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-8 px-8 align-top">
                        <div className="flex flex-col gap-2">
                          <span className="text-[16px] font-bold text-zinc-800">John M Doe</span>
                          <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[13px] text-zinc-500 font-medium">ID: <span className="font-mono text-zinc-700">1234567891</span></span>
                            <span className="text-[13px] text-zinc-500 font-medium">DOB: <span className="font-mono text-zinc-700">01/01/1991</span></span>
                            <span className="text-[13px] text-zinc-500 font-medium">SSN: <span className="font-mono text-zinc-700">123001235</span></span>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-8 align-top">
                        <p className="text-[13px] text-indigo-800 leading-loose font-medium bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                          MAGI Deemed Infant, Aged Categorically Needy, SSI Recipient - Aged, MBIWD Basic, LTC-SIL - Waiver Level One... 
                          <span className="text-indigo-500 ml-1 cursor-pointer hover:underline font-bold">(Show All)</span>
                        </p>
                      </td>
                      <td className="py-8 px-8 align-top">
                        <div className="flex flex-col gap-2">
                          <span className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200/50 rounded-lg text-[11px] font-bold uppercase tracking-wider w-fit">Criminal History</span>
                          <span className="px-3 py-1.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg text-[11px] font-bold uppercase tracking-wider w-fit">Death</span>
                          <span className="px-3 py-1.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-lg text-[11px] font-bold uppercase tracking-wider w-fit">Assets</span>
                        </div>
                      </td>
                      <td className="py-8 px-8 align-top">
                        <p className="text-[14px] font-medium text-zinc-700 leading-loose">
                          123 Main St<br/>Toledo, OH 43601
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </Accordion>

        <Accordion title="Financial Assets" name="John M Doe" status="Likely Ineligible">
          <SubCard 
            source="Acuity Asset Verification" 
            status="Likely Ineligible"
            title="Decrease in client and/or spouse's assets of $5,000.00 or more in 60 months prior to application"
            description="The household has a bank account with a total current balance of $45,172.00 as of 05/01/2022, a drop from $53,000.00 on 03/01/2022. Explore resources."
          />
        </Accordion>

        <Accordion title="Household Composition" name="John M Doe" status="Eligible" />
        
        <Accordion title="Identity" name="John M Doe" status="Eligible">
          <SubCard 
            source="TransUnion Premium Employment" 
            status="Eligible"
            title="First Name not Associated with Input SSN"
            description="The name of this individual is different from the name provided by the data source. The name provided is JANE DOE. Explore identity."
          />
        </Accordion>
        
        <Accordion title="Income & Employment" name="John M Doe" status="Eligible" />
        <Accordion title="In-State Residency" name="John M Doe" status="Eligible" />
        <Accordion title="Property" name="John M Doe" status="Eligible" />
      </div>
    </div>
  );
}
