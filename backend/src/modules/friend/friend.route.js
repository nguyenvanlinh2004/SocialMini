import express from "express";
import {
  sendFriendRequest,
  declineFriendRequest,
  listFriend,
  listFriendRequest,
  removeFriend,
  acceptFriendRequest,
} from "./friend.controller.js";

const route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: API quản lý bạn bè và lời mời kết bạn
 */

/**
 * @swagger
 * /api/friends/request/{userId}:
 *   post:
 *     summary: Gửi lời mời kết bạn
 *     description: Gửi lời mời kết bạn đến một người dùng khác bằng userId.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng muốn gửi lời mời
 *     responses:
 *       200:
 *         description: Gửi lời mời thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã gửi lời mời kết bạn"
 *       400:
 *         description: Không thể gửi lời mời
 */
route.post("/request/:userId", sendFriendRequest);

/**
 * @swagger
 * /api/friends/accept/{userId}:
 *   post:
 *     summary: Chấp nhận lời mời kết bạn
 *     description: Xác nhận lời mời kết bạn từ người dùng có userId.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng gửi lời mời
 *     responses:
 *       200:
 *         description: Đã chấp nhận lời mời kết bạn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã trở thành bạn bè"
 *       400:
 *         description: Không thể chấp nhận lời mời
 */
route.post("/accept/:userId", acceptFriendRequest);

/**
 * @swagger
 * /api/friends/reject/{userId}:
 *   post:
 *     summary: Từ chối lời mời kết bạn
 *     description: Từ chối lời mời kết bạn từ người dùng có userId.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng bị từ chối lời mời
 *     responses:
 *       200:
 *         description: Đã từ chối lời mời kết bạn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã từ chối lời mời kết bạn"
 *       400:
 *         description: Không thể từ chối lời mời
 */
route.post("/reject/:userId", declineFriendRequest);

/**
 * @swagger
 * /api/friends/list:
 *   get:
 *     summary: Danh sách bạn bè
 *     description: Lấy danh sách tất cả bạn bè của người dùng hiện tại.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bạn bè
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
 *                   avatar:
 *                     type: string
 *                     example: "https://cdn.example.com/avatar.png"
 */
route.get("/list", listFriend);

/**
 * @swagger
 * /api/friends/listRequest:
 *   get:
 *     summary: Danh sách lời mời kết bạn
 *     description: Lấy danh sách các lời mời kết bạn đang chờ xử lý.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách lời mời kết bạn
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
 *                     example: "Trần Văn A"
 *                   avatar:
 *                     type: string
 *                     example: "https://cdn.example.com/avatar.png"
 */
route.get("/listRequest", listFriendRequest);

/**
 * @swagger
 * /api/friends/remove:
 *   post:
 *     summary: Hủy kết bạn
 *     description: Hủy kết bạn với người dùng khác.
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "64fbc2a67a8e7f5e5b9d1b22"
 *     responses:
 *       200:
 *         description: Hủy kết bạn thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đã hủy kết bạn thành công"
 *       400:
 *         description: Không thể hủy kết bạn
 */
route.post("/remove", removeFriend);

export default route;
