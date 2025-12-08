import React, { useState, useMemo } from 'react';
import { computeNoteSegments } from './noteDiffUtils';
import './NoteDiffView.css';

const TYPE_META = {
  add: { label: 'Addition', className: 'side-marker-add' },
  replace: { label: 'Change', className: 'side-marker-replace' },
  delete: { label: 'Removal', className: 'side-marker-delete' },
};

/**
 * Side-marker variant: shows latest text; markers sit in a gutter and inline anchors.
 * Hover/focus marker -> highlight text span and show tooltip; deletions surface inline ghost text.
 */
export function NoteDiffSideView({ baseText, diffs = [] }) {
  const [activeId, setActiveId] = useState(null);

  const segments = useMemo(() => computeNoteSegments(baseText, diffs), [baseText, diffs]);

  const handleEnter = (id) => setActiveId(id);
  const handleLeave = () => setActiveId(null);

  return (
    <div className="note-diff-side-layout">
      <div className="note-diff-side-text" aria-live="polite">
        {segments.map((seg, idx) => {
          if (seg.kind === 'text') {
            return <React.Fragment key={`text-${idx}`}>{seg.text}</React.Fragment>;
          }
          const isActive = seg.diff.id === activeId;
          const meta = TYPE_META[seg.diff.type] || TYPE_META.replace;
          const showGhost = isActive && seg.diff.type === 'delete';
          return (
            <span
              key={seg.diff.id}
              className="side-diff-span-wrapper"
            >
              <span
                className={`inline-anchor ${meta.className}`}
                aria-hidden="true"
              />
              <span
                className={`side-diff-span ${isActive ? 'side-diff-span-active' : ''}`}
              >
                {seg.text}
                {showGhost && (
                  <span className="side-diff-ghost-delete">{seg.diff.oldText}</span>
                )}
              </span>
            </span>
          );
        })}
      </div>

      <div className="note-diff-side-gutter" aria-label="Change markers">
        {diffs.map((diff) => {
          const meta = TYPE_META[diff.type] || TYPE_META.replace;
          const isActive = activeId === diff.id;
          return (
            <div
              key={diff.id}
              className={`side-marker ${meta.className} ${isActive ? 'side-marker-active' : ''}`}
              role="button"
              tabIndex={0}
              onMouseEnter={() => handleEnter(diff.id)}
              onMouseLeave={handleLeave}
              onFocus={() => handleEnter(diff.id)}
              onBlur={handleLeave}
              aria-label={`${meta.label}: ${diff.type === 'delete' ? diff.oldText : diff.newText}`}
            >
              <div className="side-marker-dot" />
              {isActive && (
                <div className="side-marker-tooltip" role="tooltip">
                  <div className="diff-tooltip-title">{meta.label}</div>
                  {diff.type === 'add' && (
                    <div className="diff-tooltip-body">{diff.newText}</div>
                  )}
                  {diff.type === 'delete' && (
                    <div className="diff-tooltip-body">{diff.oldText}</div>
                  )}
                  {diff.type === 'replace' && (
                    <div className="diff-tooltip-body">
                      <div className="diff-tooltip-row"><strong>Old:</strong> {diff.oldText}</div>
                      <div className="diff-tooltip-row"><strong>New:</strong> {diff.newText}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NoteDiffSideView;

