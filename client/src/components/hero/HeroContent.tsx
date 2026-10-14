import type { FC } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
  onNavigateSection: (id: string) => void;
}

export const HeroContent: FC<HeroContentProps> = ({ onNavigateSection }) => {
  return (
    <>
      {/* Hero main copy: left-aligned, cinematic */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 my-auto py-7 lg:py-5">
        <div className="max-w-[38rem]">
          {/* Welcome eyebrow line */}
          <div className="flex items-center gap-5 mb-4">
            <span
              className="grow-x block w-12 h-[1px] bg-[#d8b48a]/80"
              style={{ animationDelay: '0.6s' }}
            />
            <p
              className="font-mono-tech rise-in text-[11px] lg:text-[12px] font-normal tracking-[2.5px] uppercase text-[#e8dfd3]/95"
              style={{ animationDelay: '0.7s' }}
            >
              Welcome to my portfolio
            </p>
          </div>

          {/* Name — ADITYA SINHA: Cormorant Garamond */}
          <h1
            className="font-display uppercase leading-[0.88] tracking-[-0.01em] mb-5 select-text"
            style={{ fontSize: 'clamp(4.25rem, 7.8vw, 8rem)', fontWeight: 500 }}
          >
            <span className="mask-line">
              <span
                className="text-[#FAF6F0] drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)]"
                style={{ animationDelay: '0.9s' }}
              >
                ADITYA
              </span>
            </span>
            <span className="mask-line">
              <span
                className="text-[#E6C79C] drop-shadow-[0_6px_34px_rgba(0,0,0,0.8)]"
                style={{ animationDelay: '1.1s' }}
              >
                SINHA
              </span>
            </span>
          </h1>

          {/* Role: IBM Plex Mono */}
          <p
            className="font-mono-tech rise-in text-[11px] lg:text-[12px] font-normal uppercase tracking-[2.5px] text-[#e4dbd0]/95 leading-[1.7] mb-5"
            style={{ animationDelay: '1.4s' }}
          >
            <span className="block">Computer Science Engineering Student</span>
            <span className="block">Full-Stack Developer · AI/ML Enthusiast</span>
          </p>

          {/* Supporting sentence: DM Sans */}
          <p
            className="font-sans-body rise-in text-[16px] lg:text-[18px] font-normal leading-[1.6] text-[#f5efe6]/90 max-w-[26rem] mb-8"
            style={{ animationDelay: '1.6s' }}
          >
            Building practical digital experiences through code.
          </p>

          {/* Actions: DM Sans */}
          <div
            className="rise-in flex flex-wrap items-center gap-4 sm:gap-5"
            style={{ animationDelay: '1.8s' }}
          >
            <button
              onClick={() => onNavigateSection('projects')}
              className="font-sans-body btn-heavy group inline-flex items-center gap-3 px-7 sm:px-8 py-4 rounded-full bg-[#F7F1E5] text-[#09090c] text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-[#ecd9bf] shadow-[0_0_44px_rgba(247,241,229,0.18)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            >
              <span>Explore my work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
            </button>

            <button
              onClick={() => onNavigateSection('contact')}
              className="font-sans-body btn-heavy inline-flex items-center justify-center px-7 sm:px-8 py-4 rounded-full border border-[#f5efe6]/40 bg-[#08080c]/40 backdrop-blur-sm text-[#f5efe6] text-[11px] sm:text-[12px] font-semibold tracking-[0.12em] uppercase hover:border-[#e6c79c] hover:text-[#e6c79c] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Hero footer: scroll cue left, Jupiter caption right */}
      <div className="relative z-20 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 pb-9 pt-4 flex items-end justify-between">
        <button
          onClick={() => onNavigateSection('about')}
          className="rise-in group flex items-end gap-5 text-left cursor-pointer focus:outline-none"
          style={{ animationDelay: '2.3s' }}
          aria-label="Scroll to About section"
        >
          <div className="flex flex-col items-center">
            <span className="relative block w-[1px] h-16 overflow-hidden bg-[#f5efe6]/25">
              <span className="scroll-dot absolute left-0 top-0 block w-full h-6 bg-[#f5efe6]" />
            </span>
            <span className="w-2 h-2 rounded-full bg-[#f5efe6] group-hover:scale-150 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </div>
          <span className="font-mono-tech text-[11px] font-normal tracking-[2.5px] uppercase text-[#e4dbd0]/85 group-hover:text-[#f5efe6] transition-colors duration-700 pb-0.5">
            Scroll to explore
          </span>
        </button>

        <div className="rise-in hidden md:block pb-1" style={{ animationDelay: '2.5s' }}>
          <span className="block w-12 h-[1px] bg-[#f5efe6]/60 mb-4" />
          <p className="font-mono-tech text-[11px] font-medium tracking-[2.5px] uppercase on-planet text-white">Jupiter</p>
          <p className="font-mono-tech mt-1.5 text-[10px] font-normal tracking-[2px] uppercase on-planet text-[#f5efe6]/85">A giant of persistence</p>
          <p className="font-mono-tech mt-1 text-[10px] font-normal tracking-[2px] uppercase on-planet text-[#f5efe6]/85">A reminder to keep building</p>
        </div>
      </div>
    </>
  );
};
