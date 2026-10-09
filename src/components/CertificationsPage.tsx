import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, ExternalLink, ArrowUpRight, X, Maximize2 } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { FullscreenLightbox } from './FullscreenLightbox';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';

interface CertificationsPageProps {
  onBack: () => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ onBack }) => {
  const { certifications } = PORTFOLIO_DATA;
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<Certification | null>(null);

  // Safely ensure body scroll is unlocked whenever modals close
  useEffect(() => {
    if (!selectedCert && !fullscreenCert) {
      document.body.style.overflow = '';
    }
  }, [selectedCert, fullscreenCert]);

  // Escape key handler for selectedCert modal
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative">
      <div className="absolute inset-0 nothing-dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation Back Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#00b848]/60 text-xs font-space text-zinc-200 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff66] relative z-10 group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10 font-medium">Return to Portfolio</span>
          </button>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-dot mb-3">
            <GlyphDecryptText text="ALL CERTIFICATIONS" speed={28} />
          </h1>
          <p className="text-zinc-300 text-sm font-space max-w-2xl">
            Archive of official verified credentials earned through Google Cloud, Google for Education, and Udemy.
          </p>
        </div>

        {/* Compact Certifications Grid - All Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="flex"
            >
              <FluxCard className="p-4 w-full flex flex-col justify-between border-white/10 hover:border-white/25 group transition-all">
                <div>
                  {/* Compact Certificate Image Preview Slot */}
                  <div
                    className="mb-3 overflow-hidden rounded-xl border border-white/10 relative bg-zinc-950/80 aspect-[16/10] group/img cursor-pointer"
                    onClick={() => setFullscreenCert(cert)}
                  >
                    <img
                      src={cert.certificateUrl || cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover/img:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#00ff66] backdrop-blur-xs">
                      <span>PREVIEW</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>

                    {/* Official Badge Icon Stamp in corner */}
                    {cert.imageUrl && cert.certificateUrl !== cert.imageUrl && (
                      <div className="absolute bottom-2 right-2 w-7 h-7 rounded-md bg-white p-0.5 shadow-md border border-black/20 pointer-events-none">
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

                  {/* Issuer & Date */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                    <span className="text-[11px] font-mono text-[#00b848] uppercase tracking-wider truncate">
                      {cert.issuer}
                    </span>
                    <span className="font-dot text-[11px] text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-white/10 shrink-0">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors line-clamp-2 mb-1.5 font-space min-h-[2.5rem]">
                    {cert.title}
                  </h3>

                  {/* ID */}
                  <div className="text-[11px] text-zinc-400 mb-3 flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-3 h-3 text-[#00b848] shrink-0" />
                    <span className="truncate">ID: {cert.credentialId}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-300 pt-2.5 border-t border-white/5">
                    {cert.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-500">+{cert.skills.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Bottom Row Actions */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-mono text-[#00b848] hover:text-[#22e66d] flex items-center gap-1 transition-colors font-medium underline underline-offset-4 decoration-[#00b848]/30 hover:decoration-[#00b848]"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                      cert.category === 'Web Dev'
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : cert.category === 'AI & Data'
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {cert.category.toUpperCase()}
                  </span>
                </div>
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl sm:max-w-4xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 hover:border-[#00b848]/60 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)]"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-space mb-1 pr-10">
                {selectedCert.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-5">
                <span>{selectedCert.issuer}</span>
                <span>·</span>
                <span>ID: {selectedCert.credentialId}</span>
                <span>·</span>
                <span>{selectedCert.issueDate}</span>
              </div>

              {selectedCert.certificateUrl && (
                <div
                  className="mb-5 rounded-xl overflow-hidden border border-white/10 bg-black/95 flex items-center justify-center p-3 relative group/zoom cursor-pointer shadow-inner"
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
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black/95 text-white border border-white/20 opacity-0 group-hover/zoom:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-mono backdrop-blur-md shadow-lg pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5 text-[#00ff66]" />
                    <span className="text-[11px]">CLICK FOR FULLSCREEN</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                <a
                  href={selectedCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono text-[#00ff66] bg-[#00b848]/15 hover:bg-[#00b848]/30 border border-[#00b848]/40 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify on Official Provider</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFullscreenCert(selectedCert);
                      setSelectedCert(null);
                    }}
                    className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-space border border-white/15 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#00ff66]" />
                    <span>Fullscreen</span>
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-dot transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox for certificates */}
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
