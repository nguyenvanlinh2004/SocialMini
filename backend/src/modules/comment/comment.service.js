import { Comment } from "./comment.model.js";
import { Post } from "../post/post.model.js";

/**
 * Tạo bình luận hoặc trả lời
 */
export const createCommentService = async (userId, postId, content, parentId = null) => {
    if (!userId || !postId) throw new Error("Thiếu thông tin người dùng hoặc bài viết");
    if (!content || !content.trim()) throw new Error("Nội dung bình luận không được để trống");

    // Kiểm tra post tồn tại
    const post = await Post.findById(postId);
    if (!post) throw new Error("Không tìm thấy bài viết!");

    const comment = await Comment.create({
        userId,
        postId,
        content: content.trim(),
        parentId: parentId || null,
    });

    return await comment.populate("userId", "displayName avatarUrl email");
};

/**
 * Lấy tất cả bình luận của 1 bài viết (bao gồm reply)
 */
export const getCommentsByPostService = async (postId) => {
    const comments = await Comment.find({ postId })
        .populate("userId", "displayName avatarUrl email")
        .sort({ createdAt: -1 })
        .lean();

    // gom nhóm reply
    const map = {};
    const roots = [];

    for (const cmt of comments) {
        cmt.replies = [];
        map[cmt._id] = cmt;
    }

    for (const cmt of comments) {
        if (cmt.parentId) {
            if (map[cmt.parentId]) map[cmt.parentId].replies.push(cmt);
        } else {
            roots.push(cmt);
        }
    }

    return roots;
};

/**
 * Xóa bình luận
 */
export const deleteCommentService = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Không tìm thấy bình luận!");

    if (comment.userId.toString() !== userId.toString()) {
        throw new Error("Bạn không có quyền xóa bình luận này!");
    }

    // Xóa cả reply của bình luận
    await Comment.deleteMany({
        $or: [{ _id: commentId }, { parentId: commentId }],
    });

    return true;
};
