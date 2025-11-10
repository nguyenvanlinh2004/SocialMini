import cloudinary from "../../configs/cloudinary.js";
import fs from "fs";
import { getUserById, updateUser, searchUser } from "./user.service.js";
import { User } from "./user.model.js";
import { count } from "console";

export const getMe = async (req, res) => {
    try {
        // req.user đã được gắn từ middleware protectedRoute
        const user = await getUserById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        return res.status(200).json({
            message: 'Lấy thông tin người dùng thành công',
            user
        });

    } catch (error) {
        console.error('Lỗi khi lấy thông tin user:', error);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const update = await updateUser(req.user._id, req.body, req.file);
        return res.status(200).json({
            message: "Cập nhật hồ sơ thành công",
            user: update,
        });
    } catch (error) {
        console.error("Lỗi khi updateProfile:", error);
        return res.status(500).json({ message: "Lỗi hệ thống", error });
    }
};

export const search = async (req, res) => {
    try {
        const keyword = req.query.q;
        const users = await searchUser(keyword);

        return res.status(200).json({
            message: "Tim kiem thanh cong",
            count: users.length,
            users
        })
    } catch (error) {
        console.error("loi khi tim kiem user: ", error);
        return res.status(500).json({ message: "Loi he thong", error });
    }
}