import type { FC } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAssistant: () => void;
  onNavigateSection: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' }
];

export const Navbar: FC<NavbarProps> = ({
  onOpenAssistant,
  onNavigateSection,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  return (
    <nav
      aria-label="Primary Navigation"
      className="relative z-30 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-20 pt-8 pb-4 flex items-center justify-between"
    >
      {/* Brand Monogram */}
      <div className="flex items-center">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono-tech text-[11px] font-medium tracking-[2.5px] uppercase text-[#f5efe6]/80 hover:text-[#f5efe6] transition-colors lg:opacity-0 lg:pointer-events-none"
          aria-label="Aditya Sinha Portfolio Top"
        >
          AS
        </a>
      </div>

      {/* Desktop Navigation with Prominent, Persistent ASK AI CTA */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12 rise-in" style={{ animationDelay: '1.9s' }}>
        <div className="flex items-center gap-7 lg:gap-10 border-b border-[#f5efe6]/35 pb-3">
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="font-mono-tech nav-link on-planet text-[10px] lg:text-[11px] font-normal tracking-[2.5px] uppercase text-white hover:text-[#e6c79c] cursor-pointer focus:outline-none focus:text-[#e6c79c]"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3.5 border-l border-[#f5efe6]/20 pl-6">
          <a
            href="https://github.com/adityasinhaa01"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech on-planet text-[10px] lg:text-[11px] tracking-[2px] uppercase text-white/80 hover:text-[#e6c79c] transition-colors"
            title="GitHub: adityasinhaa01"
          >
            GitHub
          </a>
          <span className="text-white/30 text-[10px]">·</span>
          <a
            href="https://www.linkedin.com/in/adityasinha001"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech on-planet text-[10px] lg:text-[11px] tracking-[2px] uppercase text-white/80 hover:text-[#e6c79c] transition-colors"
            title="LinkedIn: adityasinha001"
          >
            LinkedIn
          </a>
        </div>

        {/* Unmistakably visible, persistent ASK AI Button */}
        <button
          onClick={onOpenAssistant}
          className="font-mono-tech group flex items-center gap-2.5 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border border-[#d8b48a]/70 bg-[#d8b48a]/12 hover:bg-[#d8b48a]/25 text-[#f7f2eb] hover:text-white text-[10px] lg:text-[11px] font-medium tracking-[2.2px] uppercase shadow-[0_0_20px_rgba(216,180,138,0.16)] hover:shadow-[0_0_28px_rgba(216,180,138,0.32)] transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d8b48a]/80"
          aria-label="Open portfolio AI assistant"
          aria-haspopup="dialog"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#e6c79c] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          <span className="on-planet">ASK AI</span>
        </button>
      </div>

      {/* Mobile Menu & Persistent Mobile ASK AI Trigger */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={onOpenAssistant}
          className="font-mono-tech px-3.5 py-2 rounded-full border border-[#d8b48a]/70 bg-[#d8b48a]/15 text-[10px] font-medium tracking-[1.5px] uppercase text-[#f7f2eb] flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
          aria-label="Open portfolio AI assistant"
        >
          <Sparkles className="w-3 h-3 text-[#e6c79c]" />
          <span>ASK AI</span>
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 text-[#f5efe6] border border-[#f5efe6]/25 rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#050508]/98 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-6 p-3 text-[#f5efe6] border border-[#f5efe6]/20 rounded-full hover:border-[#d8b48a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-6 text-center">
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSection(item.id);
                }}
                className="font-display text-4xl sm:text-5xl font-medium tracking-wider uppercase text-[#f5efe6] hover:text-[#dfc19b] transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6 border-t border-[#f5efe6]/15 w-full flex flex-col items-center gap-4">
              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/adityasinhaa01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-tech text-[11px] tracking-[2px] uppercase text-[#d8b48a] hover:text-[#FAF6F0]"
                >
                  GitHub
                </a>
                <span className="text-[#f5efe6]/30">·</span>
                <a
                  href="https://www.linkedin.com/in/adityasinha001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-tech text-[11px] tracking-[2px] uppercase text-[#d8b48a] hover:text-[#FAF6F0]"
                >
                  LinkedIn
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="font-mono-tech inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#d8b48a] bg-[#d8b48a]/20 text-[#f7f2eb] text-[12px] font-medium tracking-[2px] uppercase shadow-[0_0_24px_rgba(216,180,138,0.25)]"
              >
                <Sparkles className="w-4 h-4 text-[#e6c79c]" />
                <span>Ask Portfolio AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
