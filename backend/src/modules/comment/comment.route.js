import express from "express";
import {
  createCommentController,
  getCommentsByPostController,
  deleteCommentController,
} from "./comment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API quản lý bình luận bài viết
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Lấy danh sách bình luận của bài viết
 *     description: Trả về tất cả bình luận của một bài viết theo `postId`.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "673011b6f25a9c5f7a92ef99"
 *                   content:
 *                     type: string
 *                     example: "Bài viết hay quá!"
 *                   author:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64fbc2a67a8e7f5e5b9d1b22"
 *                       name:
 *                         type: string
 *                         example: "Nguyễn Văn Linh"
 *                       avatar:
 *                         type: string
 *                         example: "https://cdn.example.com/avatar.png"
 *                   createdAt:
 *                     type: string
 *                     example: "2025-11-10T09:30:00Z"
 *       404:
 *         description: Không tìm thấy bài viết hoặc chưa có bình luận
 */
router.get("/:postId", getCommentsByPostController);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Tạo bình luận mới
 *     description: Thêm bình luận vào bài viết, yêu cầu đăng nhập.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - content
 *             properties:
 *               postId:
 *                 type: string
 *                 example: "67300f9da34f2e64b812ef88"
 *               content:
 *                 type: string
 *                 example: "Bài viết rất hữu ích, cảm ơn bạn!"
 *     responses:
 *       201:
 *         description: Bình luận được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã thêm bình luận"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "673011b6f25a9c5f7a92ef99"
 *                     content:
 *                       type: string
 *                       example: "Bài viết rất hữu ích, cảm ơn bạn!"
 *                     author:
 *                       type: string
 *                       example: "64fbc2a67a8e7f5e5b9d1b22"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-11-10T09:35:00Z"
 *       400:
 *         description: Thiếu dữ liệu hoặc bài viết không tồn tại
 */
router.post("/", createCommentController);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Xóa bình luận
 *     description: Xóa một bình luận theo ID. Chỉ người tạo hoặc admin mới có thể xóa.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bình luận cần xóa
 *     responses:
 *       200:
 *         description: Xóa bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã xóa bình luận"
 *       403:
 *         description: Không có quyền xóa bình luận này
 *       404:
 *         description: Không tìm thấy bình luận
 */
router.delete("/:commentId", deleteCommentController);

export default router;
