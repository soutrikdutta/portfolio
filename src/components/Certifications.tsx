import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { BadgeCheck, ExternalLink, ShieldCheck, X, Award } from "lucide-react";

export const Certifications: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const certsUrl = portfolioConfig.certificationsUrl || portfolioConfig.contact.socialLinks.linkedin;

  return (
    <section
      id="certifications"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Certifications section"
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Certifications
          </h2>
        </div>

        {/* Sentence above the box */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          A collection of certifications earned through continuous learning, courses, and hands-on experiences.
        </p>

        {/* Clickable box / button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-between gap-6 px-6 py-4 rounded-2xl bg-[#0e121b]/70 hover:bg-[#121726]/90 backdrop-blur-md border border-white/[0.10] hover:border-white/[0.25] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            aria-label="View all certifications"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sky-400 group-hover:text-sky-300 group-hover:border-white/[0.18] transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-base sm:text-lg font-semibold text-white/95 group-hover:text-white transition-colors">
                View All Certifications ↗
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="hidden xs:flex items-center -space-x-1.5">
                <img
                  src="/certifications/google-cloud-badge.png"
                  alt="Build a Secure Google Cloud Network"
                  className="w-7 h-7 rounded-md bg-white p-0.5 object-contain border border-white/20 shadow-sm"
                  title="Build a Secure Google Cloud Network"
                />
                <img
                  src="/certifications/google-cloud-load-balancing.png"
                  alt="Implement Load Balancing on Compute Engine"
                  className="w-7 h-7 rounded-md bg-white p-0.5 object-contain border border-white/20 shadow-sm"
                  title="Implement Load Balancing on Compute Engine"
                />
                <img
                  src="/certifications/google-cloud-ml-apis.png"
                  alt="Prepare Data for ML APIs on Google Cloud"
                  className="w-7 h-7 rounded-md bg-white p-0.5 object-contain border border-white/20 shadow-sm"
                  title="Prepare Data for ML APIs on Google Cloud"
                />
                <img
                  src="/certifications/google-cloud-app-dev.png"
                  alt="Set Up an App Dev Environment on Google Cloud"
                  className="w-7 h-7 rounded-md bg-white p-0.5 object-contain border border-white/20 shadow-sm"
                  title="Set Up an App Dev Environment on Google Cloud"
                />
                <img
                  src="/certifications/gemini-certified-student-badge.png"
                  alt="Gemini Certified Student (University)"
                  className="w-7 h-7 rounded-md bg-white p-0.5 object-contain border border-white/20 shadow-sm"
                  title="Gemini Certified Student (University)"
                />
              </div>
              <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
                {portfolioConfig.certifications.length} Credentials
              </span>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Spacious Modal Overlay displaying all certifications with ample room */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0d1017] border border-white/[0.12] shadow-2xl overflow-hidden z-10"
              role="dialog"
              aria-modal="true"
              aria-label="All Certifications"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-[#090d14]/80 backdrop-blur-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      All Certifications & Credentials
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20">
                      {portfolioConfig.certifications.length} verified
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Official verified credentials from Google Cloud and Google for Education.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {certsUrl && (
                    <a
                      href={certsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] text-xs font-medium text-zinc-300 hover:text-white border border-white/[0.10] transition-colors"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/[0.10] transition-all cursor-pointer"
                    aria-label="Close certifications modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Certifications List with generous space */}
              <div className="p-6 overflow-y-auto space-y-4">
                {portfolioConfig.certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-5 sm:p-6 rounded-xl bg-[#111522]/80 border border-white/[0.08] hover:border-white/[0.20] transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3 flex-1 min-w-0">
                        {/* Header: Issuer + Date */}
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-200">
                            <BadgeCheck className="w-4 h-4 text-sky-400" />
                            <span className="font-medium text-xs">{cert.issuer}</span>
                          </span>

                          <span className="text-xs font-mono text-zinc-400">
                            {cert.date}
                          </span>
                        </div>

                        {/* Title and credential ID */}
                        <div className="space-y-1">
                          <h4 className="text-base sm:text-lg font-semibold text-white">
                            {cert.title}
                          </h4>

                          {cert.credentialId && (
                            <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                              <span>Credential ID: {cert.credentialId}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Badge image preview if present */}
                      {cert.imageUrl && (
                        <div className="shrink-0 self-start sm:self-center">
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/badge block p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] hover:border-sky-400/50 transition-all shadow-md"
                            title={`Verify ${cert.title}`}
                          >
                            <img
                              src={cert.imageUrl}
                              alt={cert.title}
                              className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-lg bg-white p-1 transition-transform duration-200 group-hover/badge:scale-105"
                              loading="lazy"
                            />
                            <div className="mt-1 text-center">
                              <span className="text-[10px] font-mono text-sky-400 group-hover/badge:text-sky-300 flex items-center justify-center gap-1">
                                <span>{cert.link?.includes("credly.com") ? "Credly" : "Accredible"}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Verify Credential + View Certificate */}
                    <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-2.5">
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/25 border border-sky-500/30 hover:border-sky-500/50 transition-all duration-200 shadow-sm"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                          <span>Verify Credential</span>
                          <ExternalLink className="w-3 h-3 text-sky-400" />
                        </a>
                      )}

                      {cert.certificateUrl && (
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.22] transition-all duration-200 shadow-sm"
                        >
                          <span>View Certificate</span>
                          <ExternalLink className="w-3 h-3 text-zinc-400" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#090d14]/80 text-xs text-zinc-400">
                <span>All credentials verified via official coursework providers.</span>
                {certsUrl && (
                  <a
                    href={certsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium"
                  >
                    <span>LinkedIn ↗</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
