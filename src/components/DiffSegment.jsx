import React, { useEffect, useRef, useState } from 'react';
import { DiffTooltip } from './DiffTooltip';
import { DeletedPlaceholder } from './DeletedPlaceholder';

const LABELS = {
  add: 'Added text',
  delete: 'Removed text',
  replace: 'Changed text',
};

export function DiffSegment({
  id,
  type,
  oldText = '',
  newText = '',
  displayText = '',
}) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const delayRef = useRef(null);

  const tooltipId = `diff-tooltip-${id}`;

  const clearDelay = () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
  };

  const openWithDelay = () => {
    clearDelay();
    delayRef.current = setTimeout(() => setOpen(true), 150);
  };

  const closeTooltip = () => {
    clearDelay();
    setOpen(false);
  };

  useEffect(() => {
    return () => clearDelay();
  }, []);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    openWithDelay();
  };

  const handleMouseLeave = () => {
    closeTooltip();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
    }
    if (event.key === 'Escape') {
      closeTooltip();
    }
  };

  const handleBlur = () => {
    closeTooltip();
  };

  const renderContent = () => {
    if (type === 'delete') {
      return <DeletedPlaceholder />;
    }

    const textToShow = displayText || newText;
    const className = type === 'replace' ? 'diff-replace' : 'diff-add';

    return (
      <span className={className}>
        {textToShow}
      </span>
    );
  };

  const renderTooltipContent = () => {
    if (type === 'add') {
      return (
        <>
          <div className="diff-tooltip-title">Added text</div>
          <div className="diff-tooltip-body">{newText}</div>
        </>
      );
    }

    if (type === 'delete') {
      return (
        <>
          <div className="diff-tooltip-title">Removed text</div>
          <div className="diff-tooltip-body">{oldText}</div>
        </>
      );
    }

    return (
      <>
        <div className="diff-tooltip-title">Changed</div>
        <div className="diff-tooltip-body">
          <div className="diff-tooltip-row"><strong>Old:</strong> {oldText}</div>
          <div className="diff-tooltip-row"><strong>New:</strong> {newText}</div>
        </div>
      </>
    );
  };

  const ariaLabel = (() => {
    if (type === 'add') return `${LABELS.add}: ${newText}`;
    if (type === 'delete') return `${LABELS.delete}: ${oldText}`;
    return `${LABELS.replace}: ${oldText} -> ${newText}`;
  })();

  return (
    <>
      <span
        ref={anchorRef}
        className="diff-marker"
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-haspopup="true"
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        data-id={id}
        data-diff-type={type}
      >
        {renderContent()}
      </span>
      <DiffTooltip
        id={tooltipId}
        anchorRef={anchorRef}
        isOpen={open}
        onRequestClose={closeTooltip}
      >
        {renderTooltipContent()}
      </DiffTooltip>
    </>
  );
}

export default DiffSegment;

