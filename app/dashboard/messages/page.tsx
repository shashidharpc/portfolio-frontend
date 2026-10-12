import { prisma } from "@/lib/db";
import { MessagesInbox } from "@/components/dashboard/messages-inbox";

export default async function DashboardMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <MessagesInbox initialMessages={messages} />;
}
