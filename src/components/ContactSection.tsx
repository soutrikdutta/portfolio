import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Phone, Mail, Send, AlertCircle, ArrowUpRight } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { SectionHeader } from './SectionHeader';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useScrollDirection } from '../hooks/useScrollAnimation';

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const direction = useScrollDirection();
  const offset = direction === 'down' ? 26 : -26;

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contactInfo?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ message?: string; name?: string }>;
      if (customEvent.detail?.message) {
        setMessage(customEvent.detail.message);
        setErrors(prev => ({ ...prev, message: undefined }));
      }
      if (customEvent.detail?.name) {
        setName(customEvent.detail.name);
        setErrors(prev => ({ ...prev, name: undefined }));
      }
    };

    window.addEventListener('prefill-contact-message', handlePrefill);
    return () => window.removeEventListener('prefill-contact-message', handlePrefill);
  }, []);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s\-()]/g, '');
    return /^\+?[0-9]{10,15}$/.test(cleaned);
  };

  const validateContact = (info: string): { valid: boolean; message?: string } => {
    const trimmed = info.trim();
    if (!trimmed) {
      return { valid: false, message: 'Please enter your email address or phone number.' };
    }

    if (trimmed.includes('@') || /[a-zA-Z]/.test(trimmed)) {
      if (!validateEmail(trimmed)) {
        return { valid: false, message: 'Please enter a valid email address (e.g. name@domain.com).' };
      }
      return { valid: true };
    }

    if (!validatePhone(trimmed)) {
      return { valid: false, message: 'Please enter a valid phone number with country code (e.g. +91 9876543210 or 10-digit mobile).' };
    }

    return { valid: true };
  };

  const handleEmailClick = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `mailto:${profile.email}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || submitSuccess) return;

    const newErrors: { name?: string; contactInfo?: string; message?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your name (minimum 2 characters).';
    }

    const contactCheck = validateContact(contactInfo);
    if (!contactCheck.valid) {
      newErrors.contactInfo = contactCheck.message;
    }

    if (!message.trim() || message.trim().length < 5) {
      newErrors.message = 'Please enter your message (minimum 5 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const payload = {
      name: name.trim(),
      contactInfo: contactInfo.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
      docId: '1Z6UBnAo7RpL5pCn9z12jKHnFl57M_tftip5NdupWHH4'
    };

    setSubmitSuccess(true);

    const webhookUrl =
      import.meta.env.VITE_GOOGLE_DOC_WEBHOOK_URL ||
      'https://script.google.com/macros/s/AKfycbzEbZfXfImapVExTWL5l_dk3v80Bz7gxfq2r0ksCbFdv9e-m1P4zZQQ59Z4zXE46X758g/exec';

    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.warn('Background contact sync notice:', err);
    });
  };

  const inputBase =
    'w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:bg-white/[0.06] outline-none transition-all duration-300 font-space';

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeader
            align="center"
            tag="CONNECT"
            title="GET IN TOUCH"
            subtitle="Have a project in mind, an internship opportunity, or want to collaborate? My inbox is always open."
          />
        </motion.div>

        {/* Channels */}
        <motion.div
          initial={{ opacity: 0, y: offset * 0.7 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
        >
          {[
            { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
            { href: profile.social.github, icon: Github, label: 'GitHub', external: true },
          ].map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 hover:text-[#00f59b] hover:border-[#00f59b]/40 transition-all duration-300 shadow-sm"
            >
              <channel.icon className="w-3.5 h-3.5" />
              <span>{channel.label}</span>
              <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 hover:text-[#00f59b] hover:border-[#00f59b]/40 transition-all duration-300 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <button
            onClick={handleEmailClick}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-zinc-300 hover:text-[#00f59b] hover:border-[#00f59b]/40 transition-all duration-300 cursor-pointer shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: offset }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="transform-gpu will-change-transform"
        >
          <FluxCard className="p-6 sm:p-10 overflow-hidden bg-zinc-950/80 border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="py-10 text-center flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-20 h-20 mb-7 rounded-full bg-zinc-900 border border-[#00f59b]/40 flex items-center justify-center text-[#00f59b] shadow-[0_0_50px_-10px_rgba(0,245,155,0.4)]"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1.25], opacity: [0.6, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute -inset-1 rounded-full border border-[#00f59b]/50 pointer-events-none"
                    />
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <motion.circle cx="12" cy="12" r="9.5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.45 }} />
                      <motion.path d="m8.5 12 2.5 2.5 5-5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.25, duration: 0.35 }} />
                    </svg>
                  </motion.div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#00f59b]/30 bg-[#00f59b]/10 text-[#00f59b] text-[10px] font-mono mb-4 tracking-[0.14em] uppercase font-bold">
                    Message Dispatched
                  </span>

                  <h3 className="font-dot text-3xl sm:text-4xl text-white font-bold mb-3">
                    Thank You For Reaching Out
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 font-space max-w-md mx-auto mb-8 leading-relaxed">
                    Your message has been safely logged. I will review and respond to your inquiry shortly.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setName('');
                        setContactInfo('');
                        setMessage('');
                        setErrors({});
                      }}
                      className="btn-primary"
                    >
                      Send another message
                    </button>
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio Inquiry from ${name}`)}&body=${encodeURIComponent(message)}`}
                      className="btn-ghost"
                    >
                      Email a copy
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider mb-2 text-zinc-300 font-semibold">
                        Name <span className="text-[#00f59b]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Your name"
                        className={`${inputBase} ${errors.name ? 'border-red-500/70' : 'border-white/10 focus:border-[#00f59b]/60'}`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1.5 text-[11px] text-red-400 mt-2 font-space">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider mb-2 text-zinc-300 font-semibold">
                        Email or Phone <span className="text-[#00f59b]">*</span>
                      </label>
                      <input
                        id="contact-info"
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => {
                          setContactInfo(e.target.value);
                          if (errors.contactInfo) setErrors(prev => ({ ...prev, contactInfo: undefined }));
                        }}
                        placeholder="you@example.com"
                        className={`${inputBase} ${errors.contactInfo ? 'border-red-500/70' : 'border-white/10 focus:border-[#00f59b]/60'}`}
                      />
                      {errors.contactInfo && (
                        <p className="flex items-center gap-1.5 text-[11px] text-red-400 mt-2 font-space">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.contactInfo}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider mb-2 text-zinc-300 font-semibold">
                      Message <span className="text-[#00f59b]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Tell me about your project, idea, or role..."
                      className={`${inputBase} resize-y leading-relaxed ${errors.message ? 'border-red-500/70' : 'border-white/10 focus:border-[#00f59b]/60'}`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1.5 text-[11px] text-red-400 mt-2 font-space">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-400 font-mono">
                      {profile.email}
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary !px-7 !py-3.5 disabled:opacity-50 group cursor-pointer shadow-[0_0_20px_rgba(0,245,155,0.3)]"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </FluxCard>
        </motion.div>
      </div>
    </section>
  );
};
