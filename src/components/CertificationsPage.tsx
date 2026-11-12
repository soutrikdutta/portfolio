import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, ExternalLink, ArrowUpRight, X, Maximize2 } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { FullscreenLightbox } from './FullscreenLightbox';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';

interface CertificationsPageProps {
  onBack: () => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onBack }) => {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (!selectedCert && !fullscreenCert) document.body.style.overflow = '';
  }, [selectedCert, fullscreenCert]);

  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20 sm:pb-24 px-5 sm:px-6 relative">
      <div className="absolute inset-0 nothing-dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <button onClick={onBack} className="btn-ghost group text-xs">
            <ArrowLeft className="w-4 h-4 text-[#00f59b] group-hover:-translate-x-1 transition-transform" />
            <span>Return to portfolio</span>
          </button>
        </div>

        <SectionHeader
          tag="CREDENTIALS"
          title="ALL CERTIFICATIONS"
          subtitle={`${certifications.length} verified credentials across cloud, AI, and modern software development.`}
          className="mb-10"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.035 }}
              className="flex"
            >
              <FluxCard className="p-3.5 w-full flex flex-col justify-between group">
                <div>
                  <div
                    className="mb-4 overflow-hidden rounded-2xl border border-[#f3f0e7]/[0.08] relative bg-[#0b0b0a] aspect-[16/10] group/img cursor-pointer"
                    onClick={() => setFullscreenCert(cert)}
                  >
                    <img
                      src={cert.certificateUrl || cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2 group-hover/img:scale-[1.03] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-[#00f59b] backdrop-blur-[2px]">
                      <span>View Credential</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>

                    {cert.imageUrl && cert.certificateUrl !== cert.imageUrl && (
                      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-lg bg-white p-0.5 shadow-md border border-black/20 pointer-events-none">
                        <img
                          src={cert.imageUrl}
                          alt=""
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="px-1 flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#00f59b] font-semibold truncate">
                      {cert.issuer}
                    </span>
                    <span className="chip !text-[10px] shrink-0">{cert.issueDate}</span>
                  </div>

                  <h3 className="px-1 font-dot text-lg font-bold text-white group-hover:text-[#00f59b] transition-colors leading-snug line-clamp-2 mb-2.5 min-h-[3rem]">
                    {cert.title}
                  </h3>

                  <div className="px-1 text-[11px] text-zinc-400 mb-3 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00f59b] shrink-0" />
                    <span className="truncate">ID: {cert.credentialId}</span>
                  </div>

                  <div className="px-1 flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span key={s} className="chip !text-[10px] !normal-case !tracking-normal">{s}</span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">+{cert.skills.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 px-1 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-zinc-300 hover:text-[#00f59b] flex items-center gap-1 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#00f59b] font-medium"
                  >
                    <span>Verify credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 text-zinc-400 bg-white/[0.04]">
                    {cert.category}
                  </span>
                </div>
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl sm:max-w-4xl surface p-5 sm:p-8 max-h-[92vh] overflow-y-auto cursor-default"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f3f0e7]/[0.06] hover:bg-[#f3f0e7]/[0.12] text-[#d8d4c6] hover:text-white border border-[#f3f0e7]/10 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="eyebrow mb-2 text-[#6f6d64]">Credential</p>
              <h3 className="font-dot text-3xl sm:text-4xl text-[#f3f0e7] leading-tight mb-2 pr-10">
                {selectedCert.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#8f8c82] mb-5">
                <span>{selectedCert.issuer}</span>
                <span className="text-[#4e4c45]">·</span>
                <span>ID: {selectedCert.credentialId}</span>
                <span className="text-[#4e4c45]">·</span>
                <span>{selectedCert.issueDate}</span>
              </div>

              {selectedCert.certificateUrl && (
                <div
                  className="mb-5 rounded-2xl overflow-hidden border border-[#f3f0e7]/[0.08] bg-black/80 flex items-center justify-center p-3 relative group/zoom cursor-pointer"
                  onClick={() => {
                    setFullscreenCert(selectedCert);
                    setSelectedCert(null);
                  }}
                  title="Click to view full screen"
                >
                  <img
                    src={selectedCert.certificateUrl}
                    alt={selectedCert.title}
                    className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg transition-transform duration-300 group-hover/zoom:scale-[1.01]"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 text-white border border-[#f3f0e7]/15 opacity-0 group-hover/zoom:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] font-mono backdrop-blur-md pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5 text-[#dcf27a]" />
                    <span>Fullscreen</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#f3f0e7]/[0.08]">
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-[#e9ff9b] bg-[#dcf27a]/[0.08] border border-[#dcf27a]/25 hover:bg-[#dcf27a]/[0.16] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify on provider</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFullscreenCert(selectedCert);
                      setSelectedCert(null);
                    }}
                    className="btn-ghost !px-4 !py-2"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#dcf27a]" />
                    <span>Fullscreen</span>
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2 rounded-full text-xs text-[#a3a096] hover:text-[#f3f0e7] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {fullscreenCert && (
        <FullscreenLightbox
          isOpen={!!fullscreenCert}
          onClose={() => setFullscreenCert(null)}
          images={[fullscreenCert.certificateUrl || fullscreenCert.imageUrl || '']}
          title={fullscreenCert.title}
          subtitle={`${fullscreenCert.issuer} · Credential ID: ${fullscreenCert.credentialId}`}
          verifyUrl={fullscreenCert.verifyUrl}
        />
      )}
    </div>
  );
};
