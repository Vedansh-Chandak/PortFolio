import { Eye, Trash2, MailOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

function MessageSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="grid animate-pulse gap-3 border-b border-zinc-800 p-5 md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]"
        >
          <div className="h-5 rounded bg-zinc-800" />
          <div className="h-5 rounded bg-zinc-800" />
          <div className="h-5 rounded bg-zinc-800" />
          <div className="h-5 rounded bg-zinc-800" />
          <div className="h-8 w-28 rounded bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}

export default function MessageTable({
  messages = [],
  isLoading = false,
  onView,
  onDelete,
}) {
  if (isLoading) {
    return <MessageSkeleton />;
  }

  if (!messages.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-10 text-center text-zinc-400">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-950/60">
            <tr className="text-left text-sm text-zinc-400">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {messages.map((message) => (
              <tr key={message.id} className="align-top text-sm text-zinc-200">
                <td className="px-6 py-5 font-medium text-white">{message.name}</td>
                <td className="px-6 py-5 text-zinc-300">{message.email}</td>
                <td className="px-6 py-5 text-zinc-300">{message.subject || "-"}</td>
                <td className="px-6 py-5">
                  <span
                    className={
                      message.isRead
                        ? "rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300"
                        : "rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300"
                    }
                  >
                    {message.isRead ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => onView(message)}>
                      <Eye size={16} />
                    </Button>

                    {!message.isRead && (
                      <Button variant="outline" size="icon" onClick={() => onView(message)}>
                        <MailOpen size={16} />
                      </Button>
                    )}

                    <Button variant="destructive" size="icon" onClick={() => onDelete(message)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}