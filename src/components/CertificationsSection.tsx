import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ExternalLink, ShieldCheck, ArrowUpRight, X, Maximize2 } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { FullscreenLightbox } from './FullscreenLightbox';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

interface CertificationsSectionProps {
  onViewAllCertifications: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onViewAllCertifications,
}) => {
  const { certifications } = PORTFOLIO_DATA;
  const previewCerts = certifications.slice(0, 3);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [fullscreenCert, setFullscreenCert] = useState<Certification | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const cert1Float = useTransform(smoothProgress, [0, 1], [-8, 8]);
  const cert3Float = useTransform(smoothProgress, [0, 1], [8, -8]);

  const offset = direction === 'down' ? 28 : -28;

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
    <section ref={sectionRef} id="certifications" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            tag="CREDENTIALS"
            title="CERTIFICATIONS"
            subtitle="Verified credentials from Google Cloud, Google for Education, and industry partners."
            action={
              <button onClick={onViewAllCertifications} className="btn-ghost group text-xs">
                <span>View all ({certifications.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] group-hover:translate-x-1 transition-transform" />
              </button>
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              style={{ y: idx === 0 ? cert1Float : idx === 2 ? cert3Float : undefined }}
              initial={{ opacity: 0, y: offset, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex transform-gpu will-change-transform"
            >
              <FluxCard className="p-4 sm:p-5 w-full flex flex-col justify-between group bg-zinc-950/75 border-white/10 hover:border-[#00f59b]/40 hover:shadow-[0_12px_35px_rgba(0,245,155,0.1)] transition-all duration-300">
                <div>
                  <div
                    className="mb-4 overflow-hidden rounded-2xl border border-white/10 relative bg-zinc-900 aspect-[16/10] group/img cursor-pointer shadow-inner"
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
                      <span key={s} className="chip !text-[10px] !normal-case !tracking-normal">
                        {s}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">+{cert.skills.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 px-1 pt-3 border-t border-[#f3f0e7]/[0.08] flex items-center justify-between gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] text-[#d8d4c6] hover:text-[#e9ff9b] flex items-center gap-1 transition-colors underline underline-offset-4 decoration-[#f3f0e7]/20 hover:decoration-[#dcf27a]"
                  >
                    <span>Verify credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-[#f3f0e7]/10 text-[#a3a096]">
                    {cert.category}
                  </span>
                </div>
              </FluxCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <button onClick={onViewAllCertifications} className="btn-ghost group">
            <span>Browse all certifications</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#dcf27a] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Selected certificate modal */}
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
    </section>
  );
};
