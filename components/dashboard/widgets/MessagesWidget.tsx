"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleMessageRead } from "@/features/messages/management-actions";
import { ArrowUpRight, CheckCircle2, Circle, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}

interface MessagesWidgetProps {
  messages: MessageItem[];
}

export function MessagesWidget({ messages }: MessagesWidgetProps) {
  const [items, setItems] = React.useState(messages);

  async function handleToggleRead(id: string) {
    // Optimistic toggle
    setItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
    await toggleMessageRead(id);
  }

  const unreadCount = items.filter((m) => !m.isRead).length;

  return (
    <Card className="h-full flex flex-col border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#7C3AED]" />
          Messages Inbox
          {unreadCount > 0 && (
            <span className="rounded-full bg-[#7C3AED] px-2 py-0.5 text-[10px] font-mono font-bold text-white">
              {unreadCount} new
            </span>
          )}
        </CardTitle>
        <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
          <Link href="/dashboard/messages">
            View All
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 pt-1 flex-1">
        {items.length === 0 ? (
          <div className="text-xs text-[var(--foreground-muted)] py-6 text-center">
            No contact submissions received yet.
          </div>
        ) : (
          items.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className={`flex flex-col rounded-[10px] border p-2.5 transition-all ${
                !m.isRead
                  ? "border-[#7C3AED]/30 bg-[#7C3AED]/5"
                  : "border-[var(--border-subtle)] bg-[var(--surface)] opacity-85"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleRead(m.id)}
                    className="text-[#7C3AED] hover:opacity-80"
                    title={m.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {m.isRead ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 fill-[#7C3AED] text-[#7C3AED]" />
                    )}
                  </button>
                  <span className="text-xs font-semibold text-[var(--foreground)]">
                    {m.name}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                    &lt;{m.email}&gt;
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                  {formatDate(m.createdAt)}
                </span>
              </div>
              <p className="text-xs text-[var(--foreground-secondary)] line-clamp-1 pl-5">
                {m.subject ? `${m.subject}: ` : ""}
                {m.message}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
