import type { FC } from 'react';
import { VERIFIED_PORTFOLIO_DATA } from '../../data/portfolioData';

export const SkillsSection: FC = () => {
  const { skills } = VERIFIED_PORTFOLIO_DATA;

  return (
    <section 
      id="skills" 
      className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#07070a] border-t border-[#f5efe6]/10"
    >
      <div className="max-w-[1360px] mx-auto">
        <div data-reveal className="mb-20">
          <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
            03 / TECHNICAL CAPABILITIES
          </p>
          <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0] max-w-3xl">
            Languages, Frameworks &amp; Engineering Tools
          </h2>
        </div>

        <div className="divide-y divide-[#f5efe6]/15 border-t border-b border-[#f5efe6]/15">
          {skills.map((group, idx) => (
            <div
              key={idx}
              data-reveal
              className="py-12 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4">
                <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-[34px] sm:text-[40px] font-medium text-[#FAF6F0]">
                  {group.category}
                </h3>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-8">
                {group.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="font-sans-body text-[16px] lg:text-[18px] leading-[1.6] text-[#e4dbd0] flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d8b48a]/80 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
