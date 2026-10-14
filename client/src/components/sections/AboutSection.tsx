import type { FC } from 'react';
import { VERIFIED_PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: FC = () => {
  const { about } = VERIFIED_PORTFOLIO_DATA;

  return (
    <section 
      id="about" 
      className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#07070a] border-t border-[#f5efe6]/10"
    >
      <div className="max-w-[1360px] mx-auto">
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Section Label & Number */}
          <div className="lg:col-span-4">
            <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
              01 / ABOUT
            </p>
            <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.08] text-[#FAF6F0]">
              {about.heading}
            </h2>
          </div>

          {/* Main Editorial Copy */}
          <div className="lg:col-span-8 lg:pl-8 space-y-8">
            <p className="font-display font-normal text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.3] text-[#e8dfd3]">
              {about.lead}
            </p>

            <div className="font-sans-body grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 text-[16px] lg:text-[18px] leading-[1.6] text-[#c9bfb2]">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Three Pillars of Practice */}
            <div className="pt-10 border-t border-[#f5efe6]/15 grid grid-cols-1 md:grid-cols-3 gap-8">
              {about.focusAreas.map((area, idx) => (
                <div key={idx} className="space-y-3">
                  <span className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                    0{idx + 1}
                  </span>
                  <h3 className="font-display text-[28px] font-medium text-[#f5efe6]">
                    {area.title}
                  </h3>
                  <p className="font-sans-body text-[16px] leading-[1.6] text-[#b8afa2]">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
