import type { FC } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { VERIFIED_PORTFOLIO_DATA } from '../../data/portfolioData';
import { ProjectShowcase } from './ProjectShowcase';

interface ProjectsSectionProps {
  onNavigateSection: (id: string) => void;
}

export const ProjectsSection: FC<ProjectsSectionProps> = ({ onNavigateSection }) => {
  const { projects } = VERIFIED_PORTFOLIO_DATA;

  return (
    <section 
      id="projects" 
      className="relative z-20 py-28 sm:py-36 lg:py-44 px-6 sm:px-12 lg:px-16 bg-[#050508] border-t border-[#f5efe6]/10"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-28 gap-6">
          <div>
            <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-4">
              02 / SELECTED WORK
            </p>
            <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.06] text-[#FAF6F0]">
              Selected Projects
            </h2>
          </div>
          <p className="font-sans-body text-[16px] lg:text-[18px] text-[#b8afa2] max-w-md leading-[1.6]">
            Full-stack web, mobile, and AI/ML applications built to solve practical problems.
          </p>
        </div>

        {/* Alternating Editorial Project Spreads */}
        <div className="space-y-28 lg:space-y-36">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-12 border-t border-[#f5efe6]/15"
              >
                {/* Project Editorial Details */}
                <div
                  data-reveal
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* Project metadata */}
                  <div className="font-mono-tech flex items-center justify-between text-[10px] lg:text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                    <span>PROJECT {project.id}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display text-[38px] sm:text-[44px] lg:text-[52px] font-medium leading-[1.08] text-[#FAF6F0]">
                    {project.title}
                  </h3>

                  <p className="font-mono-tech text-[10px] lg:text-[11px] tracking-[2px] uppercase text-[#cfc4b6]">
                    {project.category}
                  </p>

                  <p className="font-sans-body text-[16px] lg:text-[18px] leading-[1.6] text-[#c2b8ab]">
                    {project.description}
                  </p>

                  {/* Honest Editable Status Indicator */}
                  <div className="font-mono-tech inline-block px-3.5 py-2 rounded-md bg-[#13110f] border border-[#d8b48a]/30 text-[10px] lg:text-[11px] tracking-[1px] text-[#e6c79c]">
                    {project.status}
                  </div>

                  {/* Technology List */}
                  <div className="font-mono-tech flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[10px] lg:text-[11px] uppercase tracking-[1.5px] text-[#dfd5c7]">
                    {project.tech.map((t, i) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d8b48a]" />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    {project.link && project.link.startsWith('http') ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans-body group inline-flex items-center gap-2.5 text-[11px] lg:text-[12px] font-semibold tracking-[0.14em] uppercase text-[#FAF6F0] hover:text-[#e6c79c] border-b border-[#FAF6F0]/40 hover:border-[#e6c79c] pb-1.5 transition-colors focus:outline-none focus:border-[#e6c79c]"
                      >
                        <span>Live Application</span>
                        <ArrowUpRight className="w-4 h-4 text-[#d8b48a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ) : (
                      <a
                        href={project.link}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigateSection('contact');
                        }}
                        className="font-sans-body inline-flex items-center gap-2.5 text-[11px] lg:text-[12px] font-semibold tracking-[0.14em] uppercase text-[#FAF6F0] hover:text-[#e6c79c] border-b border-[#FAF6F0]/40 pb-1.5 transition-colors focus:outline-none focus:border-[#e6c79c]"
                      >
                        <span>Inquire About Project</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Visual Canvas with Mask Reveal */}
                <div
                  data-reveal="mask"
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <ProjectShowcase project={project} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
