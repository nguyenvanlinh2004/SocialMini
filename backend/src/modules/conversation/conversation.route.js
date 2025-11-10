import express from "express";
import {
  getConversationById,
  deleteConversation,
  createConversation,
  getUserConversations,
} from "./conversation.controller.js";

const route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Quản lý cuộc trò chuyện (1-1 hoặc nhóm)
 */

/**
 * @swagger
 * /api/conversations:
 *   post:
 *     summary: Tạo conversation mới (1-1 hoặc nhóm)
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - members
 *             properties:
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Danh sách userId tham gia conversation
 *               isGroup:
 *                 type: boolean
 *                 description: true nếu là nhóm
 *               groupName:
 *                 type: string
 *                 description: Tên nhóm (nếu là nhóm)
 *               groupAvatarUrl:
 *                 type: string
 *                 description: URL ảnh đại diện nhóm
 *               groupAvatarId:
 *                 type: string
 *                 description: ID ảnh đại diện trên cloud
 *     responses:
 *       201:
 *         description: Conversation được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Lỗi server
 *
 *   get:
 *     summary: Lấy tất cả conversation của user đang đăng nhập
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách conversation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/conversations/{conversationId}:
 *   get:
 *     summary: Lấy chi tiết conversation theo ID
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của conversation
 *     responses:
 *       200:
 *         description: Chi tiết conversation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       404:
 *         description: Không tìm thấy conversation
 *       500:
 *         description: Lỗi server
 *
 *   delete:
 *     summary: Xóa conversation và tất cả tin nhắn
 *     tags: [Conversation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của conversation cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy conversation
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               name:
 *                 type: string
 *               avatarUrl:
 *                 type: string
 *         lastMessage:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             text:
 *               type: string
 *             senderId:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 avatarUrl:
 *                   type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *         isGroup:
 *           type: boolean
 *         groupName:
 *           type: string
 *         groupAvatarUrl:
 *           type: string
 *         groupAvatarId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// Routes
route.post("/", createConversation);
route.get("/", getUserConversations);
route.get("/:conversationId", getConversationById);
route.delete("/:conversationId", deleteConversation);

export default route;
