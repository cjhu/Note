import React, { useState } from 'react';
import { NoteDiffView } from './NoteDiffView';

const sampleBase = `Bradley Grant Morrison is a 88 y.o. male who presents for one-month follow-up after TAVR by Dr. Balmer 5/30/2025 with balloon valvuloplasty and 26 mm Edwards Ultra valve. Pre-TAVR catheterization demonstrated nonobstructive CAD. Limited echo prior to discharge demonstrated EF > 70%, appropriately functioning bioprosthetic valve with MG 12.5mmHg, DVI 0.55. Other pertinent medical history includes HTN, HLD, PAF, HFimpEF, asthma, Barrett's esophagus. He was seen in general cardiology clinic 6/23 with complaints of dizziness at which time a Holter monitor was applied, EKG stable from prior with RBBB and HR 59bpm. Per chart review his PCP prescribed Meclizine which has helped with the dizziness. Today, Bradley is feeling same as last visit with Anthony. On a daily basis, his physical activity includes irrigating on his farm every morning. With this he is \"careful, slow.\" He has been dizzy essentially throughout his recovery from major illnesses starting last Fall. He does not feel particularly more dizzy than pre-TAVR. Possibly \"stronger\" dizziness, but not more often. Symptoms happen once or twice daily, only one time has been severe enough to fall down. No syncope. The dizziness seems to be about the same as it was at time of discharge. He will undergo vestibular PT evaluation next month. Seems to happen from major position changes, feels like eyes may cause some of it, like looking around too quickly, maybe his ears as well. Nasal spray has been helpful too. Bradley denies exertional chest pain or pressure, dyspnea on exertion, or worsening activity tolerance. NYHA Class: Class I - No limitation in normal physical activity. He denies orthopnea, paroxysmal nocturnal dyspnea, or new or worsening swelling of the extremities or abdomen. He denies concerning signs or symptoms related to afib. Bradley further denies syncope or bleeding issues including blood in the urine or stool.`;

const sampleDiffs = [
  {
    id: 'd1',
    type: 'replace',
    granularity: 'phrase',
    oldText: 'has not helped with the dizziness.',
    newText: 'has helped with the dizziness.',
    startIndex: 669,
    endIndex: 699,
  },
  {
    id: 'd2',
    type: 'add',
    granularity: 'sentence',
    oldText: '',
    newText: 'He will undergo vestibular PT evaluation next month.',
    startIndex: 1254,
    endIndex: 1306,
  },
  {
    id: 'd3',
    type: 'delete',
    granularity: 'phrase',
    oldText: 'He reported morning nausea.',
    newText: '',
    startIndex: 1480,
    endIndex: 1480,
  },
];

export function NoteDiffExample() {
  const [showDiff, setShowDiff] = useState(true);

  return (
    <div className="note-example-card">
      <div className="note-example-header">
        <label className="toggle-row" htmlFor="toggle-diff">
          <input
            id="toggle-diff"
            type="checkbox"
            checked={showDiff}
            onChange={(e) => setShowDiff(e.target.checked)}
          />
          <span>Show changes</span>
        </label>
      </div>

      <div className="note-example-body">
        <NoteDiffView baseText={sampleBase} diffs={sampleDiffs} showDiff={showDiff} />
      </div>
    </div>
  );
}

export default NoteDiffExample;

