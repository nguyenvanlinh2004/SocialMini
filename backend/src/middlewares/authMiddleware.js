import jwt from 'jsonwebtoken'
import { User } from '../modules/user/user.model.js'

export const protectedRoute = (req, res, next) => {
    try {
        // lay token tu header
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "khong tim thay access token" });
        }

        // xac minh token hop le
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                console.error(err);

                return res.status(403).json({ message: 'Access token het han hoac khong dung' });
            }
            const user = await User.findById(decodedUser.userId).select('-hashedPassword');

            if (!user) {
                return res.status(404).json({ message: "User khong ton tai" });
            }

            // tra ve user trong req 
            req.user = user;
            next();
        })

    } catch (error) {
        console.error('Loi khi xac minh JWT', error);
        return res.status(500).json({ message: "loi hen thong" });
    }
}