import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

export const Projects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06] scroll-mt-20"
      aria-label="Projects section"
    >
      <div className="space-y-10">
        {/* Section Heading with Animated Reveal */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Production apps and platforms built with clean code and modern architecture.
          </p>
        </motion.div>

        {/* Project Cards List with 3D Tilt and Specular Beam */}
        <div className="space-y-6">
          {portfolioConfig.projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      rotateX: tilt.x,
                      rotateY: tilt.y,
                    }
              }
              style={{ perspective: 1000 }}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0e121b]/70 hover:bg-[#121726]/90 border border-white/[0.09] hover:border-sky-400/40 transition-all duration-300 ease-out shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_55px_rgba(56,189,248,0.12)] overflow-hidden"
            >
              {/* Dynamic ambient gradient illumination on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-blue-600/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Card Header Info */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                {/* Number & Titles */}
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold text-sky-300 bg-sky-500/15 border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                      {project.id}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Technology Badges with Staggered Hover */}
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] group-hover:border-sky-400/25 group-hover:bg-white/[0.08] transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Action Links */}
                <div className="flex items-center gap-2.5 pt-2 sm:pt-0 sm:self-start shrink-0">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-4 py-2 rounded-full border border-white/[0.10] hover:border-sky-400/40 bg-white/[0.04] hover:bg-white/[0.12] backdrop-blur-md transition-all duration-200 shadow-sm"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </motion.a>
                  )}

                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 text-xs text-white font-medium px-4 py-2 rounded-full border border-sky-400/40 hover:border-sky-400 bg-gradient-to-r from-sky-500/20 to-blue-600/20 hover:from-sky-500/30 hover:to-blue-600/30 backdrop-blur-md transition-all duration-200 shadow-[0_4px_20px_rgba(56,189,248,0.2)]"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-sky-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
