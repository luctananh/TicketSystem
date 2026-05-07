import jwt from 'jsonwebtoken';
import * as userRepository from '../modules/user/user.repository.js'
import dotenv from "dotenv";
dotenv.config();

export const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy access token" })
        }

        try {
            // Thêm log vào trước dòng jwt.verify để debug
            // console.log("Auth Header:", req.headers['authorization']);
            // console.log("Token extracted:", token);
            const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await userRepository.getUserById(decodedUser.id);

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: "Access Token hết hạn hoặc không đúng" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
}
