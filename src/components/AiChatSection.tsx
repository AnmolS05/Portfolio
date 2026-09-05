import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Sparkles, Send, Bot, User, RefreshCw, CheckCircle2, CornerDownLeft } from "lucide-react";
import { SUGGESTED_QUESTIONS, PERSONAL_INFO } from "../data/portfolioData";
import { ChatMessage } from "../types";

export default function AiChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I'm Anmol's AI Copilot. Ask me anything about his technical stack, flagship projects like AeroInsight, AI/ML internship at DLithe, or his availability for upcoming software engineering roles!`,
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMessage]);
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
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      const data = await res.json();
      const replyText = data.reply || "I'm ready to answer any questions about Anmol's projects and engineering experience!";

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyText,
        timestamp: "Just now"
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("AI Chat error:", err);
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Anmol is a Computer Science undergraduate (2023–2027) building full-stack products with React, Node.js, Python, and applied AI systems. You can also connect with him directly at ${PERSONAL_INFO.email}!`,
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="ai-assistant" aria-label="Interactive AI Assistant" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Portfolio Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ask AI About Anmol
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Query Anmol's digital copilot in real time — trained on his codebase, project architectures, internship experience, and engineering credentials.
          </p>
        </div>

        {/* Chat Console Card */}
        <div className="rounded-2xl bg-[#0b101c] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Console Topbar */}
          <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/40"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/40"></div>
              <span className="text-xs font-mono text-slate-400 ml-2">ai-anmol-copilot</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online & Grounded</span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                    msg.role === "user"
                      ? "bg-sky-500 text-slate-950 font-bold"
                      : "bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold shadow-sm"
                  }`}
                >
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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
              <div className="flex gap-3 mr-auto max-w-[85%] items-center">
                <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-sky-500 text-white font-bold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Starter Question Chips */}
          <div className="px-5 py-2.5 bg-white/[0.02] border-t border-white/[0.04] flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="whitespace-nowrap text-[11px] font-medium text-slate-400 hover:text-sky-300 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] px-3 py-1 rounded-full transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white/[0.03] border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              id="ai-section-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Anmol's projects, stack, or internship experience..."
              disabled={isLoading}
              className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              id="ai-section-send-btn"
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:hover:bg-sky-500 text-slate-950 font-bold transition-all shadow-md shadow-sky-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
