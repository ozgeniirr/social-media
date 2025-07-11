import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { createPost, deletePost, getAllPosts, updatePost } from "./post.controller";

const router = Router();

router.post("/", isAuth, createPost);
router.get("/posts",isAuth, getAllPosts);
router.put("/:id", isAuth, updatePost);
router.delete("/:id", isAuth, deletePost);

export default router;