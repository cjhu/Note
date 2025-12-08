import React, { useState, useMemo } from 'react';
import { computeNoteSegments } from './noteDiffUtils';
import './NoteDiffView.css';

const TYPE_META = {
  add: { label: 'Addition', className: 'side-marker-add' },
  replace: { label: 'Change', className: 'side-marker-replace' },
  delete: { label: 'Removal', className: 'side-marker-delete' },
};

/**
 * Side-marker variant: shows latest text; markers are positioned in a gutter near their edit.
 * Hover/focus marker -> highlight span and (for deletions) show inline ghost text; otherwise latest text stays clean.
 */
export function NoteDiffSideView({ baseText, diffs = [] }) {
  const [activeId, setActiveId] = useState(null);
  const totalLen = baseText.length || 1;

  const segments = useMemo(() => computeNoteSegments(baseText, diffs), [baseText, diffs]);

  const handleEnter = (id) => setActiveId(id);
  const handleLeave = () => setActiveId(null);

  const positionedDiffs = diffs.map((d) => ({
    ...d,
    top: `${Math.min(98, Math.max(2, (d.startIndex / totalLen) * 100))}%`,
  }));

  return (
    <div className="note-diff-side-layout">
      <div className="note-diff-side-text" aria-live="polite">
        {segments.map((seg, idx) => {
          if (seg.kind === 'text') {
            return <React.Fragment key={`text-${idx}`}>{seg.text}</React.Fragment>;
          }
          const isActive = seg.diff.id === activeId;
          const showGhost = isActive && seg.diff.type === 'delete';
          return (
            <span
              key={seg.diff.id}
              className="side-diff-span-wrapper"
            >
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
        {positionedDiffs.map((diff) => {
          const meta = TYPE_META[diff.type] || TYPE_META.replace;
          const isActive = activeId === diff.id;
          return (
            <div
              key={diff.id}
              className={`side-marker side-marker-absolute ${meta.className} ${isActive ? 'side-marker-active' : ''}`}
              role="button"
              tabIndex={0}
              style={{ top: diff.top }}
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

