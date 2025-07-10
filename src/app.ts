import express from "express";
import dotenv from "dotenv";
import authRouter from "../src/auth/auth.route";
import postRouter from "../src/posts/post.route";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/auth", authRouter);

export default app;

