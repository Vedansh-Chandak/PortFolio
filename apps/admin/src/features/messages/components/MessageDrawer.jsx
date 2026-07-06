import { Mail, MailCheck, User, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-zinc-400">
        <Icon size={16} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
        <p className="mt-1 text-sm text-white">{value || "-"}</p>
      </div>
    </div>
  );
}

export default function MessageDrawer({
  open,
  onOpenChange,
  message,
  onMarkAsRead,
  isMarkingRead = false,
}) {
  const receivedAt = message?.createdAt
    ? new Date(message.createdAt).toLocaleString()
    : "-";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail size={18} />
            Message Details
          </DialogTitle>
          <DialogDescription>
            Review the message and mark it as read if needed.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <DetailRow icon={User} label="Name" value={message?.name} />
          <DetailRow icon={Mail} label="Email" value={message?.email} />
          <DetailRow
            icon={CalendarDays}
            label="Received"
            value={receivedAt}
          />
          <DetailRow
            icon={MailCheck}
            label="Status"
            value={message?.isRead ? "Read" : "Unread"}
          />
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Subject</p>
          <p className="mt-2 text-sm text-white">{message?.subject || "No subject"}</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-200">
            {message?.message || "-"}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

          {!message?.isRead && (
            <Button type="button" onClick={onMarkAsRead} disabled={isMarkingRead}>
              {isMarkingRead ? "Marking..." : "Mark as Read"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}