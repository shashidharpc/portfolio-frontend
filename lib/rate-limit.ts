interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding rate limiter
 * @param key Unique identifier (e.g. IP + endpoint)
 * @param limit Max allowed requests within window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 600000 // 10 minutes
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    memoryStore.set(key, newRecord);
    return { success: true, remaining: limit - 1, resetAt: newRecord.resetAt };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, resetAt: record.resetAt };
}
