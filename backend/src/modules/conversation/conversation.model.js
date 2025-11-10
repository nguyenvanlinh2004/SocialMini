import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
        isGroup: { type: Boolean, default: false },
        groupName: String,
        groupAvatarUrl: String,
        groupAvatarId
    },
    { timestamps: true }
);


export const Conversation = mongoose.model("Conversation", conversationSchema);