import { useState } from "react";
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles, FileText } from "lucide-react";
import { CERTIFICATES } from "../data/portfolioData";
import { Certificate } from "../types";

export default function CertificatesSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'google' | 'microsoft' | 'academic'>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredCerts = CERTIFICATES.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.category === activeFilter;
  });

  return (
    <section id="credentials" aria-label="Certifications and Accreditations" className="py-24 border-b border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certificates & Badges
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Official accreditations from Google Cloud, Google AI Studio, Vertex AI, Microsoft, and academic institutions verifying technical mastery in applied AI and cloud computing.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl self-start md:self-auto">
            {[
              { id: 'all', label: 'All Credentials' },
              { id: 'google', label: 'Google AI & Cloud' },
              { id: 'microsoft', label: 'Microsoft AI' },
              { id: 'academic', label: 'Academic' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                id={`cert-filter-${tab.id}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="p-5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                    cert.category === 'google' 
                      ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                      : cert.category === 'microsoft'
                      ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  }`}>
                    {cert.issuer}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {cert.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                  {cert.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cert.verificationNote}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Competency</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    id={`view-cert-btn-${cert.id}`}
                    className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1.5 transition-all px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20"
                    title="View Certificate"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate In-Page Viewer Modal */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="bg-[#0c111d] border border-white/[0.14] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-sky-400 font-medium px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                      {selectedCert.issuer}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedCert.type}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {selectedCert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                    {selectedCert.verificationNote}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <span className="text-base leading-none font-bold">&times;</span>
                </button>
              </div>

              {/* Document Display (Embedded PDF / Image) */}
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-black/30">
                {selectedCert.documentUrl ? (
                  selectedCert.documentUrl.toLowerCase().endsWith('.pdf') ? (
                    <div className="w-full h-[58vh] min-h-[380px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#1e2330]">
                      <object
                        data={`${selectedCert.documentUrl}#toolbar=0&navpanes=0`}
                        type="application/pdf"
                        className="w-full h-full"
                        title={selectedCert.name}
                      >
                        <iframe
                          src={`${selectedCert.documentUrl}#toolbar=0&navpanes=0`}
                          className="w-full h-full border-0"
                          title={selectedCert.name}
                        />
                      </object>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center min-h-[380px] max-h-[60vh] rounded-xl overflow-hidden border border-white/[0.08] bg-black/50 p-2">
                      <img
                        src={selectedCert.documentUrl}
                        alt={selectedCert.name}
                        className="max-h-[56vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                      />
                    </div>
                  )
                ) : (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    No preview document available for this credential.
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 border-t border-white/[0.08] flex items-center justify-between gap-3 bg-[#0a0e18]">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Credential Verified</span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedCert.documentUrl && (
                    <a
                      href={selectedCert.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors inline-flex items-center gap-1.5"
                      title="Open or download original document"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full View</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/[0.08] hover:bg-white/[0.14] text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
