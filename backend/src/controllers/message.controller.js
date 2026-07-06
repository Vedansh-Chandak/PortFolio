import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  fetchMessages,
  fetchMessage,
  addMessage,
  readMessage,
  removeMessage,
} from "../services/message.service.js";

export const getMessages = asyncHandler(async (req, res) => {
  const messages = fetchMessages();

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

export const getMessage = asyncHandler(async (req, res) => {
  const message = fetchMessage(Number(req.params.id));

  return res
    .status(200)
    .json(new ApiResponse(200, message, "Message fetched successfully"));
});

export const createMessage = asyncHandler(async (req, res) => {
  const message = addMessage(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, message, "Message sent successfully"));
});

export const markMessageAsRead = asyncHandler(async (req, res) => {
  const message = readMessage(Number(req.params.id));

  return res
    .status(200)
    .json(new ApiResponse(200, message, "Message marked as read"));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  removeMessage(Number(req.params.id));

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Message deleted successfully"));
});