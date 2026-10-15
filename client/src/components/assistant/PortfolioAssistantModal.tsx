import { useState, useEffect, useRef, type FC } from 'react';
import { X, Send, Sparkles, MessageSquarePlus, Bot } from 'lucide-react';
import { sendAssistantMessage, ChatMessage } from '../../services/api';

interface PortfolioAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What freelance services and pricing does Aditya offer?",
  "What are Aditya's key achievements and academic board results?",
  "Tell me about Aditya's projects: Nagar Sudhar, ChotuLink, and AetherPaste.",
  "How are freelance project milestones and payments structured?",
  "What are Aditya's technical skills and AI/LLM experience?",
  "Tell me about Aditya's background, education, and coding journey."
];

/**
 * Format message content cleanly:
 * - Transforms **phrase** into semantic styled bold elements without raw asterisks
 * - Strips any stray or unmatched ** asterisks so messages never look messy or vague
 */
function formatMessageContent(raw: string) {
  if (!raw) return '';

  const lines = raw.split('\n');

  return lines.map((line, lineIdx) => {
    const segments = line.split(/(\*\*[^*]+\*\*)/g);

    return (
      <span key={lineIdx} className="block min-h-[1.4em]">
        {segments.map((segment, segIdx) => {
          if (segment.startsWith('**') && segment.endsWith('**') && segment.length >= 4) {
            const inner = segment.slice(2, -2).trim();
            return (
              <strong key={segIdx} className="font-semibold text-[#fbf8f3]">
                {inner}
              </strong>
            );
          }
          const cleanedText = segment.replace(/\*\*/g, '');
          return <span key={segIdx}>{cleanedText}</span>;
        })}
      </span>
    );
  });
}

