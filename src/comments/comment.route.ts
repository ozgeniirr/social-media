import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { isFollow } from "../middlewares/isFollow";
import { createComment, getComment } from "./comment.controller";


const router = Router();

router.post("/:postId/comment", isAuth, isFollow, createComment);
router.get("/:postId/comments", isAuth, isFollow, getComment);





export default router;