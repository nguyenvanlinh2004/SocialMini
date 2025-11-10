import { Message } from "./message.model.js";
import { Conversation } from "../conversation/conversation.model.js";

/**
 * Gửi tin nhắn
 * @param {Object} data - { conversationId, senderId, text?, imageUrl?, imageId? }
 */
export const sendMessageService = async (data) => {
  const { conversationId, senderId, text, imageUrl, imageId } = data;

  const message = await Message.create({
    conversationId,
    senderId,
    text,
    imageUrl,
    imageId,
    seenBy: [senderId], // Người gửi tự động đã xem
  });

  // Cập nhật lastMessage của conversation
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: message._id,
    updatedAt: Date.now(),
  });

  return await message.populate("senderId", "name avatarUrl");
};

/**
 * Lấy tất cả tin nhắn trong conversation
 */
export const getMessagesService = async (conversationId) => {
  return await Message.find({ conversationId })
    .populate("senderId", "name avatarUrl")
    .sort({ createdAt: 1 });
};

/**
 * Đánh dấu đã xem tin nhắn
 */
export const markAsSeenService = async (conversationId, userId) => {
  await Message.updateMany(
    { conversationId, seenBy: { $ne: userId } },
    { $push: { seenBy: userId } }
  );
};
