import ApiError from "../utils/ApiError.js";

import {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage,
} from "../models/message.model.js";

export const fetchMessages = () => {
  return getAllMessages().map((message) => ({
    ...message,
    is_read: Boolean(message.is_read),
  }));
};

export const fetchMessage = (id) => {
  const message = getMessageById(id);

  if (!message) {
    throw new ApiError(404, "Message not found.");
  }

  return {
    ...message,
    is_read: Boolean(message.is_read),
  };
};

export const addMessage = (data) => {
  const id = createMessage(data);

  return fetchMessage(id);
};

export const readMessage = (id) => {
  fetchMessage(id);

  markAsRead(id);

  return fetchMessage(id);
};

export const removeMessage = (id) => {
  fetchMessage(id);

  deleteMessage(id);
};