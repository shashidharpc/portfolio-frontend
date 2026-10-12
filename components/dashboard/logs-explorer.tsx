"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Search,
  ShieldAlert,
  Activity,
} from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface AuditLogRecord {
  id: string;
  action: string;
  entity: string;
  entityId?: string | null;
  beforeJson?: string | null;
  afterJson?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date | string;
  user?: { email: string | null } | null;
}

interface EventLogRecord {
  id: string;
  type: string;
  path: string;
  entityId?: string | null;
  metadata?: string | null;
  ipHash?: string | null;
  userAgent?: string | null;
  dnt: boolean;
  createdAt: Date | string;
}

interface LogsExplorerProps {
  auditLogs: AuditLogRecord[];
  eventLogs: EventLogRecord[];
}

export function LogsExplorer({ auditLogs, eventLogs }: LogsExplorerProps) {
  const [activeTab, setActiveTab] = React.useState<"audit" | "events">("audit");
  const [search, setSearch] = React.useState("");
  const [actionFilter, setActionFilter] = React.useState("ALL");
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  function toggleRow(id: string) {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // Filter audit logs
  const filteredAudit = React.useMemo(() => {
    return auditLogs.filter((log) => {
      if (actionFilter !== "ALL" && log.action !== actionFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        log.entity.toLowerCase().includes(q) ||
        (log.entityId && log.entityId.toLowerCase().includes(q)) ||
        (log.user?.email && log.user.email.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.includes(q))
      );
    });
  }, [auditLogs, actionFilter, search]);

  // Filter event logs
  const filteredEvents = React.useMemo(() => {
    return eventLogs.filter((evt) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        evt.type.toLowerCase().includes(q) ||
        evt.path.toLowerCase().includes(q) ||
        (evt.ipHash && evt.ipHash.toLowerCase().includes(q))
      );
    });
  }, [eventLogs, search]);

  const activeList = activeTab === "audit" ? filteredAudit : filteredEvents;
  const totalPages = Math.ceil(activeList.length / pageSize) || 1;
  const paginatedList = activeList.slice((page - 1) * pageSize, page * pageSize);

  function getActionBadgeVariant(action: string) {
    switch (action) {
      case "CREATE":
        return "success";
      case "DELETE":
        return "outline";
      case "LAYOUT_CHANGE":
        return "gradient";
      default:
        return "secondary";
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Audit & Telemetry Logs
          </h1>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] mt-1">
            Complete cryptographic audit trail of state mutations, session events, and anonymized traffic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2 text-xs">
            <a href="/api/export/logs" download>
              <Download className="h-3.5 w-3.5" />
              Export Audit CSV
            </a>
          </Button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "audit" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveTab("audit");
              setPage(1);
            }}
            className="text-xs gap-1.5"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            Audit Trail ({filteredAudit.length})
          </Button>
          <Button
            variant={activeTab === "events" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setActiveTab("events");
              setPage(1);
            }}
            className="text-xs gap-1.5"
          >
            <Activity className="h-3.5 w-3.5" />
            Telemetry Events ({filteredEvents.length})
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "audit" && (
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="h-[36px] rounded-[10px] border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs text-[var(--foreground)]"
            >
              <option value="ALL">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="LOGIN">LOGIN</option>
              <option value="LAYOUT_CHANGE">LAYOUT_CHANGE</option>
            </select>
          )}

          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--foreground-muted)]" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search logs..."
              className="h-[36px] pl-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-[16px] border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
        {activeTab === "audit" ? (
          <div className="divide-y divide-[var(--border)]">
            {paginatedList.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--foreground-muted)]">
                No audit log records match the selected criteria.
              </div>
            ) : (
              (paginatedList as AuditLogRecord[]).map((log) => {
                const isExpanded = !!expandedRows[log.id];
                const hasDiff = log.beforeJson || log.afterJson;

                return (
                  <div key={log.id} className="flex flex-col transition-colors">
                    <div
                      onClick={() => hasDiff && toggleRow(log.id)}
                      className={`p-4 flex items-center justify-between text-xs cursor-pointer hover:bg-[var(--surface-hover)] ${
                        isExpanded ? "bg-[var(--surface)]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {hasDiff ? (
                          <button className="text-[var(--foreground-muted)] hover:text-[#7C3AED]">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        ) : (
                          <div className="w-4" />
                        )}

                        <Badge
                          variant={getActionBadgeVariant(log.action)}
                          className="font-mono text-[10px] uppercase"
                        >
                          {log.action}
                        </Badge>

                        <span className="font-semibold text-[var(--foreground)]">
                          {log.entity}
                        </span>

                        {log.entityId && (
                          <span className="font-mono text-[11px] text-[var(--foreground-muted)] truncate max-w-[150px]">
                            {log.entityId}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <span className="font-mono text-[11px] text-[var(--foreground-secondary)] hidden md:inline">
                          {log.user?.email || "System"}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                          {formatDateTime(log.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Expandable JSON Diff Row */}
                    {isExpanded && (
                      <div className="p-4 bg-[var(--surface)] border-t border-[var(--border-subtle)] space-y-3">
                        <div className="text-[11px] font-mono text-[var(--foreground-muted)] flex items-center justify-between">
                          <span>
                            IP: <strong>{log.ipAddress || "Internal"}</strong>
                          </span>
                          <span>
                            User Agent: <strong className="truncate max-w-sm">{log.userAgent || "N/A"}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Before State */}
                          <div className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] p-3">
                            <div className="text-[11px] font-mono font-semibold text-rose-500 mb-2">
                              BEFORE MUTATION:
                            </div>
                            <pre className="text-[11px] font-mono text-[var(--foreground-secondary)] overflow-x-auto whitespace-pre-wrap max-h-48">
                              {log.beforeJson
                                ? JSON.stringify(JSON.parse(log.beforeJson), null, 2)
                                : "null (Record created)"}
                            </pre>
                          </div>

                          {/* After State */}
                          <div className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] p-3">
                            <div className="text-[11px] font-mono font-semibold text-emerald-500 mb-2">
                              AFTER MUTATION:
                            </div>
                            <pre className="text-[11px] font-mono text-[var(--foreground-secondary)] overflow-x-auto whitespace-pre-wrap max-h-48">
                              {log.afterJson
                                ? JSON.stringify(JSON.parse(log.afterJson), null, 2)
                                : "null (Record deleted)"}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {paginatedList.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--foreground-muted)]">
                No telemetry events logged yet.
              </div>
            ) : (
              (paginatedList as EventLogRecord[]).map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 flex items-center justify-between text-xs hover:bg-[var(--surface-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {evt.type}
                    </Badge>
                    <span className="font-mono text-xs text-[var(--foreground)]">
                      {evt.path}
                    </span>
                    {evt.entityId && (
                      <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                        id: {evt.entityId}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <span className="font-mono text-[11px] text-[var(--foreground-muted)] hidden sm:inline">
                      Salted IP: {evt.ipHash || "N/A"}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                      {formatDateTime(evt.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[var(--foreground-muted)]">
            Page {page} of {totalPages} ({activeList.length} total entries)
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-xs h-8"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="text-xs h-8"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
