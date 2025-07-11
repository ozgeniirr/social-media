import express from "express";
import dotenv from "dotenv";
import authRouter from "../src/auth/auth.route";
import postRouter from "../src/posts/post.route";
import userRouter from "../src/users/user.route";


dotenv.config();
const app = express();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter );


export default app;

