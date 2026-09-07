import React from "react";
import { portfolioConfig } from "../portfolio.config";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 sm:py-16 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.05]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div>
          <p>© {portfolioConfig.footer.year} {portfolioConfig.personal.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={portfolioConfig.contact.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
          <span className="text-zinc-700">·</span>
          <a
            href={portfolioConfig.contact.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-zinc-700">·</span>
          <a
            href={portfolioConfig.contact.socialLinks.emailLink}
            className="hover:text-zinc-200 transition-colors"
          >
            Email
          </a>
        </div>

        <div className="text-zinc-400 text-[11px] font-mono">
          {portfolioConfig.footer.signoff}
        </div>
      </div>
    </footer>
  );
};
