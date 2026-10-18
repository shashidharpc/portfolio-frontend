"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { submitContactMessage } from "@/features/messages/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function PortfolioContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [copiedType, setCopiedType] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your message has been directly dispatched to Shashidhar P C. You will receive a response shortly.",
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message: res.error || "Failed to submit message. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "Network error occurred. Please try reaching out directly via email at shashidharpc1012@gmail.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/40 relative">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#8B5CF6] mb-2 block">
            07 // Direct Communication
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Initiate a Conversation
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] mt-3 leading-relaxed">
            Interested in exploring full-stack engineering opportunities, discussing system architecture, or reviewing technical blueprints? Reach out directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Direct Email Card */}
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm hover:border-[#8B5CF6]/40 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#8B5CF6]/15 text-[#8B5CF6]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-wider block">
                      Email Address
                    </span>
                    <a
                      href="mailto:shashidharpc1012@gmail.com"
                      className="text-sm sm:text-base font-bold text-[var(--foreground)] hover:text-[#8B5CF6] transition-colors"
                    >
                      shashidharpc1012@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleCopy("shashidharpc1012@gmail.com", "email")
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[#8B5CF6]/40 transition-all"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedType === "email" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm hover:border-emerald-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-emerald-500/15 text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-wider block">
                      Mobile & WhatsApp
                    </span>
                    <a
                      href="tel:+917349128889"
                      className="text-sm sm:text-base font-bold text-[var(--foreground)] hover:text-emerald-400 transition-colors"
                    >
                      +91 7349128889
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy("+91 7349128889", "phone")}
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-emerald-500/40 transition-all"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedType === "phone" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location & Social Card */}
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3.5 mb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-blue-500/15 text-[#3B82F6]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[var(--foreground-muted)] uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                    Bengaluru, Karnataka, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://linkedin.com/in/shashidharpc"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-10 rounded-[10px] border border-[var(--border)] bg-[var(--surface-hover)] text-xs font-semibold text-[var(--foreground-secondary)] hover:text-[#3B82F6] hover:border-[#3B82F6]/50 transition-all"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/shashidharpc"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-10 rounded-[10px] border border-[var(--border)] bg-[var(--surface-hover)] text-xs font-semibold text-[var(--foreground-secondary)] hover:text-[#8B5CF6] hover:border-[#8B5CF6]/50 transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 rounded-[22px] border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          >
            {status.type === "success" ? (
              <div className="flex flex-col items-center text-center py-10 space-y-4 animate-in fade-in-50 duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  Message Transmitted Successfully
                </h3>
                <p className="text-sm text-[var(--foreground-secondary)] max-w-md leading-relaxed">
                  {status.message}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStatus({ type: "idle" })}
                  className="mt-4 border-[var(--border-strong)]"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <MessageSquare className="h-4 w-4 text-[#8B5CF6]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                    Direct Dispatch Channel
                  </span>
                </div>

                {status.type === "error" && (
                  <div className="rounded-[10px] bg-red-500/10 border border-red-500/25 p-3.5 text-xs text-red-400">
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-medium text-[var(--foreground)]"
                    >
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Alex Johnson"
                      required
                      disabled={isSubmitting}
                      className="bg-[var(--surface-hover)] border-[var(--border)] focus:border-[#8B5CF6]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-medium text-[var(--foreground)]"
                    >
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="alex@company.com"
                      required
                      disabled={isSubmitting}
                      className="bg-[var(--surface-hover)] border-[var(--border)] focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-medium text-[var(--foreground)]"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="e.g. Full Stack Role / Technical Project Inquiry"
                    disabled={isSubmitting}
                    className="bg-[var(--surface-hover)] border-[var(--border)] focus:border-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium text-[var(--foreground)]"
                  >
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your team, project requirements, or engineering challenge..."
                    required
                    disabled={isSubmitting}
                    className="bg-[var(--surface-hover)] border-[var(--border)] focus:border-[#8B5CF6]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 gap-2 font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] hover:from-[#7C3AED] hover:to-[#2563EB] text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Transmitting Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Dispatch Message to Shashidhar
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
