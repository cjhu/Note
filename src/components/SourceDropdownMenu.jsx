import { useEffect, useRef, useState } from 'react';

export function SourceDropdownMenu({ sources, onSelect, onClose }) {
  const menuRef = useRef(null);
  const [highlighted, setHighlighted] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlighted((prev) => (prev + 1) % sources.length);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlighted((prev) => (prev - 1 + sources.length) % sources.length);
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        const index = highlighted >= 0 ? highlighted : 0;
        onSelect(sources[index]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sources, highlighted, onClose, onSelect]);

  return (
    <div
      ref={menuRef}
      className="absolute left-0 top-[calc(100%+4px)] z-30 min-w-[280px] overflow-hidden rounded-[12px] bg-white shadow-lg"
      role="menu"
      tabIndex={-1}
    >
      <ul className="max-h-[320px] overflow-auto py-[12px]">
        {sources.map((source, index) => (
          <li key={source.id}>
            <button
              type="button"
              role="menuitem"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(source);
              }}
              className="flex w-full items-start justify-between px-[16px] py-[12px] text-left hover:bg-[#F8F8FB]"
            >
              <div className="flex flex-col gap-[2px]">
                <span className="text-[14px] font-medium leading-[20px] text-[#1A1A1A] truncate">
                  {source.title}
                </span>
                <span className="text-[12px] font-medium leading-[16px] text-[#6F6F6F] truncate">
                  {source.author}
                </span>
              </div>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-[2px] h-[16px] w-[16px]"
              >
                <path
                  d="M6.5 4H11v4.5M11 4 5 10"
                  stroke="#6F6F6F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

