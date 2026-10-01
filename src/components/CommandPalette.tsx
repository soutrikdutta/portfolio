import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Terminal, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Layers, 
  Award, 
  Code2, 
  Compass, 
  ArrowRight,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCertifications: () => void;
}

interface CommandItem {
  id: string;
  category: 'NAVIGATION' | 'ACTIONS' | 'PROJECTS' | 'CONTACT';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onOpenCertifications
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { profile, projects } = PORTFOLIO_DATA;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied!`);
    setTimeout(() => onClose(), 600);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'About Soutrik Dutta',
      subtitle: 'B.Tech CSE student at Techno India University',
      icon: Compass,
      action: () => {
        onNavigateSection('#about');
        onClose();
      }
    },
    {
      id: 'nav-journey',
      category: 'NAVIGATION',
      title: 'My Journey',
      subtitle: 'St. Stephen’s School → TIU CSE → Hands-on Projects',
      icon: Terminal,
      action: () => {
        onNavigateSection('#journey');
        onClose();
      }
    },
    {
      id: 'nav-projects',
      category: 'NAVIGATION',
      title: 'Featured Projects',
      subtitle: 'SkillGrad & SHARODSHAV architectures',
      icon: Layers,
      action: () => {
        onNavigateSection('#projects');
        onClose();
      }
    },
    {
      id: 'nav-skills',
      category: 'NAVIGATION',
      title: 'Technical Skills Matrix',
      subtitle: '12 Core Stacks: React, Node, TypeScript, Python, AI',
      icon: Code2,
      action: () => {
        onNavigateSection('#skills');
        onClose();
      }
    },
    {
      id: 'nav-achievements',
      category: 'NAVIGATION',
      title: 'Recognition & Achievements',
      subtitle: 'Hackathons, coding milestones & academic honors',
      icon: Award,
      action: () => {
        onNavigateSection('#achievements');
        onClose();
      }
    },
    {
      id: 'nav-certs',
      category: 'NAVIGATION',
      title: 'Certifications Directory',
      subtitle: 'Verified credentials and certificates',
      icon: Award,
      action: () => {
        onOpenCertifications();
        onClose();
      }
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Contact & Collaboration',
      subtitle: 'Send direct inquiry or dispatch message',
      icon: Mail,
      action: () => {
        onNavigateSection('#contact');
        onClose();
      }
    },

    // Projects Direct Links
    {
      id: 'proj-skillgrad',
      category: 'PROJECTS',
      title: 'SkillGrad Live Demo',
      subtitle: 'Paid industry projects & student internship platform',
      icon: ExternalLink,
      action: () => {
        window.open(projects[0]?.liveUrl || 'https://skillgrad.vercel.app', '_blank');
        onClose();
      }
    },
    {
      id: 'proj-sharodshav',
      category: 'PROJECTS',
      title: 'SHARODSHAV Live Demo',
      subtitle: 'AI & crowd route optimization platform for Durga Puja',
      icon: ExternalLink,
      action: () => {
        window.open(projects[1]?.liveUrl || 'https://sharodshav-two.vercel.app', '_blank');
        onClose();
      }
    },

    // Actions & Contact
    {
      id: 'act-copy-email',
      category: 'ACTIONS',
      title: 'Copy Email Address',
      subtitle: profile.email,
      icon: Copy,
      action: () => handleCopy(profile.email, 'Email address')
    },
    {
      id: 'act-copy-phone',
      category: 'ACTIONS',
      title: 'Copy Phone Number',
      subtitle: profile.phone,
      icon: Phone,
      action: () => handleCopy(profile.phone, 'Phone number')
    },
    {
      id: 'act-github',
      category: 'ACTIONS',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/soutrikdutta',
      icon: Github,
      action: () => {
        window.open(profile.social.github, '_blank');
        onClose();
      }
    },
    {
      id: 'act-linkedin',
      category: 'ACTIONS',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/soutrik-dutta',
      icon: Linkedin,
      action: () => {
        window.open(profile.social.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose(); // Will toggle in parent
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md">
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl bg-zinc-950/95 border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,184,72,0.1)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-zinc-900/60">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm text-white font-mono placeholder:text-zinc-500 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded border border-white/10">
                  ESC
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Toast Feedback */}
            {toastMessage && (
              <div className="px-4 py-2 bg-[#00b848]/15 border-b border-[#00b848]/30 text-xs font-mono text-[#00b848] flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Command Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-zinc-500">
                  No commands matching &quot;{query}&quot;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#00b848]/15 border border-[#00b848]/40'
                          : 'border border-transparent hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#00b848]/20 text-[#00b848]'
                              : 'bg-zinc-900 text-zinc-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div
                            className={`text-xs font-mono font-medium truncate ${
                              isSelected ? 'text-white' : 'text-zinc-200'
                            }`}
                          >
                            {cmd.title}
                          </div>
                          <div className="text-[11px] font-space text-zinc-500 truncate">
                            {cmd.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[9px] font-mono text-zinc-600 uppercase px-1.5 py-0.5 rounded bg-zinc-900/80 border border-white/5">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-[#00b848]" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-zinc-950 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10">↵</kbd>
                  <span>to select</span>
                </span>
              </div>
              <span className="text-zinc-600">NOTHING OS HUD</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
