import crypto from "crypto";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";

interface EventLogParams {
  type: "PAGE_VIEW" | "PROJECT_VIEW" | "CONTACT_SUBMIT" | "ERROR";
  path: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
  dnt?: boolean;
}

const SALT = process.env.AUTH_SECRET || "default_anonymization_salt";

function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  return crypto.createHmac("sha256", SALT).update(ip).digest("hex").slice(0, 16);
}

export function logEventSafe(params: EventLogParams): void {
  // If Do Not Track is enabled, respect user preference
  if (params.dnt) {
    logger.debug({ msg: "Event skipped due to DNT flag", path: params.path });
    return;
  }

  Promise.resolve().then(async () => {
    try {
      await prisma.eventLog.create({
        data: {
          type: params.type,
          path: params.path,
          entityId: params.entityId ?? null,
          metadata: params.metadata ? JSON.stringify(params.metadata) : null,
          ipHash: hashIp(params.ip),
          userAgent: params.userAgent?.slice(0, 200) ?? null,
          dnt: Boolean(params.dnt),
        },
      });
    } catch (err) {
      logger.error({
        msg: "Failed to write event log",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  });
}
