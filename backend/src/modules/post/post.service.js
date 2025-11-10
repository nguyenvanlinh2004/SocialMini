import { Post } from "./post.model.js";
import { Comment } from "../comment/comment.model.js";
import cloudinary from "../../configs/cloudinary.js";
import fs from "fs";

export const createPostService = async (userId, content, files) => {
    if (!userId) throw new Error("Thiếu thông tin người dùng");
    if (!content || !content.trim()) throw new Error("Nội dung không được để trống");

    const imageUrls = [];
    const imageIds = [];

    // upload ảnh nếu có
    if (files && files.length > 0) {
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "posts",
            });
            imageUrls.push(result.secure_url);
            imageIds.push(result.public_id);
            fs.unlinkSync(file.path); // xóa file tạm sau khi upload
        }
    }

    // tạo bài viết mới
    const post = await Post.create({
        userId,
        content: content.trim(),
        imageUrl: imageUrls,
        imageId: imageIds,
    });

    // populate để trả về thông tin user
    return await post.populate("userId", "displayName avatarUrl email");
};

// Like / Unlike bài viết
export const toggleLikeService = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Không tìm thấy bài viết!");

    const liked = post.likes.includes(userId);
    if (liked) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }
    await post.save();
    return { liked: !liked, totalLikes: post.likes.length };
};

// Xóa bài viết
export const deletePostService = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error("Không tìm thấy bài viết!");

    if (post.userId.toString() !== userId.toString()) {
        throw new Error("Bạn không có quyền xóa bài viết này!");
    }

    // Xóa ảnh trên Cloudinary
    if (post.imageIds && post.imageIds.length > 0) {
        for (const id of post.imageIds) {
            await cloudinary.uploader.destroy(id);
        }
    }

    await Post.findByIdAndDelete(postId);
    return true;
};

// lay danh sach bai viet
export const getPostsService = async (page = 1, limit = 5) => {
    const skip = (page - 1) * limit;

    const posts = await Post.find()
        .populate("userId", "displayName avatarUrl email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    // Đếm số comment cho từng bài
    const postIds = posts.map((p) => p._id);
    const commentCounts = await Comment.aggregate([
        { $match: { postId: { $in: postIds } } },
        { $group: { _id: "$postId", count: { $sum: 1 } } },
    ]);

    const countMap = {};
    commentCounts.forEach((c) => (countMap[c._id.toString()] = c.count));

    posts.forEach((p) => {
        p.commentCount = countMap[p._id.toString()] || 0;
    });

    const total = await Post.countDocuments();

    return {
        posts,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
};

/**
 * 📄 Chi tiết bài viết (kèm toàn bộ comment + reply)
 */
export const getPostByIdService = async (postId) => {
    const post = await Post.findById(postId)
        .populate("userId", "displayName avatarUrl email")
        .lean();

    if (!post) throw new Error("Không tìm thấy bài viết!");

    // Lấy danh sách comment của bài viết
    const comments = await Comment.find({ postId })
        .populate("userId", "displayName avatarUrl email")
        .sort({ createdAt: -1 })
        .lean();

    // Gom comment cha - con (reply)
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

    post.comments = roots;
    post.commentCount = comments.length;

    return post;
};
