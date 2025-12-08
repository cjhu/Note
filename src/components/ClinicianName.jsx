const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? first;
  const initials = `${first}${last || first}`.toUpperCase();
  return initials.length === 1 ? `${initials}${initials}` : initials;
};

export function ClinicianName({ name, align = 'right', hideOnDesktop = false, hideOnMobile = false }) {
  const initials = getInitials(name);

  return (
    <div
      className={[
        'flex items-center gap-[8px] text-[12px] font-medium leading-[16px] text-[#6F6F6F]',
        align === 'right' ? 'justify-end text-right' : '',
        hideOnDesktop ? 'lg:hidden' : '',
        hideOnMobile ? 'hidden lg:flex' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#E4E4E7] text-[12px] font-medium text-[#1A1A1A]">
        {initials}
      </div>
      <span>{name}</span>
    </div>
  );
}

