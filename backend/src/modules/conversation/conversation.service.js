import { Conversation } from "./conversation.model.js";
import { Message } from "../message/message.model.js";

/**
 * Tạo cuộc trò chuyện mới
 * @param {Object} data - { members: [], isGroup: boolean, groupName?, groupAvatarUrl?, groupAvatarId? }
 */
export const createConversationService = async (data) => {
  const { members, isGroup, groupName, groupAvatarUrl, groupAvatarId } = data;

  // Nếu là 1-1, kiểm tra xem đã có conversation chưa
  if (!isGroup && members.length === 2) {
    const existing = await Conversation.findOne({
      members: { $all: members, $size: 2 },
      isGroup: false,
    });
    if (existing) return existing;
  }

  const conversation = new Conversation({
    members,
    isGroup,
    groupName,
    groupAvatarUrl,
    groupAvatarId,
  });

  return await conversation.save();
};

/**
 * Lấy tất cả conversation của user
 * @param {String} userId
 */
export const getUserConversationsService = async (userId) => {
  return await Conversation.find({ members: userId })
    .populate("members", "name avatarUrl")  // Lấy thông tin user của members
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "name avatarUrl" }, // Lấy thông tin người gửi
    })
    .sort({ updatedAt: -1 }); // Sắp xếp conversation mới nhất lên đầu
};

/**
 * Lấy conversation theo id
 */
export const getConversationByIdService = async (conversationId) => {
  return await Conversation.findById(conversationId)
    .populate("members", "name avatarUrl")
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "name avatarUrl" },
    });
};

/**
 * Xóa conversation (cả tin nhắn)
 */
export const deleteConversationService = async (conversationId) => {
  await Message.deleteMany({ conversationId }); // Xóa tất cả tin nhắn trong conversation
  return await Conversation.findByIdAndDelete(conversationId);
};
