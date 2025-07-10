import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { createPost } from "./post.controller";

const router = Router();

router.post("/", isAuth, createPost);



export default router;