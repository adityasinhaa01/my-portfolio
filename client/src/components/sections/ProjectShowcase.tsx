import { useState, useEffect, type FC } from 'react';
import { 
  Home, 
  MapPin, 
  FileText, 
  Users, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Laptop, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import type { Project, ProjectImage } from '../../data/portfolioData';

interface ProjectShowcaseProps {
  project: Project;
}

export const ProjectShowcase: FC<ProjectShowcaseProps> = ({ project }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const images = project.images && project.images.length > 0 
    ? project.images 
    : project.image 
      ? [{ title: project.title, url: project.image, caption: project.description }] 
      : [];

  const isMobileProject = project.id === '01';

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setActiveTab((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setActiveTab((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, images.length]);

  const currentImage: ProjectImage | undefined = images[activeTab] || images[0];

  const tabIcons = [
    <Home key="home" className="w-3.5 h-3.5" />,
    <MapPin key="map" className="w-3.5 h-3.5" />,
    <FileText key="reports" className="w-3.5 h-3.5" />,
    <Users key="community" className="w-3.5 h-3.5" />
  ];

  return (
    <>
      {isMobileProject ? (
        /* =========================================================================
           NAGAR SUDHAR: Mobile App Device Showcase with 4 Interactive Tabs
           ========================================================================= */
        <div className="relative w-full rounded-xl border border-[#f5efe6]/15 bg-gradient-to-b from-[#131218] via-[#0b0a0e] to-[#060608] p-5 sm:p-7 shadow-2xl overflow-hidden">
          {/* Ambient decorative glow */}
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d8b48a]/10 blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#00a896]/10 blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          {/* Top Control Bar: App Identity + Tab Selectors */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#f5efe6]/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#1a1820] border border-[#d8b48a]/30 flex items-center justify-center text-[#d8b48a]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[2px] text-[#d8b48a]">
                    Mobile UI Prototype
                  </span>
                  <span className="text-[11px] text-[#8e8579] ml-2 hidden sm:inline">
                    (4 Live Views)
                  </span>
                </div>
              </div>
              <a
                href="https://nagar-sudhar.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#16151e] hover:bg-[#221f2d] border border-[#d8b48a]/40 text-[#FAF6F0] text-[10px] tracking-[1px] uppercase transition-colors"
                title="Open Nagar Sudhar on Vercel"
              >
                <span>Live App</span>
                <ExternalLink className="w-3 h-3 text-[#d8b48a]" />
              </a>
            </div>

            {/* Interactive Tab Switcher Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-[#08080b] border border-[#f5efe6]/10">
              {images.map((img, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={img.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`font-mono-tech flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] tracking-[1px] uppercase transition-all duration-200 ${
                      isActive
                        ? 'bg-[#d8b48a] text-[#050508] font-semibold shadow-md'
                        : 'text-[#a3988a] hover:text-[#FAF6F0] hover:bg-[#1a1822]'
                    }`}
                  >
                    {tabIcons[idx % tabIcons.length]}
                    <span>{img.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Visual Arena: Phone Device Mockup & Dynamic Caption */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-6">
            {/* Phone Frame */}
            <div className="md:col-span-7 flex justify-center">
              <div 
                className="group relative cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                title="Click to expand full resolution image"
              >
                {/* Smartphone Chassis */}
                <div className="relative w-[220px] sm:w-[250px] rounded-[36px] p-2.5 bg-[#1d1b22] border-[3px] border-[#383340] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(216,180,138,0.15)] transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Speaker & Sensor Notch Bar */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a0a0d] rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1c1a24] mr-2" />
                    <div className="w-8 h-1 rounded-full bg-[#1c1a24]" />
                  </div>

                  {/* Screen Glass */}
                  <div className="relative w-full aspect-[9/20.4] rounded-[28px] overflow-hidden bg-[#000000]">
                    {currentImage && (
                      <img
                        key={currentImage.url}
                        src={currentImage.url}
                        alt={`Nagar Sudhar - ${currentImage.title}`}
                        className="w-full h-full object-cover object-top transition-opacity duration-300 animate-fadeIn"
                        loading="lazy"
                      />
                    )}

                    {/* Hover Overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#d8b48a] text-[#050508] flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                      <span className="font-mono-tech text-[10px] tracking-[1.5px] uppercase font-medium bg-black/70 px-2.5 py-1 rounded">
                        View Full Screen
                      </span>
                    </div>
                  </div>

                  {/* Bottom Home Indicator Line */}
                  <div className="w-20 h-1 rounded-full bg-[#524b5c] mx-auto mt-2 mb-0.5" />
                </div>
              </div>
            </div>

            {/* Tab Context & Thumbnail Strip */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="font-mono-tech flex items-center gap-2 text-[10px] tracking-[2px] uppercase text-[#d8b48a]">
                  <span>TAB {String(activeTab + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
                  <span>·</span>
                  <span>{currentImage?.title}</span>
                </div>
                <h4 className="font-display text-[22px] sm:text-[26px] font-medium text-[#FAF6F0] leading-tight">
                  {currentImage?.title === 'Home' && 'Citizen Impact & Instant Reporting'}
                  {currentImage?.title === 'Live Map' && 'Interactive Geospatial Civic Map'}
                  {currentImage?.title === 'Civic Reports' && 'Crowdsourced Issues Feed & Upvoting'}
                  {currentImage?.title === 'Community' && 'Gamified Trust Index & Leaderboard'}
                </h4>
                <p className="font-sans-body text-[13px] text-[#b8afa2] leading-relaxed">
                  {currentImage?.caption}
                </p>
              </div>

              {/* All 4 Tab Thumbnails for direct switching */}
              <div className="space-y-2 pt-2 border-t border-[#f5efe6]/10">
                <span className="font-mono-tech text-[9px] tracking-[1.5px] uppercase text-[#8e8579]">
                  Switch View:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => {
                    const isActive = activeTab === idx;
                    return (
                      <button
                        key={img.title}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`group relative rounded-lg overflow-hidden border transition-all duration-200 text-left ${
                          isActive 
                            ? 'border-[#d8b48a] ring-2 ring-[#d8b48a]/30 scale-105' 
                            : 'border-[#f5efe6]/15 hover:border-[#d8b48a]/50 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[9/16] w-full bg-[#0d0d12] overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="p-1 bg-[#121118] text-center">
                          <span className="font-mono-tech text-[8px] tracking-[0.5px] block truncate text-[#cfc4b6]">
                            {img.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Click to expand prompt */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="font-mono-tech flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#15141c] hover:bg-[#1f1d2a] border border-[#d8b48a]/20 text-[#d8b48a] text-[11px] tracking-[1px] transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand All 4 Views in HD</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================================
           WEB APPLICATIONS: Desktop Web Console / Terminal Window Showcase
           ========================================================================= */
        (() => {
          const isAetherPaste = project.id === '03';
          const displayHost = project.link.replace(/^https?:\/\//, '').replace(/\/$/, '');
          const consoleBadge = isAetherPaste ? 'REST API ACTIVE' : 'MERN LIVE';
          const consoleTitle = isAetherPaste ? 'SNIPPET VAULT CONSOLE' : 'WEB APPLICATION CONSOLE';
          const consoleEngine = isAetherPaste ? 'ENGINE: TEXT ENCAPSULATION' : 'ENGINE: URL ENCAPSULATION';
          const glowColor = isAetherPaste ? 'bg-[#9333ea]/15' : 'bg-[#0070f3]/10';

          return (
            <div className="relative w-full rounded-xl border border-[#f5efe6]/15 bg-gradient-to-b from-[#131218] via-[#0c0c10] to-[#060608] shadow-2xl overflow-hidden group">
              {/* Ambient decorative glow */}
              <div 
                className={`absolute -top-20 -left-20 w-80 h-80 rounded-full ${glowColor} blur-3xl pointer-events-none`} 
                aria-hidden="true" 
              />

              {/* Browser Chrome Header */}
              <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-[#0d0d12] border-b border-[#f5efe6]/10">
                {/* Traffic Light Window Dots */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f87171]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]/80 inline-block" />
                  <div className="h-3 w-[1px] bg-[#f5efe6]/10 mx-1 hidden sm:block" />
                  <div className="hidden sm:flex items-center gap-1.5 text-[#8e8579] font-mono-tech text-[10px]">
                    <Laptop className="w-3.5 h-3.5 text-[#d8b48a]" />
                    <span className="tracking-[1px] uppercase">{consoleTitle}</span>
                  </div>
                </div>

                {/* Live Address Pill */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#16151e] hover:bg-[#201e2c] border border-[#f5efe6]/15 hover:border-[#34d399]/40 font-mono-tech text-[10px] text-[#cfc4b6] tracking-[1px] transition-colors"
                  title={`Open ${project.title} live application`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                  <span className="text-[#8e8579]">https://</span>
                  <span className="text-[#e6c79c] font-medium">{displayHost}</span>
                  <ExternalLink className="w-3 h-3 text-[#34d399] ml-0.5" />
                </a>

                {/* Quick Status Badge */}
                <div className="hidden sm:flex items-center gap-1.5 font-mono-tech text-[10px] text-[#34d399] tracking-[1px]">
                  <span className="px-2 py-0.5 rounded bg-[#34d399]/10 border border-[#34d399]/20">
                    {consoleBadge}
                  </span>
                </div>
              </div>

              {/* Screenshot Display Frame */}
              <div 
                className="relative cursor-pointer overflow-hidden bg-[#07070a]"
                onClick={() => setLightboxOpen(true)}
                title="Click to expand high resolution console"
              >
                {currentImage && (
                  <img
                    src={currentImage.url}
                    alt={`${project.title} - ${currentImage.title}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                )}

                {/* Subtle Gradient vignette on borders */}
                <div className="absolute inset-0 pointer-events-none border border-inner border-[#f5efe6]/5 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />

                {/* Hover overlay prompt */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#050508]/90 border border-[#d8b48a]/40 text-[#FAF6F0] font-mono-tech text-[11px] tracking-[1.5px] uppercase shadow-2xl backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4 text-[#d8b48a]" />
                    <span>View Full Screen Console</span>
                  </div>
                </div>
              </div>

              {/* Bottom Console Info Bar */}
              <div className="relative z-10 px-4 py-3 bg-[#0d0d12] border-t border-[#f5efe6]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#8e8579] font-mono-tech text-[10px] tracking-[1px]">
                <div className="flex items-center gap-3">
                  <span className="text-[#d8b48a] font-medium">&gt;&gt; STACK:</span>
                  <span className="text-[#cfc4b6]">{project.tech.join(' · ')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#a3988a]">{consoleEngine}</span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d8b48a] hover:text-[#FAF6F0] flex items-center gap-1 transition-colors"
                  >
                    <span>VISIT LIVE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* =========================================================================
         LIGHTBOX MODAL: High-Res Interactive View for Recruiter / Visitor Inspection
         ========================================================================= */}
      {lightboxOpen && currentImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.title}
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#0e0d14] rounded-2xl border border-[#d8b48a]/30 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f5efe6]/10 bg-[#09080e]">
              <div>
                <p className="font-mono-tech text-[10px] tracking-[2px] uppercase text-[#d8b48a]">
                  {project.title} · {isMobileProject ? `Tab ${activeTab + 1} of ${images.length}` : 'Web Console'}
                </p>
                <h3 className="font-display text-[22px] font-medium text-[#FAF6F0]">
                  {currentImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-[#1b1924] hover:bg-[#282536] text-[#FAF6F0] flex items-center justify-center transition-colors border border-[#f5efe6]/10"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center overflow-auto bg-[#050508]">
              {isMobileProject ? (
                /* Mobile portrait view */
                <div className="max-h-[68vh] aspect-[9/20.4] rounded-2xl overflow-hidden border-2 border-[#383340] shadow-2xl">
                  <img
                    src={currentImage.url}
                    alt={currentImage.title}
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              ) : (
                /* Landscape desktop view */
                <div className="max-h-[68vh] w-full rounded-xl overflow-hidden border border-[#f5efe6]/15 shadow-2xl">
                  <img
                    src={currentImage.url}
                    alt={currentImage.title}
                    className="w-full h-auto object-contain mx-auto"
                  />
                </div>
              )}

              {/* Navigation Arrows for multi-image project */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveTab((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#d8b48a] hover:text-black text-white flex items-center justify-center transition-colors border border-white/20 shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#d8b48a] hover:text-black text-white flex items-center justify-center transition-colors border border-white/20 shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Caption & Navigation Pills */}
            <div className="px-6 py-4 border-t border-[#f5efe6]/10 bg-[#09080e] flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="font-sans-body text-[13px] text-[#b8afa2]">
                {currentImage.caption}
              </p>

              {images.length > 1 && (
                <div className="flex items-center gap-1.5">
                  {images.map((img, idx) => (
                    <button
                      key={img.title}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`font-mono-tech px-2.5 py-1 rounded text-[10px] tracking-[1px] transition-colors ${
                        activeTab === idx
                          ? 'bg-[#d8b48a] text-black font-semibold'
                          : 'bg-[#181622] text-[#8e8579] hover:text-white'
                      }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
