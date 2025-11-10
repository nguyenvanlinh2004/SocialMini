import {
  createConversationService,
  getUserConversationsService,
  getConversationByIdService,
  deleteConversationService,
} from "./conversation.service.js";

/**
 * Controller: tạo conversation
 */
export const createConversation = async (req, res) => {
  try {
    const conversation = await createConversationService(req.body);
    // TODO: emit realtime nếu dùng socket.io
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo conversation", error });
  }
};

/**
 * Lấy tất cả conversation của user hiện tại
 */
export const getUserConversations = async (req, res) => {
  try {
    const conversations = await getUserConversationsService(req.user._id);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy conversation", error });
  }
};

/**
 * Lấy conversation theo id
 */
export const getConversationById = async (req, res) => {
  try {
    const conversation = await getConversationByIdService(req.params.conversationId);
    if (!conversation) return res.status(404).json({ message: "Không tìm thấy conversation" });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy conversation", error });
  }
};

/**
 * Xóa conversation
 */
export const deleteConversation = async (req, res) => {
  try {
    await deleteConversationService(req.params.conversationId);
    res.status(200).json({ message: "Xóa conversation thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa conversation", error });
  }
};
