import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export function SourceModal({ source, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const focusable = modalRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  if (!source || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.35)] px-[16px]"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative max-h-[80vh] w-full max-w-[720px] overflow-auto rounded-[12px] bg-white p-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <h2 className="text-[18px] font-medium leading-[24px] text-[#1A1A1A]">{source.title}</h2>
            <p className="text-[13px] font-medium leading-[18px] text-[#6F6F6F]">{source.author}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[14px] font-medium leading-[18px] text-[#6F6F6F]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-[12px] whitespace-pre-wrap text-[14px] font-normal leading-[20px] text-[#1A1A1A]">
          {source.content}
        </div>

        <div className="mt-[16px] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] bg-[#4A73FF] px-[12px] py-[8px] text-[14px] font-medium leading-[20px] text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

