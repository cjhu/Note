import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function DiffTooltip({ id, anchorRef, isOpen, onRequestClose, children }) {
  const portalRef = useRef(null);
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [ready, setReady] = useState(false);

  // Create portal container once
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const portalEl = document.createElement('div');
    portalEl.className = 'diff-tooltip-portal';
    portalRef.current = portalEl;
    document.body.appendChild(portalEl);
    return () => {
      document.body.removeChild(portalEl);
      portalRef.current = null;
    };
  }, []);

  // Close on outside click/tap
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleOutside = (event) => {
      if (!anchorRef.current || !tooltipRef.current) return;
      if (anchorRef.current.contains(event.target)) return;
      if (tooltipRef.current.contains(event.target)) return;
      onRequestClose?.();
    };
    document.addEventListener('mousedown', handleOutside, true);
    document.addEventListener('touchstart', handleOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleOutside, true);
      document.removeEventListener('touchstart', handleOutside, true);
    };
  }, [isOpen, onRequestClose, anchorRef]);

  // Reposition on scroll/resize when open
  useEffect(() => {
    if (!isOpen) return undefined;
    const handle = () => updatePosition();
    window.addEventListener('scroll', handle, true);
    window.addEventListener('resize', handle, true);
    return () => {
      window.removeEventListener('scroll', handle, true);
      window.removeEventListener('resize', handle, true);
    };
  }, [isOpen]);

  const updatePosition = () => {
    if (!isOpen || !anchorRef.current || !tooltipRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const margin = 8;
    const viewportHeight = window.innerHeight;
    const prefersAbove = anchorRect.top >= tooltipRect.height + margin;
    const fitsBelow = anchorRect.bottom + tooltipRect.height + margin <= viewportHeight;
    const placeAbove = prefersAbove || !fitsBelow;

    const top = placeAbove
      ? anchorRect.top - tooltipRect.height - margin
      : anchorRect.bottom + margin;

    let left = anchorRect.left + (anchorRect.width / 2) - (tooltipRect.width / 2);
    const maxLeft = window.innerWidth - tooltipRect.width - 8;
    left = Math.max(8, Math.min(left, maxLeft));

    setPosition({
      top: top + window.scrollY,
      left: left + window.scrollX,
    });
    setReady(true);
  };

  useLayoutEffect(() => {
    if (isOpen) {
      requestAnimationFrame(updatePosition);
    } else {
      setReady(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, children]);

  if (!isOpen || !portalRef.current) return null;

  return createPortal(
    <div
      id={id}
      ref={tooltipRef}
      className="diff-tooltip"
      role="tooltip"
      style={{
        top: position.top,
        left: position.left,
        visibility: ready ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    portalRef.current,
  );
}

export default DiffTooltip;

