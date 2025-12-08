const formatDate = (date) => {
  const dateObj = new Date(`${date}T00:00:00`);
  return {
    month: dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: dateObj.toLocaleDateString('en-US', { day: 'numeric' }),
    year: dateObj.toLocaleDateString('en-US', { year: 'numeric' }),
    mobile: dateObj
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase(),
  };
};

export function DateLabel({ date }) {
  const parts = formatDate(date);

  return (
    <div className="flex">
      <div className="flex text-[13px] font-medium leading-[16px] text-[#1A1A1A] lg:hidden">
        {parts.mobile}
      </div>

      <div className="hidden flex-col items-end gap-[4px] leading-[16px] lg:flex">
        <span className="text-[12px] font-medium uppercase text-[#6F6F6F]">{parts.month}</span>
        <span className="text-[16px] font-medium leading-[20px] text-[#1A1A1A]">{parts.day}</span>
        <span className="text-[12px] font-medium leading-[16px] text-[#6F6F6F]">{parts.year}</span>
      </div>
    </div>
  );
}

