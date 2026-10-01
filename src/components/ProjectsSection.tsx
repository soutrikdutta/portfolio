import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { ProjectMockupVisual } from './ProjectMockupVisual';
import { ProjectImageGallery } from './ProjectImageGallery';
import { FullscreenLightbox } from './FullscreenLightbox';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [projects] = useState<Project[]>(PORTFOLIO_DATA.projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenData, setFullscreenData] = useState<{
    images: string[];
    captions?: string[];
    title: string;
    initialIndex: number;
    liveUrl?: string;
  } | null>(null);

  // Safely ensure body scroll is unlocked whenever modals close
  useEffect(() => {
    if (!selectedProject && !fullscreenData) {
      document.body.style.overflow = '';
    }
  }, [selectedProject, fullscreenData]);

  // Escape key handler for selectedProject modal
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wider text-white font-dot">
            <GlyphDecryptText text="PROJECTS" speed={28} />
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
        </motion.div>

        {/* 2 Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
              viewport={{ once: false, amount: 0.08 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="transform-gpu will-change-transform"
            >
              <FluxCard className="h-full flex flex-col p-4 sm:p-6 group border-white/10 hover:border-white/20 hover:shadow-[0_10px_35px_rgba(0,184,72,0.12)] transition-shadow duration-300">

                {/* Project Visual / Image Gallery */}
                <div
                  className="mb-5 overflow-hidden rounded-xl border border-white/10 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.images && project.images.length > 0 ? (
                    <ProjectImageGallery
                      images={project.images}
                      captions={project.imageCaptions}
                      title={project.title}
                      onOpenLightbox={() => setSelectedProject(project)}
                    />
                  ) : (
                    <div className="relative">
                      <ProjectMockupVisual type={project.imageType} title={project.title} />
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs text-white backdrop-blur-xs cursor-pointer"
                      >
                        <span>VIEW ARCHITECTURE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00b848]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Project Title & Info */}
                <div className="mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wider font-dot group-hover:text-zinc-100 transition-colors">
                    {project.title.toUpperCase()}
                  </h3>
                  <p className="text-xs text-zinc-300 tracking-wider mt-0.5 uppercase">
                    {project.subtitle}
                  </p>
                </div>

                {/* Project Description */}
                <p className="text-sm text-zinc-200 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/90 mb-5 pt-3 border-t border-white/5">
                  {project.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span className="text-white font-medium">{tag}</span>
                      {i < project.tags.length - 1 && (
                        <span className="text-zinc-500" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Action Buttons: GitHub Button + Live Demo Button */}
                <div className="flex items-center justify-between gap-2 pt-3.5 mt-auto border-t border-white/10">
                  <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                    {/* GitHub Button */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial justify-center px-3.5 sm:px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/20 hover:border-white/40 text-xs flex items-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 group/btn font-space font-medium whitespace-nowrap"
                    >
                      <Github className="w-3.5 h-3.5 text-zinc-300 group-hover/btn:text-white transition-colors" />
                      <span>GitHub</span>
                    </a>

                    {/* Live Demo Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial justify-center relative overflow-hidden px-3.5 sm:px-4 py-2 rounded-full bg-[#00b848]/20 hover:bg-[#00b848]/35 text-[#00ff66] hover:text-white border border-[#00b848]/40 hover:border-[#00b848]/80 text-xs flex items-center gap-1.5 sm:gap-2 transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(0,184,72,0.15)] hover:shadow-[0_0_25px_rgba(0,184,72,0.4)] hover:scale-105 active:scale-95 group/live font-space whitespace-nowrap"
                    >
                      <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/20 to-transparent animate-shimmer-sweep" />
                      <ExternalLink className="w-3.5 h-3.5 relative z-10 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
                      <span className="relative z-10">Live Demo</span>
                    </a>
                  </div>

                  <span className="text-[10px] text-zinc-400 font-mono font-bold shrink-0 ml-2">
                    0{idx + 1}
                  </span>
                </div>
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl cursor-default"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 hover:border-[#00b848]/60 transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)]"
                aria-label="Close Project Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-2xl font-bold text-white font-dot tracking-wider mb-1">
                {selectedProject.title.toUpperCase()}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                {selectedProject.subtitle}
              </p>

              <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <ProjectImageGallery
                    images={selectedProject.images}
                    captions={selectedProject.imageCaptions}
                    title={selectedProject.title}
                    aspectClass="aspect-[16/10] sm:aspect-[16/9]"
                    onOpenLightbox={(idx) =>
                      setFullscreenData({
                        images: selectedProject.images,
                        captions: selectedProject.imageCaptions,
                        title: selectedProject.title,
                        initialIndex: idx,
                        liveUrl: selectedProject.liveUrl
                      })
                    }
                  />
                ) : (
                  <ProjectMockupVisual type={selectedProject.imageType} title={selectedProject.title} />
                )}
              </div>

              <div className="space-y-4 mb-6 text-sm text-zinc-300 font-space leading-relaxed">
                <p>{selectedProject.longDescription}</p>

                <div className="pt-2">
                  <h5 className="text-xs font-mono text-zinc-400 mb-2 uppercase">Key Highlights:</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 p-2 rounded bg-zinc-900/60 border border-white/5">
                        <span className="text-[#00b848] font-bold">&gt;</span>
                        <span className="text-zinc-300">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Actions with both GitHub and Live Demo buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 hover:border-white/40 text-xs flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm font-dot tracking-wide"
                  >
                    <Github className="w-4 h-4 text-zinc-300" />
                    <span>View Repository</span>
                  </a>

                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden px-5 py-2.5 rounded-full bg-[#00b848]/20 hover:bg-[#00b848]/35 text-[#00ff66] hover:text-white border border-[#00b848]/40 hover:border-[#00b848]/80 text-xs flex items-center gap-2 transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(0,184,72,0.25)] hover:scale-105 active:scale-95 font-dot tracking-wide"
                  >
                    <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/20 to-transparent animate-shimmer-sweep" />
                    <ExternalLink className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Open Live Demo</span>
                  </a>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-dot transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Universal Fullscreen Lightbox for distortion-free viewing */}
      {fullscreenData && (
        <FullscreenLightbox
          isOpen={!!fullscreenData}
          onClose={() => setFullscreenData(null)}
          images={fullscreenData.images}
          captions={fullscreenData.captions}
          title={fullscreenData.title}
          initialIndex={fullscreenData.initialIndex}
          liveUrl={fullscreenData.liveUrl}
        />
      )}
    </section>
  );
};
