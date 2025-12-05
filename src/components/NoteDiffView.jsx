import React from 'react';
import { computeNoteSegments } from './noteDiffUtils';
import { DiffSegment } from './DiffSegment';
import './NoteDiffView.css';

/**
 * NoteDiffView renders a unified single-panel diff view for medical notes.
 * The base text represents the latest version; diffs describe how it changed.
 */
export function NoteDiffView({ baseText, diffs = [], showDiff }) {
  if (!showDiff) {
    return (
      <div className="note-diff-view" aria-live="polite">
        {baseText}
      </div>
    );
  }

  const segments = computeNoteSegments(baseText, diffs);

  return (
    <div className="note-diff-view" aria-live="polite">
      {segments.map((segment, index) => {
        if (segment.kind === 'text') {
          return (
            <React.Fragment key={`text-${index}`}>
              {segment.text}
            </React.Fragment>
          );
        }

        return (
          <DiffSegment
            key={segment.diff.id}
            {...segment.diff}
            displayText={segment.text}
          />
        );
      })}
    </div>
  );
}

export default NoteDiffView;

