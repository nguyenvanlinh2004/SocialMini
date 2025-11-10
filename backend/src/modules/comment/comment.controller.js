import {
    createCommentService,
    getCommentsByPostService,
    deleteCommentService,
} from "./comment.service.js";

/**
 * Tạo bình luận hoặc reply
 */
export const createCommentController = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        const { postId, content, parentId } = req.body;

        const comment = await createCommentService(userId, postId, content, parentId);
        return res.status(201).json({
            success: true,
            message: "Bình luận thành công",
            comment,
        });
    } catch (err) {
        console.error("❌ Lỗi tạo bình luận:", err);
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

/**
 * Lấy danh sách bình luận theo postId
 */
export const getCommentsByPostController = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await getCommentsByPostService(postId);
        return res.status(200).json({
            success: true,
            message: "Lấy danh sách bình luận thành công",
            comments,
        });
    } catch (err) {
        console.error("❌ Lỗi lấy bình luận:", err);
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};

/**
 * Xóa bình luận
 */
export const deleteCommentController = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        const { commentId } = req.params;

        await deleteCommentService(commentId, userId);
        return res.status(200).json({
            success: true,
            message: "Xóa bình luận thành công",
        });
    } catch (err) {
        console.error("❌ Lỗi xóa bình luận:", err);
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
