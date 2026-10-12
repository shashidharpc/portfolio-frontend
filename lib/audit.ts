import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

interface AuditLogParams {
  userId?: string | null;
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LAYOUT_CHANGE";
  entity: string;
  entityId?: string | null;
  before?: unknown;
  after?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export function logAuditSafe(params: AuditLogParams): void {
  // Fire and forget, never crash request
  Promise.resolve().then(async () => {
    try {
      const beforeJson = params.before !== undefined ? JSON.stringify(params.before) : null;
      const afterJson = params.after !== undefined ? JSON.stringify(params.after) : null;

      await prisma.auditLog.create({
        data: {
          userId: params.userId ?? null,
          action: params.action,
          entity: params.entity,
          entityId: params.entityId ?? null,
          beforeJson,
          afterJson,
          ipAddress: params.ipAddress ?? null,
          userAgent: params.userAgent ?? null,
        },
      });

      logger.info({
        msg: `[Audit] ${params.action} on ${params.entity}`,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        userId: params.userId,
      });
    } catch (err) {
      logger.error({
        msg: "Failed to write audit log",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });
}
