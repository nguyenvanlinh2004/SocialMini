import { sendMessageService, getMessagesService, markAsSeenService } from "./message.service.js";

/**
 * Controller gửi tin nhắn
 */
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const message = await sendMessageService({ ...req.body, senderId });
    // TODO: emit realtime nếu dùng socket.io
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Lỗi gửi tin nhắn", error });
  }
};

/**
 * Lấy tin nhắn trong conversation
 */
export const getMessages = async (req, res) => {
  try {
    const messages = await getMessagesService(req.params.conversationId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy tin nhắn", error });
  }
};

/**
 * Đánh dấu đã xem tin nhắn
 */
export const markAsSeen = async (req, res) => {
  try {
    await markAsSeenService(req.params.conversationId, req.user._id);
    // TODO: emit realtime nếu dùng socket.io
    res.status(200).json({ message: "Đã đánh dấu đã xem" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật seen", error });
  }
};