export const PortfolioAssistantModal: FC<PortfolioAssistantModalProps> = ({ isOpen, onClose }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Aditya Sinha's portfolio concierge. I can answer questions about his software engineering projects, technical skills, background, education, achievements, and freelance services (including resume creation, PPTs, and project development). How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle smooth entrance and exit animations
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const raf = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 320);
  };

  // Auto-scroll directly inside the message list container without scrolling parent modal or window
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
    // Prevent outer modal dialog from shifting or scrolling away header
    if (modalRef.current && modalRef.current.scrollTop !== 0) {
      modalRef.current.scrollTop = 0;
    }
  }, [messages, isLoading]);

  // Focus management and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSend = async (promptText?: string) => {
    const trimmed = (promptText ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const historySnapshot = [...messages];

    // Optimistically update UI
    setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await sendAssistantMessage(trimmed, historySnapshot);
      const fullReply = response.reply;

      // Stream tokens into the assistant bubble for smooth natural reading
      const words = fullReply.split(' ');
      let accumulated = '';
      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? '' : ' ') + words[i];
        const snapshot = accumulated;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: snapshot };
          return updated;
        });
        await new Promise((r) => setTimeout(r, 14));
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I encountered an issue connecting to the assistant service. You can contact Aditya directly at adityasinhaa001@gmail.com."
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-xl transition-all duration-350 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Assistant"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div 
        ref={modalRef}
        className={`relative w-full max-w-4xl h-[90vh] max-h-[820px] min-h-[520px] bg-[#0c0c12]/98 border border-[#f4ece1]/15 rounded-3xl flex flex-col text-[#f4ece1] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(255,255,255,0.06)] transform transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6 pointer-events-none'
        }`}
      >
        {/* Soft Ambient Cosmic Glows */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#d8b48a]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#4a3525]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Editorial Modal Header */}
        <div className="relative z-10 flex-shrink-0 px-6 sm:px-8 py-5 border-b border-[#f4ece1]/10 flex items-center justify-between bg-[#0e0e15]/90 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#1b1a26] border border-[#d8b48a]/30 flex items-center justify-center text-[#d8b48a] shadow-inner">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles className="w-3 h-3 text-[#d8b48a]" />
                <p className="font-mono-tech text-[10.5px] tracking-[2.5px] uppercase text-[#d8b48a]">
                  Portfolio Concierge
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" title="Online" />
              </div>
              <h2 className="font-display text-[22px] sm:text-[25px] font-medium tracking-wide text-[#f7f2eb]">
                Ask About Aditya Sinha
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 text-[#f4ece1]/70 hover:text-[#f4ece1] hover:bg-[#f4ece1]/10 rounded-full transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            aria-label="Close assistant window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spacious Message Thread */}
        <div 
          ref={chatContainerRef}
          className="relative z-10 flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 py-6 space-y-6 scroll-smooth custom-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col chat-msg-in ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="font-mono-tech text-[10px] uppercase tracking-[2px] text-[#f4ece1]/45 mb-1.5 flex items-center gap-1.5">
                {msg.role === 'user' ? (
                  'You'
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d8b48a]" />
                    Editorial Assistant
                  </>
                )}
              </span>
              <div
                className={`font-sans-body max-w-[94%] sm:max-w-[85%] transition-all duration-200 ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#f5ede2] to-[#e8dbcc] text-[#0d0c12] font-medium shadow-[0_4px_20px_rgba(216,180,138,0.2)] rounded-2xl rounded-tr-xs px-5 sm:px-6 py-3.5 sm:py-4 text-[15px] sm:text-[16px]'
                    : 'bg-[#161521]/90 text-[#ede4d8] shadow-[0_6px_28px_rgba(0,0,0,0.35)] rounded-2xl rounded-tl-xs px-6 py-5 text-[15px] sm:text-[16.5px] leading-[1.72]'
                }`}
              >
                {msg.content ? (
                  formatMessageContent(msg.content)
                ) : (
                  <div className="flex items-center gap-2.5 py-1 text-[#d8b48a]">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#d8b48a] pulse-dot-1" />
                      <span className="w-2 h-2 rounded-full bg-[#d8b48a] pulse-dot-2" />
                      <span className="w-2 h-2 rounded-full bg-[#d8b48a] pulse-dot-3" />
                    </div>
                    <span className="font-mono-tech text-[11px] tracking-wider uppercase opacity-80">
                      Composing response...
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Window & Input Section */}
        <div className="relative z-10 flex-shrink-0 p-5 sm:p-7 border-t border-[#f4ece1]/10 bg-[#0d0d14]/95 backdrop-blur-md">
          {/* Dismissible Suggested Questions Window */}
          {showSuggestions ? (
            <div className="mb-4 bg-[#14131e]/95 rounded-2xl p-4 shadow-inner transition-all duration-300 chat-msg-in">
              <div className="flex items-center justify-between mb-2.5 pb-1 border-b border-[#f4ece1]/8">
                <span className="font-mono-tech text-[10.5px] tracking-[1.8px] uppercase text-[#d8b48a] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d8b48a]" />
                  Suggested Inquiries
                </span>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(false)}
                  className="p-1 rounded-full text-[#f4ece1]/50 hover:text-[#f4ece1] hover:bg-[#f4ece1]/10 transition-colors"
                  title="Close suggestions window"
                  aria-label="Close suggestions window"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    disabled={isLoading}
                    className="font-sans-body text-[12.5px] text-left px-4 py-2 rounded-xl bg-[#1d1b2a] text-[#ddd4c7] hover:bg-[#2b283d] hover:text-[#ffffff] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 disabled:opacity-40 shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSuggestions(true)}
                className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] tracking-wider text-[#d8b48a]/85 hover:text-[#d8b48a] px-3.5 py-1.5 rounded-full bg-[#161522] hover:bg-[#201e30] transition-all hover:-translate-y-0.5"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#d8b48a]" />
                Show Suggested Inquiries
              </button>
            </div>
          )}

          {/* Premium Capsule Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center bg-[#151422] rounded-full p-1.5 pl-6 border border-white/[0.08] focus-within:border-[#d8b48a]/50 focus-within:ring-2 focus-within:ring-[#d8b48a]/20 transition-all shadow-xl"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about freelancing, projects, achievements, skills, background..."
              className="font-sans-body w-full bg-transparent text-[15px] sm:text-[16px] text-[#f7f2eb] placeholder-[#f4ece1]/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-full bg-[#f4ece1] text-[#0a0a0f] hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-25 disabled:hover:bg-[#f4ece1] disabled:hover:scale-100 transition-all duration-150 focus:outline-none shadow-md ml-2"
              aria-label="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
