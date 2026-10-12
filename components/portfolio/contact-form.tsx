"use client";

import * as React from "react";
import { submitContactMessage } from "@/features/messages/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function PortfolioContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

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
          message: "Thank you for reaching out! Your message was received and logged. I will respond promptly.",
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
        message: "Network error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-[var(--border)] bg-[var(--surface)]/30">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#7C3AED] mb-2 block">
            05 // Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Initiate a Conversation
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground-secondary)] mt-3">
            Whether exploring an architectural consultation, fullstack engagement, or technical advising, send a direct message below.
          </p>
        </div>

        <div className="max-w-xl mx-auto rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_4px_24px_rgba(20,18,43,0.04)]">
          {status.type === "success" ? (
            <div className="flex flex-col items-center text-center py-8 space-y-4 animate-in fade-in-50 duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Message Dispatched
              </h3>
              <p className="text-sm text-[var(--foreground-secondary)] max-w-sm">
                {status.message}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatus({ type: "idle" })}
                className="mt-4"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status.type === "error" && (
                <div className="rounded-[10px] bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400">
                  {status.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-[var(--foreground)]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-[var(--foreground)]">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-[var(--foreground)]">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="e.g. Architecture consulting or project collaboration"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-[var(--foreground)]">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Describe your initiative, goals, or timeline..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
