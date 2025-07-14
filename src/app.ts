import express from "express";
import dotenv from "dotenv";
import authRouter from "../src/auth/auth.route";
import postRouter from "../src/posts/post.route";
import userRouter from "../src/users/user.route";
import likeRouter from "../src/likes/like.route";
import commentRouter from "../src/comments/comment.route";


dotenv.config();
const app = express();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter );
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);


export default app;

