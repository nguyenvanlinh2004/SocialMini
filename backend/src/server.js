import express from "express";
import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./configs/swagger.js";
import { connectDB } from "./configs/db.js";
import authRoute from './modules/auth/auth.route.js'
import userRoute from './modules/user/user.route.js'
import friendRoute from './modules/friend/friend.route.js'
import postRoute from './modules/post/post.route.js'
import commentRoute from './modules/comment/comment.route.js'
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewarees
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//public routes
app.use('/api/auth', authRoute);

// private routes
app.use(protectedRoute);
app.use('/api/users', userRoute);
app.use('/api/friends', friendRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
     console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  console.error("Không thể khởi động server vì lỗi DB:", err.message);
});
