import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import Layout from "@/components/layout/Layout";

import MessageTable from "@/features/messages/components/MessageTable";
import MessageDrawer from "@/features/messages/components/MessageDrawer";
import DeleteMessageDialog from "@/features/messages/components/DeleteMessageDialog";
import { useMessages } from "@/features/messages/hooks/useMessages";
import { useUpdateMessage } from "@/features/messages/hooks/useUpdateMessage";
import { useDeleteMessage } from "@/features/messages/hooks/useDeleteMessage";

export default function Messages() {
  const { data, isLoading, error } = useMessages();
  const updateMessage = useUpdateMessage();
  const deleteMessage = useDeleteMessage();

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const errorToastRef = useRef("");

  const messages = data ?? [];

  useEffect(() => {
    if (!error) {
      errorToastRef.current = "";
      return;
    }

    const message = error?.response?.data?.message || "Failed to load messages.";

    if (errorToastRef.current !== message) {
      toast.error(message);
      errorToastRef.current = message;
    }
  }, [error]);

  const markSelectedAsRead = async () => {
    if (!selectedMessage || selectedMessage.isRead) {
      return;
    }

    try {
      await updateMessage.mutateAsync(selectedMessage.id);
      toast.success("Message marked as read.");
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteMessage.mutateAsync(deleteTarget.id);
      toast.success("Message deleted successfully.");
      setDeleteTarget(null);

      if (selectedMessage?.id === deleteTarget.id) {
        setSelectedMessage(null);
      }
    } catch (mutationError) {
      toast.error(
        mutationError?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Messages</h1>
        <p className="mt-2 text-zinc-400">
          Review contact form submissions, mark them as read, and remove spam.
        </p>
      </div>

      <MessageTable
        messages={messages}
        isLoading={isLoading}
        onView={setSelectedMessage}
        onDelete={setDeleteTarget}
      />

      <MessageDrawer
        open={Boolean(selectedMessage)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMessage(null);
          }
        }}
        message={selectedMessage}
        onMarkAsRead={markSelectedAsRead}
        isMarkingRead={updateMessage.isPending}
      />

      <DeleteMessageDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        message={deleteTarget}
        onConfirm={confirmDelete}
        isDeleting={deleteMessage.isPending}
      />
    </Layout>
  );
}