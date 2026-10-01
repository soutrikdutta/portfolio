import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Phone, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FluxCard } from './FluxCard';
import { GlyphDecryptText } from './GlyphDecryptText';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contactInfo?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    setErrors({});
    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      contactInfo: contactInfo.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
      docId: '1Z6UBnAo7RpL5pCn9z12jKHnFl57M_tftip5NdupWHH4'
    };

    try {
      const webhookUrl =
        import.meta.env.VITE_GOOGLE_DOC_WEBHOOK_URL ||
        'https://script.google.com/macros/s/AKfycbzEbZfXfImapVExTWL5l_dk3v80Bz7gxfq2r0ksCbFdv9e-m1P4zZQQ59Z4zXE46X758g/exec';

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (err) {
      console.warn('Google Doc sync notice:', err);
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-wider text-white font-dot mb-3">
            <GlyphDecryptText text="LET'S BUILD SOMETHING" speed={28} />
          </h2>
          <div className="my-3.5 flex items-center justify-center gap-2">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0.5 }}
              className="h-[2px] w-28 bg-gradient-to-r from-transparent via-[#00ff66] to-transparent rounded-full"
            />
          </div>
          <p className="text-zinc-300 text-sm sm:text-base font-space max-w-xl mx-auto">
            Have a project in mind, an opportunity, or want to collaborate? Connect directly or leave a message below.
          </p>
        </motion.div>

        {/* Small Channel Buttons: LinkedIn, GitHub, Call, Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10 transform-gpu will-change-transform"
        >
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#00b848]/60 text-xs font-space text-zinc-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 group tracking-wide"
            title="Open LinkedIn Profile"
          >
            <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
            <Linkedin className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
            <span className="relative z-10 font-medium">LinkedIn</span>
          </a>

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#00b848]/60 text-xs font-space text-zinc-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 group tracking-wide"
            title="Open GitHub Profile"
          >
            <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer-sweep" />
            <Github className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
            <span className="relative z-10 font-medium">GitHub</span>
          </a>

          <a
            href={`tel:${profile.phone.replace(/\s+/g, '')}`}
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#00b848]/60 text-xs font-space text-zinc-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 group cursor-pointer tracking-wide"
            title="Call Soutrik (+91 89022 81688)"
          >
            <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
            <Phone className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
            <span className="relative z-10 font-medium">Call</span>
          </a>

          <button
            onClick={handleEmailClick}
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 hover:border-[#00b848]/60 text-xs font-space text-zinc-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(0,184,72,0.3)] hover:scale-105 active:scale-95 group cursor-pointer tracking-wide"
            title="Send Email via Gmail / Mail App"
          >
            <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent animate-shimmer-sweep" />
            <Mail className="w-3.5 h-3.5 relative z-10 text-white/80 group-hover:text-[#00ff66] transition-colors" />
            <span className="relative z-10 font-medium">Email</span>
          </button>
        </motion.div>

        {/* Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.08 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="transform-gpu will-change-transform"
        >
          <FluxCard className="p-6 sm:p-10 border-white/10 hover:border-[#00b848]/30">
            {submitSuccess ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-zinc-900 border border-[#00b848]/40 flex items-center justify-center text-[#00ff66] shadow-[0_0_30px_rgba(0,184,72,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00b848]/15 border border-[#00b848]/30 text-[#00ff66] text-xs font-mono mb-4">
                  TRANSMISSION CONFIRMED
                </div>
                <h3 className="text-2xl font-bold text-white font-space mb-3">
                  Message Transmitted
                </h3>
                <p className="text-base sm:text-lg text-zinc-100 font-space max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                  Thanks for reaching out. Your message means a lot to me. I’ll get back to you as soon as possible.
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
                    className="relative overflow-hidden px-6 py-2.5 rounded-full bg-[#00b848] hover:bg-[#00c853] text-xs font-semibold text-black transition-all duration-300 cursor-pointer shadow-md hover:scale-105 active:scale-95 font-space tracking-wide"
                  >
                    <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer-sweep" />
                    <span className="relative z-10">Send Another Message</span>
                  </button>
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio Note from ${name}`)}&body=${encodeURIComponent(message)}`}
                    className="relative overflow-hidden px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-200 hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 font-space tracking-wide"
                  >
                    <span className="relative z-10">Send Email Copy (Optional)</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-white mb-2 uppercase tracking-wide font-medium font-space">
                      Name <span className="text-[#00ff66]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="YOUR NAME"
                      className={`w-full bg-black/60 border ${errors.name ? 'border-red-500/80 focus:border-red-400 bg-red-950/10' : 'border-white/10 focus:border-[#00b848]'} rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:bg-zinc-950/80 outline-none transition-all font-space`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-space">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-white mb-2 uppercase tracking-wide font-medium font-space">
                      Contact Info (Email or Phone) <span className="text-[#00ff66]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (errors.contactInfo) setErrors(prev => ({ ...prev, contactInfo: undefined }));
                      }}
                      placeholder="EMAIL@EXAMPLE.COM OR PHONE"
                      className={`w-full bg-black/60 border ${errors.contactInfo ? 'border-red-500/80 focus:border-red-400 bg-red-950/10' : 'border-white/10 focus:border-[#00b848]'} rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:bg-zinc-950/80 outline-none transition-all font-space`}
                    />
                    {errors.contactInfo && (
                      <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-space">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.contactInfo}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white mb-2 uppercase tracking-wide font-medium font-space">
                    Message <span className="text-[#00ff66]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                    }}
                    placeholder="TELL ME ABOUT YOUR IDEA OR PROJECT..."
                    className={`w-full bg-black/60 border ${errors.message ? 'border-red-500/80 focus:border-red-400 bg-red-950/10' : 'border-white/10 focus:border-[#00b848]'} rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:bg-zinc-950/80 outline-none transition-all resize-y leading-relaxed font-space`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-space">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4 font-space">
                  <span className="text-[11px] text-zinc-300">
                    DIRECT RECIPIENT: <span className="text-[#00ff66] font-semibold">{profile.email}</span>
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden px-8 py-3.5 bg-[#00b848] hover:bg-[#00c853] disabled:opacity-50 text-black font-bold text-xs rounded-full transition-all duration-300 flex items-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,184,72,0.35)] hover:shadow-[0_4px_30px_rgba(0,184,72,0.6)] hover:scale-105 active:scale-95 font-space tracking-wide group"
                  >
                    <span className="pointer-events-none absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
                    {isSubmitting ? (
                      <span className="relative z-10">Sending...</span>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <Send className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </FluxCard>
        </motion.div>
      </div>
    </section>
  );
};

