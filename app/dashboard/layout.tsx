import * as React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If session is missing, redirect to login
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader userEmail={session.user.email} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
