import bcrypt from 'bcrypt'
import { User } from '../user/user.model.js';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Session from './Session.js';

const ACCESS_TOKEN_TTL = 30 * 60 * 1000;

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "Vui lòng không bỏ trống thông tin" })
        }

        // kiểm tra username tồn tại chưa
        const u = await User.findOne({ username });

        if (u) {
            return res.status(400).json({ message: "usename đã tồn tại" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // mã hoá 2^10 lần

        // tạo user mới
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`,
        });
        // return 

        return res.status(201).json({ message: "dang ki thanh cong" });

    } catch (error) {
        console.error("Lỗi khi signUp:", error.message);
        console.error(error.stack);
        return res.status(500).json({ message: "Lỗi hệ thống!", error: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        // lấy inputs req.body
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "thiếu username hoặc password." });
        }

        // lấy hashedPassword so với password input
        // kiểm tra password 
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "usename hoặc password không chính xác!" });
        }

        const pass = await bcrypt.compare(password, user.hashedPassword);

        if (!pass) {
            return res.status(401).json({ message: "usename hoặc password không chính xác!" });
        }

        // nếu khớp, tạo accessToken với JWT
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });


        // tạo refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // tạo session để lưu refresh token
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + ACCESS_TOKEN_TTL),
        });

        // trả về refresh token veef trong cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: ACCESS_TOKEN_TTL, });

        // tra về access token về trong res
        return res.status(200).json({ message: `User ${user.displayName} da dang nhap`, accessToken });

    } catch (error) {
        console.error("lỗi khi signIn", error);
        return res.status(500).json({ message: "lỗi hệ thống" });
    }
}

export const signOut = async (req, res) => {
    try {
        // lay refresh token tu cookie
        const token = req.cookie?.refreshToken;

        if (token) {
            await Session.deleteOne({ refreshToken: token });
            res.clearCookie("refreshToken");
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error('loi khi signout', error);
        return res.status(500).json({ message: "loi the thong" });
    }
}