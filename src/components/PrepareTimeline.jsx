import { useMemo, useState } from 'react';
import { EncounterRow } from './EncounterRow';
import { FilterBar } from './FilterBar';

const encounters = [
  {
    id: 'endo-20251121',
    date: '2025-11-21',
    title: 'Endocrinology Office Visit',
    clinician: { name: 'Stacie M. Woods, PA-C' },
    sources: [
      {
        id: 's1',
        title: 'Endocrinology Office Visit Note',
        author: 'Stacie M. Woods, PA-C',
        content:
          'Follow-up note for type 2 diabetes with microalbuminuria. A1c 6.9% (last), overall fair/good control, no hypoglycemia. Continue current non-insulin regimen: metformin XR, glimepiride, Mounjaro, Jardiance; no medication changes. POCT HbA1c ordered; home glucose monitoring and diabetes education reinforced.',
      },
    ],
    problems: ['Type 2 diabetes mellitus with microalbuminuria'],
    items: [
      'Follow-up for type 2 diabetes with microalbuminuria; A1c 6.9% (last), overall fair/good control, no hypoglycemia.',
      'Continue current non-insulin regimen: metformin XR, glimepiride, Mounjaro, Jardiance; no medication changes.',
      'POCT HbA1c ordered; home glucose monitoring and diabetes education reinforced.',
    ],
  },
  {
    id: 'ct-20251110',
    date: '2025-11-10',
    title: 'CT Abdomen Pelvis With IV Contrast',
    clinician: null,
    sources: [
      {
        id: 's2a',
        title: 'CT Abdomen/Pelvis Report',
        author: 'Sydney Farrow',
        content:
          'CT abdomen/pelvis with IV contrast: prior lymphadenopathy resolved; no acute findings; pancreatic head cyst unchanged from prior MRI; prostate substantially enlarged (135 mL), stable since 12/18/2023.',
      },
      {
        id: 's2b',
        title: 'Progress notes',
        author: 'Anthony V. Deluca, NP',
        content:
          'Progress note detailing imaging follow-up and stability of pancreatic cyst and prostate findings. No acute changes.',
      },
      {
        id: 's2c',
        title: 'Addendum note',
        author: 'Dale Harris, LPN',
        content: 'Addendum confirming imaging review and patient notification.',
      },
    ],
    problems: ['Side-branch IPMN pancreatic cyst', 'BPH with LUTS'],
    items: [
      'Previous lymphadenopathy resolved; no acute findings.',
      'Pancreatic head cyst unchanged from prior MRI.',
      'Prostate substantially enlarged (135 mL), stable since 12/18/2023.',
    ],
  },
  {
    id: 'heme-20251107',
    date: '2025-11-07',
    title: 'Hematology And Oncology Office Visit',
    clinician: { name: 'Multiple Clinicians' },
    sources: [
      {
        id: 's3a',
        title: 'Heme/Onc Progress Note',
        author: 'Eric M. Fountain, MD',
        content:
          '6mo follow-up for CLL; platelets 89, mild paresthesias and arthralgia, no new B symptoms. Zanubrutinib dose decreased to 160mg daily due to thrombocytopenia; CBC recheck in 1 month. Recommended OTC melatonin 3-10mg nightly for insomnia.',
      },
      {
        id: 's3b',
        title: 'Heme/Onc Visit Summary',
        author: 'Team',
        content: 'Visit summary reinforcing dose change and monitoring plan.',
      },
    ],
    problems: ['CLL/SLL'],
    items: [
      '6mo follow-up for CLL; platelets 89, mild paresthesias and arthralgia, no new B symptoms.',
      'Zanubrutinib dose decreased to 160mg daily due to thrombocytopenia; CBC recheck in 1 month.',
      'Recommended OTC melatonin 3-10mg nightly for insomnia.',
    ],
  },
  {
    id: 'hpbt-20250902',
    date: '2025-09-02',
    title: 'Pancreatico-hepatobiliary Office Visit',
    clinician: { name: 'Lindsay E. Shedd, PA-C' },
    sources: [
      {
        id: 's4',
        title: 'HPB Clinic Note',
        author: 'Lindsay E. Shedd, PA-C',
        content:
          'Follow-up for stable side-branch pancreatic cyst; annual MRI surveillance continued, no high-risk features. Cirrhosis and liver lesion stable; no progression. Small bilateral renal cysts benign, slightly increased size. Dizziness addressed by PCP with medication adjustments.',
      },
    ],
    problems: ['Side-branch IPMN pancreatic cyst', 'NAFLD cirrhosis with esophageal varices'],
    items: [
      'Follow-up for stable side-branch pancreatic cyst; annual MRI surveillance continued, no high-risk features.',
      'Cirrhosis and liver lesion stable; no progression, continue monitoring, no hepatology referral unless decompensation.',
      'Small bilateral renal cysts, benign features, slightly increased size.',
      'Dizziness addressed by PCP with medication adjustments; vitals stable, advised to monitor and report persistent/worsening symptoms.',
    ],
  },
  {
    id: 'fm-20250902',
    date: '2025-09-02',
    title: 'Family Medicine Office Visit',
    clinician: { name: 'Phyllis J. You, MD' },
    sources: [
      {
        id: 's5',
        title: 'Family Medicine Note',
        author: 'Courtney M. Woolston, DNP',
        content:
          'Medicare Annual Wellness and chronic disease follow-up; labs stable, kidney function and cholesterol improved. Glimepiride discontinued due to hypoglycemia risk; continue metformin, Mounjaro, Jardiance; Miralax PRN. Pantoprazole taper planned. Vaccines reviewed.',
      },
    ],
    problems: ['BPH with LUTS', 'CAD with HTN/HLD'],
    items: [
      'Medicare Annual Wellness and chronic disease follow-up; labs stable, kidney function and cholesterol improved, prostate cancer screen normal.',
      'Glimepiride discontinued due to hypoglycemia risk; continue metformin, Mounjaro, Jardiance; Miralax recommended PRN for constipation.',
      'Pantoprazole to be tapered to 40mg AM/20mg PM; instructed gradual wean.',
      'Vaccine guidance provided (Tdap, RSV, influenza, COVID); directed to pharmacy for administration.',
      'No changes to antihypertensive, statin, or prostate meds; continue current regimens.',
    ],
  },
];

