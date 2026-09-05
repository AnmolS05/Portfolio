import React, { useState, FormEvent } from "react";
import { Mail, Copy, Check, ExternalLink, Linkedin, Github, Send, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;
    
    // Create prefilled mailto link
    const subject = encodeURIComponent(`Inquiry from ${senderName || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSenderName("");
      setSenderEmail("");
      setMessage("");
    }, 4000);
  };

  return (
    <section id="contact" aria-label="Contact Anmol S Poojary" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Impactful
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Feel free to reach out for engineering collaborations, technical discussions, or project inquiries. My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Direct Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
              {/* Direct Email Card with Copy button */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Direct Email Address
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-xs sm:text-sm font-mono text-white font-medium truncate select-all">
                    {PERSONAL_INFO.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    id="copy-email-btn"
                    className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors shrink-0 ml-2"
                    title="Copy Email to Clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] font-mono text-emerald-400 pt-1">
                    ✓ Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Profiles & Repositories
                </div>
                <div className="space-y-2">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-linkedin-link"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                          LinkedIn
                        </div>
                        <div className="text-[11px] text-slate-400">
                          in/anmol-s-poojary
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="contact-github-link"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/[0.06] text-white">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                          GitHub
                        </div>
                        <div className="text-[11px] text-slate-400">
                          github.com/AnmolS05
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 rounded-xl bg-sky-500/[0.04] border border-sky-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-sky-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Prompt Response Guarantee
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  I typically respond to recruiting and technical inquiries within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick Direct Message Composer */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-white tracking-tight">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Send a Direct Note</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-400">
                    Your Email <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-400">
                  Message or Opportunity Details <span className="text-sky-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your role, team, or project requirements..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] font-mono text-slate-500">
                  Prepares email to {PERSONAL_INFO.email}
                </p>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono animate-in fade-in">
                  ✓ Opening mail client with your message to Anmol!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
