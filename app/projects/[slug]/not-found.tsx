import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--background)] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2">
        Project Not Found
      </h1>
      <p className="text-sm text-[var(--foreground-secondary)] max-w-md mb-8">
        The project you requested does not exist or has been unpublished by the administrator.
      </p>
      <Button asChild className="gap-2">
        <Link href="/#projects">
          <ArrowLeft className="h-4 w-4" />
          Return to Projects
        </Link>
      </Button>
    </div>
  );
}
