"use client";

import * as React from "react";
import {
  toggleMessageRead,
  deleteMessage,
} from "@/features/messages/management-actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Circle,
  Mail,
  MailOpen,
  Search,
  Trash2,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  isRead: boolean;
  ipHash?: string | null;
  createdAt: Date | string;
}

export function MessagesInbox({ initialMessages }: { initialMessages: MessageItem[] }) {
  const [messages, setMessages] = React.useState<MessageItem[]>(initialMessages);
  const [search, setSearch] = React.useState("");
  const [filterUnreadOnly, setFilterUnreadOnly] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState<MessageItem | null>(
    initialMessages[0] || null
  );

  async function handleToggleRead(id: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: !m.isRead } : m))
    );
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, isRead: !prev.isRead } : null));
    }
    await toggleMessageRead(id);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this message?")) return;

    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    await deleteMessage(id);
  }

  const filtered = messages.filter((m) => {
    if (filterUnreadOnly && m.isRead) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      m.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Messages Inbox
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
            Incoming communications transmitted via the public portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={filterUnreadOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
            className="text-xs"
          >
            {filterUnreadOnly ? "Showing Unread Only" : "Filter Unread"}
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-muted)]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by sender, email, or content..."
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Messages List (5 cols) */}
        <div className="md:col-span-5 rounded-[16px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm divide-y divide-[var(--border)] max-h-[700px] overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--foreground-muted)]">
              No matching messages found.
            </div>
          ) : (
            filtered.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#7C3AED]/10 border-l-4 border-l-[#7C3AED]"
                      : msg.isRead
                      ? "hover:bg-[var(--surface-hover)] bg-[var(--card)]"
                      : "bg-[#7C3AED]/5 font-semibold hover:bg-[#7C3AED]/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {!msg.isRead && (
                        <Circle className="h-2 w-2 fill-[#7C3AED] text-[#7C3AED] flex-shrink-0" />
                      )}
                      <span className="text-xs font-bold text-[var(--foreground)] truncate">
                        {msg.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--foreground-muted)]">
                      {formatDateTime(msg.createdAt)}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--foreground-secondary)] truncate">
                    {msg.subject || "(No subject)"}
                  </div>
                  <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-1 mt-1 font-normal">
                    {msg.message}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Message Detail View (7 cols) */}
        <div className="md:col-span-7">
          {selectedMessage ? (
            <Card className="border-[var(--border)] bg-[var(--card)]">
              <CardHeader className="border-b border-[var(--border)] pb-4 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {selectedMessage.subject || "Message from " + selectedMessage.name}
                  </CardTitle>
                  <div className="flex flex-col gap-0.5 mt-2 text-xs text-[var(--foreground-secondary)]">
                    <div>
                      From: <strong>{selectedMessage.name}</strong> &lt;
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-[#7C3AED] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                      &gt;
                    </div>
                    <div className="font-mono text-[11px] text-[var(--foreground-muted)]">
                      Received: {formatDateTime(selectedMessage.createdAt)}
                    </div>
                    {selectedMessage.ipHash && (
                      <div className="font-mono text-[10px] text-[var(--foreground-muted)]">
                        Salted IP Hash: {selectedMessage.ipHash}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleRead(selectedMessage.id)}
                    className="h-[34px] px-2.5 text-xs gap-1.5"
                  >
                    {selectedMessage.isRead ? (
                      <>
                        <Mail className="h-3.5 w-3.5" />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <MailOpen className="h-3.5 w-3.5 text-emerald-500" />
                        Mark Read
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="h-[34px] px-2 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    title="Delete message"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="whitespace-pre-wrap text-sm text-[var(--foreground)] leading-relaxed">
                  {selectedMessage.message}
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
                  <Button asChild size="sm" className="gap-2">
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || "Portfolio Contact")}`}>
                      Reply via Email Client
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-[var(--border)] bg-[var(--card)] p-12 text-center text-xs text-[var(--foreground-muted)]">
              Select an inquiry on the left to read full transmission.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
