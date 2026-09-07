import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolioConfig } from "../portfolio.config";
import { Linkedin, Github, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write a short message";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const endpoint = portfolioConfig.contact.formEndpoint;
      const web3FormsKey = portfolioConfig.contact.web3FormsKey;

      if (web3FormsKey || (endpoint && !endpoint.includes("api.web3forms.com"))) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Contact from ${formData.name}`,
            from_name: "Portfolio Inquiry",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message. Please try again.");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try emailing directly."
      );
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8 border-t border-white/[0.06]"
      aria-label="Contact section"
    >
      <div className="space-y-10">
        {/* Heading & Subtext */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {portfolioConfig.contact.heading}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
            {portfolioConfig.contact.subtext}
          </p>
        </div>

        {/* Three Compact Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.a
            href={portfolioConfig.contact.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 shadow-sm"
          >
            <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
            <span>LinkedIn</span>
          </motion.a>

          <motion.a
            href={portfolioConfig.contact.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 shadow-sm"
          >
            <Github className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub</span>
          </motion.a>

          <motion.a
            href={`tel:${portfolioConfig.contact.phone}`}
            whileHover={shouldReduceMotion ? {} : { y: -1, scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-200 shadow-sm"
            title="Direct phone call"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>Call Me</span>
          </motion.a>
        </div>

        {/* Frosted Glass Contact Form Container */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0e121b]/65 backdrop-blur-xl border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.35)] max-w-xl"
        >
          {status === "success" ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-white">
                Message sent. I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-4 transition-colors pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-medium text-zinc-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-400 bg-white/[0.025] border transition-all ${
                    errors.name
                      ? "border-rose-500/50 focus:border-rose-500"
                      : "border-white/[0.08] focus:border-white/[0.25]"
                  } focus:outline-none focus:bg-white/[0.04] focus:ring-1 focus:ring-white/15`}
                />
                {errors.name && (
                  <p id="name-error" className="text-[11px] text-rose-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-medium text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-400 bg-white/[0.025] border transition-all ${
                    errors.email
                      ? "border-rose-500/50 focus:border-rose-500"
                      : "border-white/[0.08] focus:border-white/[0.25]"
                  } focus:outline-none focus:bg-white/[0.04] focus:ring-1 focus:ring-white/15`}
                />
                {errors.email && (
                  <p id="email-error" className="text-[11px] text-rose-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-medium text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-400 bg-white/[0.025] border transition-all resize-none ${
                    errors.message
                      ? "border-rose-500/50 focus:border-rose-500"
                      : "border-white/[0.08] focus:border-white/[0.25]"
                  } focus:outline-none focus:bg-white/[0.04] focus:ring-1 focus:ring-white/15`}
                />
                {errors.message && (
                  <p id="message-error" className="text-[11px] text-rose-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Error state display */}
              {status === "error" && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={shouldReduceMotion || status === "sending" ? {} : { scale: 1.02, y: -1 }}
                  whileTap={shouldReduceMotion || status === "sending" ? {} : { scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full bg-white/[0.09] hover:bg-white/[0.16] text-white text-xs sm:text-sm font-medium border border-white/[0.14] hover:border-white/[0.28] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 text-zinc-400" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
