"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { logEventSafe } from "@/lib/analytics";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export async function submitContactMessage(formData: FormData) {
  const reqHeaders = await headers();
  const forwarded = reqHeaders.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const userAgent = reqHeaders.get("user-agent") || "";
  const dnt = reqHeaders.get("dnt") === "1";

  // 1. Rate limiting
  const rateLimitResult = checkRateLimit(`contact:${ip}`, 5, 600000);
  if (!rateLimitResult.success) {
    return {
      success: false,
      error: "Too many messages sent recently. Please wait a few minutes before trying again.",
    };
  }

  // 2. Validate inputs
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid submission data.";
    return { success: false, error: errorMsg };
  }

  try {
    const msg = await prisma.message.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject ?? null,
        message: parsed.data.message,
        ipHash: ip,
      },
    });

    logEventSafe({
      type: "CONTACT_SUBMIT",
      path: "/#contact",
      entityId: msg.id,
      metadata: { email: parsed.data.email, name: parsed.data.name },
      ip,
      userAgent,
      dnt,
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "An unexpected error occurred while saving your message. Please try again.",
    };
  }
}
