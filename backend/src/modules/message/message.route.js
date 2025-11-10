import express from "express";
import {
  sendMessage,
  getMessages,
  markAsSeen,
} from "./message.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: messages
 *   description: Quản lý tin nhắn giữa người dùng trong các cuộc trò chuyện
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Gửi tin nhắn mới
 *     description: Gửi tin nhắn văn bản hoặc hình ảnh trong một cuộc trò chuyện đã tồn tại.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversationId
 *             properties:
 *               conversationId:
 *                 type: string
 *                 description: ID của cuộc trò chuyện
 *               text:
 *                 type: string
 *                 description: Nội dung tin nhắn (tùy chọn nếu có ảnh)
 *               imageUrl:
 *                 type: string
 *                 description: Đường dẫn ảnh tin nhắn (nếu có)
 *               imageId:
 *                 type: string
 *                 description: ID ảnh trên Cloudinary (nếu có)
 *     responses:
 *       201:
 *         description: Tin nhắn được gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dữ liệu gửi không hợp lệ
 *       401:
 *         description: Chưa xác thực
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/messages/{conversationId}:
 *   get:
 *     summary: Lấy danh sách tin nhắn theo cuộc trò chuyện
 *     description: Lấy tất cả tin nhắn thuộc một `conversationId` cụ thể, sắp xếp theo thời gian.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cuộc trò chuyện
 *     responses:
 *       200:
 *         description: Danh sách tin nhắn được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       401:
 *         description: Chưa xác thực
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/messages/{conversationId}/seen:
 *   post:
 *     summary: Đánh dấu tất cả tin nhắn trong cuộc trò chuyện là đã xem
 *     description: Đánh dấu trạng thái "đã xem" cho các tin nhắn chưa được xem trong cuộc trò chuyện.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của cuộc trò chuyện
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái đã xem thành công
 *       401:
 *         description: Chưa xác thực
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         conversationId:
 *           type: string
 *         senderId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             avatarUrl:
 *               type: string
 *         text:
 *           type: string
 *         imageUrl:
 *           type: string
 *         imageId:
 *           type: string
 *         seenBy:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// ======================
// 🔹 Message Routes
// ======================
router.post("/", sendMessage); // Gửi tin nhắn mới
router.get("/:conversationId", getMessages); // Lấy tin nhắn theo conversation
router.post("/:conversationId/seen", markAsSeen); // Đánh dấu đã xem

export default router;
