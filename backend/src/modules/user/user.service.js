import cloudinary from "../../configs/cloudinary.js";
import { User } from "./user.model.js"
import fs from 'fs'

export const getUserById = async (id) => {
    return await User.findById(id).select("-hashedPassword");
}

export const updateUser = async (userId, body, file) => {

    const { displayName, bio, phone } = body;
    const user = await User.findById(userId);
    if (!user) throw new Error("User khong ton tai!")

    if (file) {
        if (user.avatarId) {
            await cloudinary.uploader.destroy(user.avatarId);
        }

        const result = await cloudinary.uploader.upload(file.path, {
            folder: "avatars",
        });
        user.avatarUrl = result.secure_url;
        user.avatarId = result.public_id;

        fs.unlinkSync(file.path);
    }
    if (displayName) user.displayName = displayName.trim();
    if (phone) user.phone = phone.trim();
    if (bio !== undefined) user.bio = bio;

    await user.save();

    return user;
}

export const searchUser = async (keyword) => {
    if (!keyword || keyword.trim() === "") {
        throw new Error("Thieu tu khoa tim kiem");
    }

    const users = await User.find(
        {
            // or cho phep tim nhieu dk khac nhau
            $or: [
                {
                    // regex cho phep tim gan dung ( giong like trong Sql)
                    // option: "i" khong phan biet hoa thuong
                    displayName: { $regex: keyword, $options: "i" },
                }
            ]
        }
    ).select("-hashedPassword");
    return users;
}