import { useState } from 'react';
import { RadiologyIcon } from '../icons/RadiologyIcon';
import { DxListIcon } from '../icons/DxListIcon';
import { DateLabel } from './DateLabel';
import { ClinicianName } from './ClinicianName';
import { TimelineRule } from './TimelineRule';
import { SourceChip } from './SourceChip';
import { SourceDropdownMenu } from './SourceDropdownMenu';
import { SourceModal } from './SourceModal';

export function EncounterRow({ date, title, clinician, sources = [], items = [] }) {
  const clinicianName = typeof clinician === 'string' ? clinician : clinician?.name;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSource, setActiveSource] = useState(null);

  const getEncounterIcon = () => {
    const lower = (title || '').toLowerCase();
    const imagingKeywords = ['ct', 'mri', 'ultrasound', 'x-ray', 'xray', 'radiology', 'imaging'];
    if (imagingKeywords.some((k) => lower.includes(k))) {
      return <RadiologyIcon className="w-4 h-4 text-[#4A73FF]" />;
    }
    return <DxListIcon className="w-4 h-4 text-[#4A73FF]" />;
  };

  const handleChipClick = () => {
    if (!sources?.length) return;
    if (sources.length === 1) {
      // Defer to next tick to avoid any stale event interactions
      setTimeout(() => setActiveSource({ ...sources[0] }), 0);
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleSelectSource = (source) => {
    setIsMenuOpen(false);
    // Defer to next tick to avoid conflicts with menu teardown
    setTimeout(() => setActiveSource({ ...source }), 0);
  };

  const handleCloseModal = () => {
    setActiveSource(null);
  };

  return (
    <article className="relative grid gap-[12px] lg:grid-cols-[96px_1fr] lg:gap-[16px]">
      <div className="relative hidden justify-end pr-[8px] lg:flex">
        <TimelineRule />
        <DateLabel date={date} />
      </div>

      <div className="flex flex-col gap-[12px] lg:gap-[16px]">
        <div className="flex flex-col gap-[8px] lg:gap-[12px]">
          <div className="lg:hidden">
            <DateLabel date={date} />
          </div>

          {/* Mobile layout */}
          <div className="flex w-full flex-col gap-[4px] lg:hidden">
            <div className="flex items-start">
              <div className="flex items-center gap-[6px]">
                {getEncounterIcon()}
                <p className="text-[16px] font-medium leading-[20px] text-[#1A1A1A]">{title}</p>
              </div>
              {clinicianName ? (
                <div className="ml-auto">
                  <ClinicianName name={clinicianName} />
                </div>
              ) : null}
            </div>
            {sources.length > 0 ? (
              <div className="mt-[4px] relative w-full md:mt-0 md:w-auto md:ml-[8px]">
                <SourceChip count={sources.length} onClick={handleChipClick} />
                {isMenuOpen && sources.length > 1 ? (
                  <SourceDropdownMenu
                    sources={sources}
                    onSelect={handleSelectSource}
                    onClose={() => setIsMenuOpen(false)}
                  />
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Desktop layout */}
          <div className="hidden w-full items-center lg:flex">
            <div className="flex items-center gap-[6px]">
              {getEncounterIcon()}
              <p className="text-[16px] font-medium leading-[20px] text-[#1A1A1A]">{title}</p>
            </div>
            {sources.length > 0 ? (
              <div className="relative ml-[8px]">
                <SourceChip count={sources.length} onClick={handleChipClick} />
                {isMenuOpen && sources.length > 1 ? (
                  <SourceDropdownMenu
                    sources={sources}
                    onSelect={handleSelectSource}
                    onClose={() => setIsMenuOpen(false)}
                  />
                ) : null}
              </div>
            ) : (
              <div className="ml-[8px]" />
            )}
            {clinicianName ? (
              <div className="ml-auto flex items-center gap-[6px]">
                <ClinicianName name={clinicianName} />
              </div>
            ) : null}
          </div>
        </div>

        {items.length > 0 ? (
          <ul className="list-disc space-y-[8px] pl-[16px] text-[14px] font-normal leading-[20px] text-[#1A1A1A]">
            {items.map((item, index) => (
              <li key={`${date}-${index}`}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
      {activeSource ? (
        <SourceModal source={activeSource} onClose={handleCloseModal} />
      ) : null}
    </article>
  );
}

