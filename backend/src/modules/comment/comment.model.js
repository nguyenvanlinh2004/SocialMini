import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", // Binh luan thuoc bai viet nao
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // ai la nguoi binh luan
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment", // Nếu là reply thì trỏ tới comment cha
            default: null,
        },
    },
    {
        timestamps: true,
    },
);
export const Comment = mongoose.model("Comment", commentSchema);