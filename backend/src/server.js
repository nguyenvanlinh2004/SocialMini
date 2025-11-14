import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./configs/swagger.js";
import { connectDB } from "./configs/db.js";
import authRoute from './modules/auth/auth.route.js'
import userRoute from './modules/user/user.route.js'
import friendRoute from './modules/friend/friend.route.js'
import postRoute from './modules/post/post.route.js'
import commentRoute from './modules/comment/comment.route.js'
import conversationRoute from './modules/conversation/conversation.route.js'
import messageRoute from './modules/message/message.route.js'
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const BASE_URL= process.env.BASE_URL || 'http://localhost:5001'

// cors
app.use(cors({
  origin: [
    '*'
    ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// middlewarees
app.use(express.json());
app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      defaultModelsExpandDepth: 0, // Thu gọn phần Schemas mặc định
    },
  })
);

//public routes
app.use('/api/auth', authRoute);

// private routes
app.use(protectedRoute);
app.use('/api/users', userRoute);
app.use('/api/friends', friendRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/conversations',conversationRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server chạy trên cổng ${PORT}`);
     console.log(`Swagger UI: ${BASE_URL}`);
  });
}).catch((err) => {
  console.error("Không thể khởi động server vì lỗi DB:", err.message);
});
