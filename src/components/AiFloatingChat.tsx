import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, MessageSquare } from "lucide-react";
import { SUGGESTED_QUESTIONS, PERSONAL_INFO } from "../data/portfolioData";
import { ChatMessage } from "../types";

interface AiFloatingChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AiFloatingChat({ isOpen, onClose, onOpen }: AiFloatingChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-float",
      role: "assistant",
      content: `Hi there! I'm Anmol's AI assistant. Ask me anything about his technical stack, projects, or background!`,
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        text: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history: historyPayload })
      });

      const data = await res.json();
      const replyText = data.reply || "Anmol is available for internships and full-stack software engineering roles.";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyText,
        timestamp: "Just now"
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallback: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Anmol is a Computer Science undergraduate (2023–2027) building full-stack products with React, Node.js, Python, and applied AI systems. Reach him at ${PERSONAL_INFO.email}!`,
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          id="floating-ai-launcher"
          aria-label="Open AI Copilot Chat"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold text-xs shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>Ask Anmol's AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div 
          id="floating-ai-drawer"
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-[#0c111e] border border-white/[0.12] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-white/[0.04] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">AI Anmol</div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online Assistant
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Close floating chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[88%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center text-[10px] ${
                    msg.role === "user"
                      ? "bg-sky-500 text-slate-950 font-bold"
                      : "bg-white/[0.08] text-sky-300 font-bold"
                  }`}
                >
                  {msg.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div
                  className={`p-2.5 rounded-xl leading-relaxed ${
                    msg.role === "user"
                      ? "bg-sky-500/15 text-sky-100 border border-sky-500/30 rounded-tr-none"
                      : "bg-white/[0.04] text-slate-200 border border-white/[0.08] rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 mr-auto items-center">
                <div className="w-6 h-6 rounded-md bg-white/[0.08] flex items-center justify-center text-sky-300">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white/[0.02] border-t border-white/[0.04] flex gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap text-[10px] text-slate-400 hover:text-sky-300 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-full shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <div className="p-3 bg-white/[0.03] border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              id="floating-chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
