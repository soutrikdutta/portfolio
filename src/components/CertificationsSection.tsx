import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ExternalLink, ShieldCheck, ArrowUpRight, X, Maximize2 } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { FullscreenLightbox } from './FullscreenLightbox';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

interface CertificationsSectionProps {
  onViewAllCertifications: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onViewAllCertifications
}) => {
  const { certifications } = PORTFOLIO_DATA;
  const previewCerts = certifications.slice(0, 3);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<Certification | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  // Continuous bi-directional scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const cert1Float = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const cert3Float = useTransform(smoothProgress, [0, 1], [10, -10]);

  const offset = direction === 'down' ? 30 : -30;

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
    <section ref={sectionRef} id="certifications" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
              <GlyphDecryptText text="CERTIFICATIONS" speed={28} />
            </h2>
            <div className="mt-2.5 flex items-center gap-2">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="h-[2px] w-24 bg-gradient-to-r from-[#00ff66] to-transparent rounded-full"
              />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
            </div>
          </div>

          <button
            onClick={onViewAllCertifications}
            className="relative overflow-hidden px-4 sm:px-5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 hover:border-[#00b848]/60 hover:text-[#00ff66] text-white text-xs font-space font-medium flex items-center gap-2 transition-all duration-300 self-start sm:self-auto group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,184,72,0.25)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View All ({certifications.length})</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 text-[#00ff66] transition-transform" />
          </button>
        </motion.div>

        {/* Compact Cards Grid for 3 certifications max with Bi-directional Float */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {previewCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              style={{ y: idx === 0 ? cert1Float : idx === 2 ? cert3Float : undefined }}
              initial={{ opacity: 0, y: offset, rotate: idx === 0 ? -1.5 : idx === 2 ? 1.5 : 0, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex transform-gpu will-change-transform"
            >
              <FluxCard className="p-4 w-full flex flex-col justify-between border-white/10 hover:border-white/25 hover:shadow-[0_10px_35px_rgba(0,184,72,0.12)] group transition-all">
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
                    {cert.skills.slice(0, 3).map((s, i) => (
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

        {/* Option to View All Certificates */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onViewAllCertifications}
            className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 hover:border-[#00b848]/60 hover:text-[#00ff66] text-white text-xs font-space font-medium transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,184,72,0.25)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">View All Certifications ({certifications.length})</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 text-[#00ff66] group-hover:translate-x-1 transition-transform" />
          </button>
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
    </section>
  );
};
