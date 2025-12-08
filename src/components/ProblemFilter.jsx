import { useMemo } from 'react';

export function ProblemFilter({ problems = [], filterState, setFilterState, onSelect }) {
  const { selectedProblem, dropdownOpen } = filterState;

  const handleToggle = () => {
    setFilterState((prev) => ({ ...prev, dropdownOpen: !prev.dropdownOpen }));
  };

  const handleSelect = (problem) => {
    setFilterState({ selectedProblem: problem, dropdownOpen: false });
    if (onSelect) onSelect(problem);
  };

  const handleClear = (event) => {
    event.stopPropagation();
    setFilterState({ selectedProblem: null, dropdownOpen: false });
    if (onSelect) onSelect(null);
  };

  const label = useMemo(() => selectedProblem || 'Filter by problems', [selectedProblem]);

  const isChip = Boolean(selectedProblem);

  return (
    <div className="relative inline-flex">
      {isChip ? (
        <div className="flex items-center gap-[12px] rounded-[12px] bg-[#F4F6FF] px-[12px] py-[6px]">
          <button
            type="button"
            onClick={handleToggle}
            className="text-[14px] font-medium leading-[20px] text-[#2563EB]"
          >
            <span className="truncate">{label}</span>
          </button>
          <button
            type="button"
            aria-label="Clear problem filter"
            onClick={handleClear}
            className="flex h-[24px] w-[24px] items-center justify-center text-[16px] leading-none text-[#2563EB]"
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center gap-[8px] rounded-[8px] border border-[#D1D1D6] px-[12px] py-[6px] text-[14px] font-medium leading-[20px] text-[#1A1A1A]"
        >
          <span className="truncate">{label}</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[16px] w-[16px] text-[#6F6F6F]"
          >
            <path d="M4 6l4 4 4-4" stroke="#6F6F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {dropdownOpen ? (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-full min-w-[240px] rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <ul className="max-h-[320px] overflow-auto py-[4px]">
            {problems.map((problem) => (
              <li key={problem}>
                <button
                  type="button"
                  onClick={() => handleSelect(problem)}
                  className="flex w-full cursor-pointer items-center px-[12px] py-[12px] text-left text-[14px] font-medium leading-[20px] text-[#1A1A1A] hover:bg-[#F8F8F9]"
                  title={problem}
                >
                  <span className="truncate">{problem}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