const problemsList = [
  'CLL/SLL',
  'NAFLD cirrhosis with esophageal varices',
  'Type 2 diabetes mellitus with microalbuminuria',
  'CAD with HTN/HLD',
  'BPH with LUTS',
  'Side-branch IPMN pancreatic cyst',
];

export function PrepareTimeline() {
  const [filterState, setFilterState] = useState({
    selectedProblem: null,
    dropdownOpen: false,
  });

  const visibleEncounters = useMemo(() => {
    if (!filterState.selectedProblem) return encounters;
    return encounters.filter((encounter) =>
      encounter.problems?.includes(filterState.selectedProblem),
    );
  }, [filterState.selectedProblem]);

  const handleProblemSelect = (value) => {
    setFilterState((prev) => ({
      selectedProblem: value,
      dropdownOpen: value ? false : prev.dropdownOpen,
    }));
  };

  return (
    <section className="flex flex-col gap-[24px]">
      <FilterBar
        problems={problemsList}
        filterState={filterState}
        setFilterState={setFilterState}
        onProblemSelect={handleProblemSelect}
      />

      <div className="flex flex-col gap-[24px]">
        {visibleEncounters.map((encounter) => (
          <EncounterRow
            key={encounter.id}
            date={encounter.date}
            title={encounter.title}
            clinician={encounter.clinician}
            sources={encounter.sources}
            items={encounter.items}
          />
        ))}
      </div>
    </section>
  );
}

