import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { createPost, getAllPosts } from "./post.controller";

const router = Router();

router.post("/", isAuth, createPost);
router.get("/posts",isAuth, getAllPosts)


export default router;