import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation", // tin nhan thuoc cuoc tro chuyen nao
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // ai la nguoi gui
            required: true,
        },
        text: String, // noi dung tin nhan
        imageUrl: String, // neu gui anh
        imageId: String, // id luu tren cloud
        seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true
    }
);

export const Message = mongoose.model("Message", messageSchema);