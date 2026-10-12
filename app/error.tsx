"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Global runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-6">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2">
        An Unexpected Error Occurred
      </h1>
      <p className="text-sm text-[var(--foreground-secondary)] max-w-md mb-8">
        A runtime exception was intercepted. You can attempt to re-render the segment or refresh the application.
      </p>
      <div className="flex items-center gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Attempt Recovery
        </Button>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Back Home
        </Button>
      </div>
    </div>
  );
}
