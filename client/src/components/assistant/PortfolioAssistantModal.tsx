import { useState, useEffect, useRef, type FC } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { sendAssistantMessage, ChatMessage } from '../../services/api';

interface PortfolioAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "Tell me about Aditya's projects: Nagar Sudhar, ChotuLink, and AetherPaste.",
  "What are Aditya's technical skills and AI/LLM experience?",
  "What is Aditya's educational background and academic record?",
  "What achievements has Aditya earned?"
];

export const PortfolioAssistantModal: FC<PortfolioAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello. I am Aditya Sinha's portfolio assistant. I answer questions strictly based on verified information—covering his Computer Science Engineering studies at Netaji Subhas Engineering College, technical skills, achievements, and projects (Nagar Sudhar, ChotuLink, and AetherPaste). How can I help you?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus management and Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the input when opened
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      // Call secure backend API
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
        await new Promise((r) => setTimeout(r, 16));
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Assistant"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-[#0b0b0e] border-l border-[#f4ece1]/15 h-full flex flex-col justify-between text-[#f4ece1] shadow-2xl"
      >
        {/* Editorial Header */}
        <div className="px-8 py-7 border-b border-[#f4ece1]/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#d8b48a]" />
              <p className="font-mono-tech text-[11px] tracking-[2.5px] uppercase text-[#d8b48a]">
                Portfolio Concierge
              </p>
            </div>
            <h2 className="font-display text-[30px] sm:text-[32px] font-medium tracking-wide text-[#f7f2eb]">
              Ask About Aditya Sinha
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 text-[#f4ece1]/70 hover:text-[#f4ece1] border border-[#f4ece1]/15 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#d8b48a]"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <span className="font-mono-tech text-[10px] uppercase tracking-[2px] text-[#f4ece1]/40 mb-2">
                {msg.role === 'user' ? 'You' : 'Editorial Assistant'}
              </span>
              <div
                className={`font-sans-body max-w-[90%] rounded-2xl px-5 py-4 text-[15px] sm:text-[16px] leading-[1.6] whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#f4ece1] text-[#0b0b0e]'
                    : 'bg-[#141419] text-[#e8dfd3] border border-[#f4ece1]/10'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-2 text-[#d8b48a]">
                    Composing response...
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts & Input */}
        <div className="p-6 border-t border-[#f4ece1]/10 bg-[#0e0e12]">
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="font-sans-body text-[12px] text-left px-3.5 py-2 rounded-full border border-[#f4ece1]/15 text-[#d8cec2] hover:border-[#d8b48a] hover:text-[#f7f2eb] transition-colors disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Aditya's skills, projects, or CS focus..."
              className="font-sans-body w-full bg-[#15151b] border border-[#f4ece1]/20 rounded-full pl-5 pr-14 py-3.5 text-[15px] sm:text-[16px] text-[#f7f2eb] placeholder-[#f4ece1]/40 focus:outline-none focus:border-[#d8b48a]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 rounded-full bg-[#f4ece1] text-[#09090c] hover:bg-[#e5d5c0] disabled:opacity-30 transition-colors focus:outline-none"
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
