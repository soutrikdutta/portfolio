import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, AlertTriangle, ArrowDown } from 'lucide-react';

export const openLiveDemoNotice = (projectTitle?: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-live-demo-notice', {
        detail: { projectTitle: projectTitle || 'Project' }
      })
    );
  }
};

interface LiveDemoUnavailableModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  projectTitle?: string;
  onNavigateToContact?: () => void;
}

export const LiveDemoUnavailableModal: React.FC<LiveDemoUnavailableModalProps> = ({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  projectTitle: controlledProjectTitle,
  onNavigateToContact
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [internalProjectTitle, setInternalProjectTitle] = useState<string>('');

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const projectTitle = controlledProjectTitle || internalProjectTitle;

  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Listen for global custom event
  useEffect(() => {
    const handleGlobalTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectTitle?: string }>;
      setInternalProjectTitle(customEvent.detail?.projectTitle || '');
      setInternalIsOpen(true);
    };

    window.addEventListener('open-live-demo-notice', handleGlobalTrigger);
    return () => window.removeEventListener('open-live-demo-notice', handleGlobalTrigger);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isControlled) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isControlled]);

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleContactClick = () => {
    handleClose();

    // Scroll to contact section
    setTimeout(() => {
      if (onNavigateToContact) {
        onNavigateToContact();
      } else {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Pre-fill or focus the message box if available
      setTimeout(() => {
        const messageInput = document.querySelector<HTMLTextAreaElement>('#contact textarea');
        if (messageInput) {
          if (!messageInput.value && projectTitle) {
            messageInput.value = `Hi Soutrik, I would like to explore the live demo for ${projectTitle}. Please share the demo link with me.`;
            messageInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          messageInput.focus();
        } else {
          const nameInput = document.querySelector<HTMLInputElement>('#contact input');
          if (nameInput) nameInput.focus();
        }
      }, 400);
    }, 120);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl cursor-pointer"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-zinc-950/95 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-default"
          >
            {/* Soft Ambient Depth Glow Base */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-[#00b848]/15 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />

            {/* Futuristic Corner Tech Accents */}
            <span className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#00b848]/60 pointer-events-none" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#00b848]/60 pointer-events-none" />
            <span className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#00b848]/60 pointer-events-none" />
            <span className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#00b848]/60 pointer-events-none" />

            {/* Header Status Row */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-amber-300 tracking-wider uppercase">
                  TRAFFIC LIMIT · NOTICE
                </span>
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 hover:border-[#00b848]/50 transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Close Notice"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notice Icon & Title */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-dot tracking-wide leading-tight">
                  Live Demo Temporarily Unavailable
                </h3>
                {projectTitle && (
                  <p className="text-[11px] font-mono text-[#00ff66] mt-1 tracking-wider uppercase truncate">
                    // {projectTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Exact Requested Message */}
            <div className="space-y-3.5 mb-6 text-sm text-zinc-300 font-space leading-relaxed border-y border-white/10 py-4 bg-white/[0.02] -mx-6 sm:-mx-8 px-6 sm:px-8">
              <p className="text-zinc-200">
                The live demo is currently disabled due to high traffic. If you&apos;d like to explore the project, please contact me using the form below, and I&apos;ll share the demo link with you personally.
              </p>
              <p className="text-xs font-mono text-zinc-400 font-medium">
                Thank you for your understanding!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 text-xs font-mono transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                Dismiss
              </button>

              <button
                type="button"
                onClick={handleContactClick}
                className="relative overflow-hidden px-5 py-2.5 rounded-full bg-[#00b848] hover:bg-[#00c853] text-black text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_20px_rgba(0,184,72,0.35)] hover:scale-105 active:scale-95 font-space cursor-pointer"
              >
                <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
                <Mail className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Contact Me Below</span>
                <ArrowDown className="w-3.5 h-3.5 relative z-10 animate-bounce" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
