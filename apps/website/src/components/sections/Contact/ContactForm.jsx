import { useState } from "react";

import { useSendContactMessage } from "@/features/contact/hooks/useSendContactMessage";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const sendMessageMutation = useSendContactMessage({
    onSuccess: () => {
      setErrorMessage("");

      alert("Message sent successfully!");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    },
    onError: (error) => {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.message ||
        "Failed to send message.";

      setErrorMessage(backendMessage);
    },
  });

  const handleChange = (e) => {
    setErrorMessage("");

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = form.message.trim();

    if (form.name.trim().length < 2) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (trimmedMessage.length < 10) {
      setErrorMessage("Message must be at least 10 characters.");
      return;
    }

    sendMessageMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim(),
      message: trimmedMessage,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        minLength={2}
        className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-black"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-black"
      />

      <textarea
        name="message"
        placeholder="Message"
        rows={6}
        value={form.message}
        onChange={handleChange}
        required
        minLength={10}
        className="w-full rounded-xl border border-zinc-300 p-4 outline-none focus:border-black"
      />

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      <button
        disabled={sendMessageMutation.isPending}
        className="rounded-full bg-black px-8 py-4 text-white"
      >
        {sendMessageMutation.isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}