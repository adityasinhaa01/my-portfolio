import { useState, type FC, type FormEvent } from 'react';
import { Copy, Check, Sparkles, Send, ArrowUpRight } from 'lucide-react';
import { VERIFIED_PORTFOLIO_DATA } from '../../data/portfolioData';
import { submitContactForm } from '../../services/api';

interface ContactSectionProps {
  onOpenAssistant: () => void;
}

export const ContactSection: FC<ContactSectionProps> = ({ onOpenAssistant }) => {
  const { contact } = VERIFIED_PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    const result = await submitContactForm(formState);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitFeedback({
        type: 'success',
        message: result.message
      });
      setFormState({ name: '', email: '', message: '' });
    } else {
      setSubmitFeedback({
        type: 'error',
        message: result.error || 'Failed to submit message. Please email directly.'
      });
    }
  };

  return (
    <footer 
      id="contact" 
      className="relative z-20 pt-28 sm:pt-36 lg:pt-44 pb-16 px-6 sm:px-12 lg:px-16 bg-[#040407] border-t border-[#f5efe6]/15"
    >
      <div className="max-w-[1360px] mx-auto">
        <div data-reveal className="max-w-4xl">
          <p className="font-mono-tech text-[11px] lg:text-[12px] tracking-[2.5px] uppercase text-[#d8b48a] mb-5">
            05 / CONTACT
          </p>
          <h2 className="font-display text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.04] text-[#FAF6F0] mb-8">
            Let’s build something enduring.
          </h2>
          <p className="font-sans-body text-[16px] lg:text-[18px] text-[#c2b8ab] leading-[1.6] max-w-2xl mb-12">
            Open to software engineering opportunities, collaborative computer science projects, and thoughtful conversations.
          </p>

          {/* Primary Contact Actions */}
          <div className="flex flex-wrap items-center gap-5 mb-14">
            <button
              onClick={handleCopyEmail}
              className="font-sans-body inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-[#F7F1E5] text-[#09090c] text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-[#e6c79c] btn-heavy cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#09090c]" />
                  <span>EMAIL COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#09090c]" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenAssistant}
              className="font-sans-body inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#f5efe6]/30 text-[#f5efe6] text-[11px] sm:text-[12px] font-semibold tracking-[0.14em] uppercase hover:border-[#e6c79c] hover:text-[#e6c79c] btn-heavy cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            >
              <Sparkles className="w-4 h-4 text-[#e6c79c]" />
              <span>ASK PORTFOLIO ASSISTANT</span>
            </button>
          </div>

          {/* Direct Message Form */}
          <div className="mb-16 p-8 sm:p-10 rounded-2xl bg-[#09090d] border border-[#f5efe6]/12">
            <h3 className="font-display text-[28px] sm:text-[32px] font-medium text-[#FAF6F0] mb-2">
              Send a Direct Message
            </h3>
            <p className="font-sans-body text-[15px] text-[#b8afa2] mb-6">
              Fill in the form below and it will be routed through the portfolio backend API.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-mono-tech text-[10px] tracking-[2px] uppercase text-[#d8b48a] mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={100}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-[#121217] border border-[#f5efe6]/15 rounded-lg px-4 py-3 text-[#FAF6F0] text-[15px] focus:outline-none focus:border-[#d8b48a] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-mono-tech text-[10px] tracking-[2px] uppercase text-[#d8b48a] mb-2">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={150}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full bg-[#121217] border border-[#f5efe6]/15 rounded-lg px-4 py-3 text-[#FAF6F0] text-[15px] focus:outline-none focus:border-[#d8b48a] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono-tech text-[10px] tracking-[2px] uppercase text-[#d8b48a] mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Share details about your inquiry, project, or role..."
                  className="w-full bg-[#121217] border border-[#f5efe6]/15 rounded-lg px-4 py-3 text-[#FAF6F0] text-[15px] focus:outline-none focus:border-[#d8b48a] transition-colors resize-none"
                />
              </div>

              {submitFeedback && (
                <div
                  className={`p-4 rounded-lg text-[14px] ${
                    submitFeedback.type === 'success'
                      ? 'bg-[#1b261b] border border-[#488248]/40 text-[#c8e6c8]'
                      : 'bg-[#291414] border border-[#8a3c3c]/40 text-[#f0bebe]'
                  }`}
                >
                  {submitFeedback.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="font-sans-body inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FAF6F0] text-[#09090c] text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-[#e6c79c] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Verified Contact Links Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[#f5efe6]/15">
            <div>
              <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">Email</p>
              <a 
                href={`mailto:${contact.email}`} 
                className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0] hover:text-[#d8b48a] transition-colors inline-flex items-center gap-1.5"
              >
                <span>{contact.email}</span>
              </a>
            </div>
            <div>
              <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">GitHub</p>
              <a 
                href={contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0] hover:text-[#d8b48a] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>github.com/adityasinhaa01</span>
                <ArrowUpRight className="w-4 h-4 text-[#d8b48a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
            <div>
              <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a] mb-2">LinkedIn</p>
              <a 
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans-body text-[16px] leading-[1.6] text-[#e4dbd0] hover:text-[#d8b48a] transition-colors inline-flex items-center gap-1.5 group"
              >
                <span>linkedin.com/in/adityasinha001</span>
                <ArrowUpRight className="w-4 h-4 text-[#d8b48a] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="font-mono-tech mt-28 pt-8 border-t border-[#f5efe6]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] lg:text-[11px] tracking-[2.5px] uppercase text-[#9c9286]">
          <span>© {new Date().getFullYear()} ADITYA SINHA</span>
          <span>COMPUTER SCIENCE ENGINEERING STUDENT · FULL-STACK DEVELOPER · AI/ML ENTHUSIAST</span>
        </div>
      </div>
    </footer>
  );
};
