import React from 'react';
import './PrepareTimeline.css';

const problems = [
  'CLL/SLL',
  'NAFLD cirrhosis with esophageal varices',
  'Type 2 diabetes mellitus with microalbuminuria',
  'CAD with HTN/HLD',
  'BPH with LUTS',
  'Side-branch IPMN pancreatic cyst',
  'Side-branch IPMN pancreatic cyst surveillance',
  'Mild renal cysts',
];

const timelineItems = [
  {
    id: 'visit-endo',
    date: '2025-11-11',
    title: 'Endocrinology Office Visit',
    provider: 'Stacie M. Woods, PA-C',
    bullets: [
      'Follow-up for type 2 diabetes with microalbuminuria; A1c 6.9% (last), overall fair/good control, no hypoglycemia.',
      'Continue current non-insulin regimen: metformin XR, glimepiride, Mounjaro, Jardiance; no medication changes.',
      'POCT HbA1c ordered; home glucose monitoring and diabetes education reinforced.',
    ],
    sources: 1,
    category: 'visit',
  },
  {
    id: 'ct-scan',
    date: '2025-11-10',
    title: 'CT Abdomen Pelvis With IV Contrast',
    provider: '',
    bullets: [
      'Previous lymphadenopathy resolved; no acute findings',
      'Pancreatic head cyst unchanged from prior MRI',
      'Prostate substantially enlarged (135 mL), stable since 12/18/2023',
    ],
    sources: 3,
    category: 'imaging',
  },
  {
    id: 'heme-onc',
    date: '2025-11-07',
    title: 'Hematology And Oncology Office Visit',
    provider: 'Multiple Clinicians',
    bullets: [
      '6mo follow-up for CLL; platelets 89, mild paresthesias and arthralgia, no new B symptoms.',
      'Zanubrutinib dose decreased to 160mg daily due to thrombocytopenia; CBC recheck in 1 month.',
      'Recommended OTC melatonin 3-10mg nightly for insomnia.',
    ],
    sources: 2,
    category: 'visit',
  },
  {
    id: 'hpbt',
    date: '2025-11-07',
    title: 'Pancreatico-hepatobiliary Office Visit',
    provider: 'Lindsay E. Shedd, PA-C',
    bullets: [
      'Follow-up for stable side-branch pancreatic cyst; annual MRI surveillance continued, no high-risk features.',
      'Cirrhosis and liver lesion stable; no progression, continue monitoring, no hepatology referral unless decompensation.',
      'Small bilateral renal cysts, benign features, slightly increased size.',
      'Dizziness addressed by PCP with medication adjustments; vitals stable, advised to monitor and report persistent/worsening symptoms.',
    ],
    sources: 1,
    category: 'visit',
  },
];

const formatDateParts = (dateStr) => {
  const date = new Date(`${dateStr}T00:00:00`);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    year: date.toLocaleDateString('en-US', { year: 'numeric' }),
    full: date.toLocaleDateString('en-US'),
  };
};

export function PrepareTimeline() {
  return (
    <div className="prepare-wrap">
      <div className="prepare-controls">
        <div className="filters">
          <span className="label">Filters</span>
          <button type="button" className="filter-chip">
            All data sources
          </button>
          <button type="button" className="ghost-btn">+</button>
        </div>
        <button type="button" className="ghost-btn">⚙️</button>
      </div>

      <div className="problem-chips" aria-label="Problem list">
        {problems.map((problem) => (
          <span key={problem} className="problem-chip">
            {problem}
          </span>
        ))}
      </div>

      <div className="timeline-list">
        {timelineItems.map((item) => {
          const dateParts = formatDateParts(item.date);
          return (
            <article key={item.id} className="timeline-row">
              <div className="timeline-date-col" aria-hidden="true">
                <div className="date-stack">
                  <span className="date-month">{dateParts.month}</span>
                  <span className="date-day">{dateParts.day}</span>
                  <span className="date-year">{dateParts.year}</span>
                </div>
              </div>

              <div className="timeline-card">
                <div className="card-header">
                  <div className="card-title">
                    <span className="date-pill">{dateParts.full}</span>
                    <div>
                      <p className="card-name">{item.title}</p>
                      <div className="card-meta">
                        <span className={`badge badge-${item.category}`}>
                          {item.category === 'imaging' ? 'Imaging' : 'Visit'}
                        </span>
                        <span className="source-pill">{item.sources} source{item.sources > 1 ? 's' : ''}</span>
                        {item.provider && <span className="provider">{item.provider}</span>}
                      </div>
                    </div>
                  </div>
                  <button type="button" className="ghost-btn" aria-label="Copy link to entry">🔗</button>
                </div>

                <ul className="card-bullets">
                  {item.bullets.map((bullet, idx) => (
                    <li key={`${item.id}-bullet-${idx}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default PrepareTimeline;

