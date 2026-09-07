import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

export const Projects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06]"
      aria-label="Projects section"
    >
      <div className="space-y-10">
        {/* Section Heading */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            A few projects I&apos;ve built recently.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-5">
          {portfolioConfig.projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="group relative p-6 sm:p-7 rounded-2xl bg-[#0e121b]/60 hover:bg-[#121622]/85 border border-white/[0.07] hover:border-white/[0.18] transition-all duration-300 ease-out shadow-[0_8px_28px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
            >
              {/* Card Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Number & Titles */}
                <div className="space-y-2.5 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-zinc-300 bg-white/[0.05] border border-white/[0.08]">
                      {project.id}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links (Modern Rounded Full Buttons) */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:self-start">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-white/[0.22] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Code</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>
                  )}

                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-200 hover:text-white px-4 py-1.5 rounded-full border border-white/[0.12] hover:border-white/[0.26] bg-white/[0.06] hover:bg-white/[0.12] transition-all duration-200 shadow-sm"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Demo</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
