import type { FC } from 'react';
import { VERIFIED_PORTFOLIO_DATA } from '../../data/portfolioData';

export const JourneySection: FC = () => {
  const { journey } = VERIFIED_PORTFOLIO_DATA;

  return (
    <section 
      id="journey" 
      className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#050508] border-t border-[#f5efe6]/10"
    >
      <div className="max-w-[1360px] mx-auto">
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
              04 / JOURNEY
            </p>
            <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0] mb-6">
              Education &amp; Growth
            </h2>
            <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] leading-[1.6]">
              A transparent record of academic study and continuous self-directed software building.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12 border-l border-[#f5efe6]/15 pl-8 sm:pl-12">
            {journey.map((item, idx) => (
              <div key={idx} data-reveal className="relative space-y-3">
                <span className="absolute -left-[37px] sm:-left-[53px] top-2 w-2.5 h-2.5 rounded-full bg-[#e6c79c] ring-4 ring-[#050508]" />
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                    {item.period}
                  </span>
                  {item.isPlaceholder && (
                    <span className="font-mono-tech text-[10px] lg:text-[11px] px-2.5 py-0.5 rounded bg-[#181410] border border-[#d8b48a]/30 text-[#e6c79c]">
                      Editable Institution Placeholder
                    </span>
                  )}
                </div>
                <h3 className="font-display text-[34px] sm:text-[42px] font-medium text-[#FAF6F0]">
                  {item.title}
                </h3>
                <p className="font-mono-tech text-[11px] lg:text-[12px] uppercase tracking-[2px] text-[#cfc4b6]">
                  {item.institution}
                </p>
                <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] leading-[1.6] max-w-2xl pt-1">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
