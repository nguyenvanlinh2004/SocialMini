import express from "express";
import { getMe, search, updateProfile } from "./user.controller.js";
import upload from "../../middlewares/upload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     description: Trả về thông tin của người dùng dựa trên token xác thực.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng hiện tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64fbc2a67a8e7f5e5b9d1b22"
 *                 name:
 *                   type: string
 *                   example: "Nguyễn Văn Linh"
 *                 email:
 *                   type: string
 *                   example: "linh@example.com"
 *                 avatar:
 *                   type: string
 *                   example: "https://cdn.example.com/uploads/avatar.png"
 *       401:
 *         description: Không có quyền truy cập hoặc token không hợp lệ
 */
router.get("/me", getMe);

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Cập nhật hồ sơ người dùng
 *     description: Cập nhật thông tin người dùng bao gồm avatar (upload file).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nguyễn Văn Linh"
 *               email:
 *                 type: string
 *                 example: "linh@example.com"
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cập nhật hồ sơ thành công"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64fbc2a67a8e7f5e5b9d1b22"
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn Linh"
 *                     avatar:
 *                       type: string
 *                       example: "https://cdn.example.com/uploads/avatar.png"
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền truy cập
 */
router.put("/update", upload.single("avatar"), updateProfile);

/**
 * @swagger
 * /api/users/search:
 *   post:
 *     summary: Tìm kiếm người dùng
 *     description: Tìm kiếm người dùng theo tên hoặc email.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keyword:
 *                 type: string
 *                 example: "linh"
 *     responses:
 *       200:
 *         description: Danh sách người dùng phù hợp
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64fbc2a67a8e7f5e5b9d1b22"
 *                   name:
 *                     type: string
 *                     example: "Nguyễn Văn Linh"
 *                   email:
 *                     type: string
 *                     example: "linh@example.com"
 *                   avatar:
 *                     type: string
 *                     example: "https://cdn.example.com/uploads/avatar.png"
 *       400:
 *         description: Thiếu từ khóa tìm kiếm
 */
router.post("/search", search);

export default router;
