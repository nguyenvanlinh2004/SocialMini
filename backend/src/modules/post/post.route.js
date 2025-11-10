import express from "express";
import upload from "../../middlewares/upload.js";
import {
  createPost,
  getPostById,
  getPosts,
  toggleLike,
  deletePost,
} from "./post.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API quản lý bài viết
 */

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Tạo bài viết mới
 *     description: Tạo bài viết mới, có thể upload tối đa 5 hình ảnh.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Hôm nay trời thật đẹp ☀️"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Danh sách tối đa 5 hình ảnh upload
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tạo bài viết thành công"
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "67300f9da34f2e64b812ef88"
 *                     content:
 *                       type: string
 *                       example: "Hôm nay trời thật đẹp ☀️"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://cdn.example.com/uploads/pic1.jpg"]
 *                     author:
 *                       type: string
 *                       example: "64fbc2a67a8e7f5e5b9d1b22"
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/create", upload.array("images", 5), createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lấy danh sách bài viết
 *     description: Lấy tất cả bài viết (có thể phân trang hoặc lọc sau này).
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Danh sách bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "67300f9da34f2e64b812ef88"
 *                   content:
 *                     type: string
 *                     example: "Hôm nay trời thật đẹp ☀️"
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["https://cdn.example.com/uploads/pic1.jpg"]
 *                   likes:
 *                     type: number
 *                     example: 15
 *                   author:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64fbc2a67a8e7f5e5b9d1b22"
 *                       name:
 *                         type: string
 *                         example: "Nguyễn Văn Linh"
 */
router.get("/", getPosts);

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Lấy chi tiết bài viết
 *     description: Lấy chi tiết một bài viết theo ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Thông tin chi tiết bài viết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "67300f9da34f2e64b812ef88"
 *                 content:
 *                   type: string
 *                   example: "Hôm nay trời thật đẹp ☀️"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["https://cdn.example.com/uploads/pic1.jpg"]
 *                 likes:
 *                   type: number
 *                   example: 15
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64fbc2a67a8e7f5e5b9d1b22"
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn Linh"
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.get("/:postId", getPostById);

/**
 * @swagger
 * /api/posts/{postId}/like:
 *   post:
 *     summary: Like hoặc bỏ like bài viết
 *     description: Nếu người dùng đã like bài viết thì sẽ bỏ like, ngược lại sẽ like.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Đã like hoặc bỏ like thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã like bài viết"
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.post("/:postId/like", toggleLike);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Xóa bài viết
 *     description: Chỉ người tạo bài viết hoặc admin mới có quyền xóa.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết cần xóa
 *     responses:
 *       200:
 *         description: Xóa bài viết thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Xóa bài viết thành công"
 *       403:
 *         description: Không có quyền xóa bài viết này
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.delete("/:postId", deletePost);

export default router;
