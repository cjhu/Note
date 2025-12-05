import React, { useState } from 'react';
import { NoteDiffView } from './NoteDiffView';

const sampleBase = `Patient presents with mild cough and low-grade fever. Denies chest pain. Recommend rest and hydration. COVID-19 test returned negative. Follow-up in 3 days if symptoms persist.`;

const sampleDiffs = [
  {
    id: 'd1',
    type: 'add',
    granularity: 'sentence',
    oldText: '',
    newText: 'COVID-19 test returned negative.',
    startIndex: 103,
    endIndex: 135,
  },
  {
    id: 'd2',
    type: 'delete',
    granularity: 'phrase',
    oldText: 'Chest pain worsened with exertion.',
    newText: '',
    startIndex: 72,
    endIndex: 72,
  },
  {
    id: 'd3',
    type: 'replace',
    granularity: 'phrase',
    oldText: 'Follow-up in 1 week.',
    newText: 'Follow-up in 3 days if symptoms persist.',
    startIndex: 136,
    endIndex: 176,
  },
  {
    id: 'd4',
    type: 'delete',
    granularity: 'sentence',
    oldText: 'Plan for CBC and chest X-ray.',
    newText: '',
    startIndex: 176,
    endIndex: 176,
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

