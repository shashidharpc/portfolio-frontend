import { prisma } from "@/lib/db";
import { MessagesInbox } from "@/components/dashboard/messages-inbox";

export const dynamic = "force-dynamic";

export default async function DashboardMessagesPage() {
  let messages: any[] = [];
  try {
    messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("Could not load messages from database:", err);
  }

  return <MessagesInbox initialMessages={messages} />;
}
