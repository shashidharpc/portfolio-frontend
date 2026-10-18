"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email address or master password. Please verify credentials.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemo() {
    setEmail("admin@portfolio.dev");
    setPassword("adminpassword123");
    setError(null);
  }

  return (
    <div className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_8px_32px_rgba(20,18,43,0.06)]">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white shadow-[0_4px_16px_rgba(124,58,237,0.3)] mb-4">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Admin Authentication
        </h1>
        <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
          Sign in to manage projects, review telemetry, and customize your dashboard.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-[10px] bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-[var(--foreground)]">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="admin@portfolio.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs font-medium text-[var(--foreground)]">
            Master Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full gap-2 mt-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying Session...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Access Dashboard
            </>
          )}
        </Button>
      </form>

      {/* Quick Demo Credentials Pill */}
      <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] text-center">
        <p className="text-xs text-[var(--foreground-muted)] mb-2.5">
          Testing locally? Click below to auto-populate seeded admin credentials:
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={fillDemo}
          className="w-full gap-2 text-xs border-dashed"
        >
          <KeyRound className="h-3.5 w-3.5 text-[#7C3AED]" />
          Auto-fill Seed Admin Credentials
        </Button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 relative">
      {/* Ambient background blur */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-[#7C3AED]/20 to-[#3B82F6]/15 blur-[100px] opacity-70"
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--foreground-muted)] hover:text-[#7C3AED] transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Public Portfolio
        </Link>

        <React.Suspense
          fallback={
            <div className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] p-8 text-center text-xs text-[var(--foreground-muted)]">
              Loading authentication...
            </div>
          }
        >
          <LoginForm />
        </React.Suspense>
      </div>
    </div>
  );
}
