import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // nguoi dang bai
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: [String],  // anh bai viet
        imageId: [String],    // id anh tren cloudnary
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", // nguoi thich bai viet
            },
        ],
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);