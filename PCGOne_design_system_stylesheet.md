# PCGOne (AUTO.IES) Design System & Styling Stylesheet

This stylesheet defines the cosmetics, colors, typography, component structures, and design guidelines of the PCGOne (AUTO.IES) AI/NLP-Enabled Automated Eligibility QA System. Use this document as the reference source of truth to replicate or extend the design system in other projects.

---

## 1. Core Technology Stack

The PCGOne front-end system is structured around the following stack:
* **Framework**: React (v18+) with Vite as the build server.
* **Language**: TypeScript (`.ts` and `.tsx` strictly required; no `.js` or `.jsx` allowed in source folders).
* **Styling**: Tailwind CSS (v3/v4) configured with custom theme extensions to override standard colors.
* **Icons**: Lucide React for consistent line-art iconography.

---

## 2. Color Palette & Theme Mappings

The system utilizes custom corporate colors mapped directly onto Tailwind's default color classes. This allows developers to use standard Tailwind color syntax (e.g., `text-indigo-700` or `bg-emerald-50`) while outputting the custom brand tokens.

### A. Brand Colors (PCG Palette)
* **PCG Dark Blue**: `#0B3677` (The primary brand color for navigation, active items, and headings).
* **PCG Sky Blue**: `#00A0CA` (Secondary typography, accents, and information callouts).
* **PCG Magenta**: `#A11B7E` (Used as a branding accent color, dot indicator, and focus indicator).
* **PCG Yellow/Gold**: `#FAB81F` (Warning highlights, urgent cases, and expedited queue badges).
* **PCG Green**: `#00CC66` (Success states, approved actions, and verified determinations).
* **PCG Red**: `#EE2346` (Error states, disagreed determinations, blocking issues, and alerts).

### B. Tailwind Theme Overrides (`tailwind.config.js`)

In the project's configuration, these brand colors are mapped to Tailwind scales:

| Tailwind Color Scale | Brand Concept | Core Hex (Level 700 / 500) | Theme Mapping |
| :--- | :--- | :--- | :--- |
| **`indigo`** | Primary System Brand | `#0B3677` (`indigo-700`) | Primary UI buttons, navigation, headers. |
| **`emerald`** | Success / Validated | `#00CC66` (`emerald-500`) | Verified parameters, active statuses, approved cases. |
| **`red`** | Error / Danger | `#EE2346` (`red-500`) | Disagreed findings, blocking issues, alerts. |
| **`orange`**| Warning / Urgent | `#FAB81F` (`orange-500`) | Warnings, expedited queues, time-critical tasks. |
| **`blue`**  | Secondary Accent | `#00A0CA` (`blue-500`) | System information badges, user settings, documents. |

---

## 3. Typography & Font Hierarchy

* **Primary Font**: **Montserrat** (fallback: `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`).
* **Sizing Rules**:
  * **Brand Header**: `text-[32px]` or `text-[36px]`, bold, tracking-tight.
  * **Page Title**: `text-2xl` (`24px`), font-bold, tracking-tight.
  * **Card / Section Title**: `text-lg` (`18px`) or `text-[16px]`, font-bold.
  * **Input Labels**: `text-xs` (`12px`), font-semibold, uppercase, tracking-widest (e.g. `tracking-widest`).
  * **Body / Table Content**: `text-sm` (`14px`), font-medium or font-semibold.
  * **Secondary / Details Text**: `text-xs` (`12px`) or `text-[11px]`, font-medium.

---

## 4. Core Component Styling Specifications

### A. Buttons

#### Primary Buttons
* **Classes**: `bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-700`
* **Disabled States**: Set to `opacity-50 cursor-not-allowed pointer-events-none` when `aria-disabled` is active.

#### Secondary / Accent Buttons
* **Classes**: `bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold rounded-lg shadow-sm transition-colors`

#### Icon Buttons (Back / Close)
* **Classes**: `p-2 text-zinc-500 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 rounded-lg transition-colors`

---

### B. Form Inputs & Selects

* **Standard Text/Email/Password/Select Input**:
  * **Normal State**: `border border-zinc-300 rounded-md px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-50 transition-all w-full`
  * **Form Group Container**: Typically wrapped in `flex flex-col gap-1.5 focus-within:text-indigo-600 text-zinc-700`.
  * **Accessibility Control**: Labels must be linked to controls via `htmlFor` and unique `id`.

---

### C. Tables & Matrices

* **Wrapper**: `bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col`
* **Header Row (`thead`)**: `bg-indigo-50/80 border-b border-indigo-100`
* **Header Cells (`th`)**: `py-4 px-6 text-[12px] font-semibold text-indigo-800 uppercase tracking-wider`
* **Body Rows (`tr`)**: `border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors`
* **Body Cells (`td`)**: `py-4 px-6 text-sm text-zinc-700`

---

### D. Badges & Status Indicators

* **Admin Role / Priority High**:
  * **Classes**: `inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap bg-red-50 text-red-700 ring-red-600/20`
* **Manager Role / Warning State**:
  * **Classes**: `inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap bg-orange-50 text-orange-700 ring-orange-600/20`
* **Active Status / Approved / Validated**:
  * **Classes**: `inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap bg-emerald-50 text-emerald-700 ring-emerald-600/20`
  * **Indicator Dot (within badge)**: `w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5`
* **Inactive Status / Default / Ancillary**:
  * **Classes**: `inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-zinc-100 text-zinc-600 ring-zinc-500/10`

---

### E. Pagination Footer

* **Wrapper**: `px-4 py-3 flex items-center justify-between border-t border-zinc-200 bg-zinc-50/50`
* **Rows Select**: Compact dropdown labeled with `aria-label="Rows per page"`.
* **Page Buttons**: `w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-all`
  * **Active**: `bg-indigo-700 text-white shadow-sm`
  * **Hover**: `text-zinc-600 hover:bg-zinc-200/50`
  * **Disabled Nav Buttons**: `opacity-40 cursor-not-allowed pointer-events-none`

---

## 5. Structural Layout & Spacing Rules

* **Page Container**: `min-h-screen bg-zinc-50 flex flex-col font-sans pb-24`
* **Layout Width Wrapper**: `max-w-[1400px] mx-auto px-6 mt-10 w-full` (for dashboards/admin pages) or `max-w-[1280px] mx-auto px-6` (for user queues).
* **Grid Spacers**: `gap-8` for major grids, `space-y-4` or `gap-3` for inline elements.
* **Sticky Navigation Header**: `sticky top-0 z-30 shadow-sm bg-white border-b border-zinc-200`.

---

## 6. Key Aesthetic Guidelines

1. **Clean Structured Cards**: Avoid heavy card borders. Instead, rely on `border border-zinc-200` combined with subtle shadow profiles (`shadow-sm` or `shadow-[0_2px_10px_rgba(0,0,0,0.02)]`).
2. **Accessible Form Alignments**: All inputs must have associated labels and distinct styling indicators during focused states (e.g. `focus-within:text-indigo-600` on input wrappers and `focus:ring-2 focus:ring-indigo-500` on inputs).
3. **Contrast-Rich Tables**: Header row backgrounds utilize the primary color scale at an opacity of 5% to 8% (`bg-indigo-50/80`), producing a clear visual contrast from the data rows.
4. **State Transition Micro-animations**: Utilize Tailwind `transition-all duration-300` or `transition-colors` on all interactive links, buttons, hover cards, and accordion panels to give the interface a fluid, premium feel.
