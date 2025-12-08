import { ProblemFilter } from './ProblemFilter';

export function FilterBar({ problems, filterState, setFilterState, onProblemSelect }) {
  return (
    <div className="flex flex-col gap-[12px] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-[12px]">
        <button
          type="button"
          className="text-[14px] font-medium leading-[20px] text-[#4A73FF]"
        >
          All filters
        </button>

        <div className="flex flex-wrap items-center gap-[12px]">
          <ProblemFilter
            problems={problems}
            filterState={filterState}
            setFilterState={setFilterState}
            onSelect={onProblemSelect}
          />
          <button
            type="button"
            className="inline-flex items-center gap-[8px] rounded-[8px] border border-[#E4E4E7] px-[12px] py-[8px] text-[14px] font-medium leading-[20px] text-[#1A1A1A]"
          >
            Filter by data sources
          </button>
        </div>
      </div>

      <span className="text-[12px] font-medium leading-[16px] text-[#6F6F6F]">Updated 6h ago</span>
    </div>
  );
}

