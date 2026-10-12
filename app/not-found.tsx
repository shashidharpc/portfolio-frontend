import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] text-center">
      <span className="font-mono text-sm font-semibold text-[#7C3AED] mb-2">
        404 ERROR
      </span>
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-3">
        Page Not Found
      </h1>
      <p className="text-base text-[var(--foreground-secondary)] max-w-md mb-8">
        The route you are navigating to could not be found or has moved to an alternate destination.
      </p>
      <Button asChild className="gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Link>
      </Button>
    </div>
  );
}
