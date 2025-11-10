import {
    createPostService,
    toggleLikeService,
    deletePostService,
    getPostsService,
    getPostByIdService,
} from "./post.service.js";

/**
 * Tạo bài viết mới
 */
export const createPost = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId; // nếu có middleware auth thì lấy từ req.user
        const { content } = req.body;
        const files = req.files;

        const post = await createPostService(userId, content, files);
        return res.status(201).json({
            success: true,
            message: "Tạo bài viết thành công",
            post,
        });
    } catch (err) {
        console.error("Lỗi tạo bài viết:", err);
        return res.status(400).json({
            success: false,
            message: err.message || "Không thể tạo bài viết",
        });
    }
};

/**
 * Like / Unlike bài viết
 */
export const toggleLike = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        const { postId } = req.params;

        const result = await toggleLikeService(postId, userId);
        return res.status(200).json({
            success: true,
            message: result.liked ? "Đã thích bài viết" : "Đã bỏ thích bài viết",
            data: result,
        });
    } catch (err) {
        console.error("Lỗi like bài viết:", err);
        return res.status(400).json({
            success: false,
            message: err.message || "Không thể like/unlike bài viết",
        });
    }
};

/**
 * Xóa bài viết
 */
export const deletePost = async (req, res) => {
    try {
        const userId = req.user?._id || req.body.userId;
        const { postId } = req.params;

        await deletePostService(postId, userId);
        return res.status(200).json({
            success: true,
            message: "Xóa bài viết thành công",
        });
    } catch (err) {
        console.error("Lỗi xóa bài viết:", err);
        return res.status(400).json({
            success: false,
            message: err.message || "Không thể xóa bài viết",
        });
    }
};

/**
 * Lấy danh sách bài viết (phân trang)
 */
export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const result = await getPostsService(page, limit);
        return res.status(200).json({
            success: true,
            message: "Lấy danh sách bài viết thành công",
            ...result,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

/**
 * Lấy chi tiết 1 bài viết
 */
export const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await getPostByIdService(postId);
        return res.status(200).json({
            success: true,
            message: "Lấy chi tiết bài viết thành công",
            post,
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};
