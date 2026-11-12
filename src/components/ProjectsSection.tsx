import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { Github, ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { ProjectMockupVisual } from './ProjectMockupVisual';
import { ProjectImageGallery } from './ProjectImageGallery';
import { FullscreenLightbox } from './FullscreenLightbox';
import { openLiveDemoNotice } from './LiveDemoUnavailableModal';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

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

  const sectionRef = useRef<HTMLDivElement>(null);
  const direction = useScrollDirection();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 26 });
  const card1Float = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const card2Float = useTransform(smoothProgress, [0, 1], [10, -10]);

  const offset = direction === 'down' ? 32 : -32;

  useEffect(() => {
    if (!selectedProject && !fullscreenData) {
      document.body.style.overflow = '';
    }
  }, [selectedProject, fullscreenData]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            tag="PORTFOLIO"
            title="FEATURED PROJECTS"
            subtitle="Production web platforms, generative AI systems, and modern developer tools built from the ground up."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              style={{ y: idx % 2 === 0 ? card1Float : card2Float }}
              initial={{ opacity: 0, y: offset, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`transform-gpu will-change-transform flex flex-col h-full ${
                idx === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <FluxCard className="h-full w-full flex flex-col p-4 sm:p-5 group border-white/10 hover:border-[#00f59b]/40 hover:shadow-[0_12px_45px_rgba(0,245,155,0.12)] transition-all duration-300 bg-zinc-950/75">
                {/* Visual Showcase */}
                <div
                  className="mb-5 overflow-hidden rounded-2xl border border-white/10 relative shadow-inner"
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
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs text-white backdrop-blur-sm cursor-pointer"
                      >
                        <span>View architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#00f59b]" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Title row */}
                <div className="px-1 mb-2.5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-dot text-2xl sm:text-[1.75rem] font-bold text-white tracking-tight group-hover:text-[#00f59b] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      {idx === 4 && (
                        <span className="chip !text-[9px] !text-[#00f59b] !border-[#00f59b]/35 !bg-[#00f59b]/10">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono uppercase tracking-[0.06em] text-zinc-400 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-500 shrink-0 pt-1">
                    0{idx + 1}
                  </span>
                </div>

                <p className="px-1 text-sm text-zinc-300 leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="px-1 flex flex-wrap items-center gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip !text-[10px] !text-zinc-200 !border-white/10 !bg-white/[0.04] hover:!border-[#00f59b]/40 hover:!text-white">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions Bar */}
                <div className="mt-auto px-1 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 text-xs text-white transition-all font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => openLiveDemoNotice(project.title)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#00f59b]/15 text-[#00f59b] border border-[#00f59b]/35 hover:bg-[#00f59b]/25 hover:border-[#00f59b]/60 transition-all text-xs font-semibold shadow-[0_0_15px_rgba(0,245,155,0.15)] hover:shadow-[0_0_25px_rgba(0,245,155,0.3)] cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#00f59b] transition-colors cursor-pointer group/details font-medium"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </FluxCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl surface p-5 sm:p-8 max-h-[92vh] overflow-y-auto cursor-default"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#f3f0e7]/[0.06] hover:bg-[#f3f0e7]/[0.12] text-[#d8d4c6] hover:text-white border border-[#f3f0e7]/10 transition-colors cursor-pointer"
                aria-label="Close Project Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <p className="eyebrow mb-2 text-[#6f6d64]">Case study</p>
              <h3 className="font-dot text-4xl sm:text-5xl text-[#f3f0e7] leading-none mb-2 pr-10">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#a3a096] mb-7">{selectedProject.subtitle}</p>

              <div className="mb-6 rounded-2xl overflow-hidden border border-[#f3f0e7]/[0.08]">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <ProjectImageGallery
                    images={selectedProject.images}
                    captions={selectedProject.imageCaptions}
                    title={selectedProject.title}
                    aspectClass="aspect-[16/10] sm:aspect-[16/9]"
                    onOpenLightbox={(idx) =>
                      setFullscreenData({
                        images: selectedProject.images || [],
                        captions: selectedProject.imageCaptions,
                        title: selectedProject.title,
                        initialIndex: idx,
                        liveUrl: selectedProject.liveUrl,
                      })
                    }
                  />
                ) : (
                  <ProjectMockupVisual type={selectedProject.imageType} title={selectedProject.title} />
                )}
              </div>

              <div className="space-y-5 mb-7 text-sm text-[#b5b1a4] font-space leading-relaxed">
                <p>{selectedProject.longDescription}</p>

                <div className="pt-1">
                  <h5 className="eyebrow mb-3 text-[#6f6d64]">Key highlights</h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f3f0e7]/[0.025] border border-[#f3f0e7]/[0.06]">
                        <span className="w-1 h-1 rounded-full bg-[#dcf27a] mt-1.5 shrink-0" />
                        <span className="text-[#a3a096] leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#f3f0e7]/[0.08]">
                <div className="flex items-center gap-2.5">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-4 !py-2.5"
                  >
                    <Github className="w-4 h-4 text-[#a3a096]" />
                    <span>View repository</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProject.title;
                      setSelectedProject(null);
                      openLiveDemoNotice(title);
                    }}
                    className="btn-primary !px-4 !py-2.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open live demo</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 rounded-full text-xs text-[#a3a096] hover:text-[#f3f0e7] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
