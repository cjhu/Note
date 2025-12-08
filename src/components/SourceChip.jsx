export function SourceChip({ count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center rounded-[8px] bg-[#F4F6FF] px-[10px] py-[4px] text-[12px] font-medium leading-[16px] text-[#2563EB] cursor-pointer"
    >
      {count} source{count === 1 ? '' : 's'}
    </button>
  );
}

