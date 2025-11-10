import express from "express";
import { signIn, signOut, signUp } from "./auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng (đăng ký, đăng nhập, đăng xuất)
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     description: Tạo tài khoản người dùng mới bằng email, tên và mật khẩu.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                  type: string
 *                  example: "nguyenvanlinhdz"
 *               firstName:
 *                 type: string
 *                 example: "Nguyễn Văn"
 *               lastName:
 *                  type: string
 *                  example: " Linh"
 *               email:
 *                 type: string
 *                 example: "linh@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng ký thành công"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64fbc2a67a8e7f5e5b9d1b22"
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn Linh"
 *                     email:
 *                       type: string
 *                       example: "linh@example.com"
 *       400:
 *         description: Email đã tồn tại hoặc dữ liệu không hợp lệ
 */
router.post("/signup", signUp);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     description: Đăng nhập bằng email và mật khẩu, trả về JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "nguyenvanlinhdz"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     
 *                     name:
 *                       type: string
 *                       example: "Nguyễn Văn Linh"
 *                     email:
 *                       type: string
 *                       example: "linh@example.com"
 *       401:
 *         description: Sai email hoặc mật khẩu
 */
router.post("/signin", signIn);

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Đăng xuất tài khoản
 *     description: Đăng xuất người dùng hiện tại (xóa token khỏi client hoặc session).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng xuất thành công"
 */
router.post("/signout", signOut);

export default router;
