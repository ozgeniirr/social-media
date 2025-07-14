import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { createLike, deleteLike } from "./like.controller";
import { isFollow } from "../middlewares/isFollow";


const router = Router();

router.post("/:postId/like",isAuth, isFollow,  createLike);
router.delete("/:postId/unlike", isAuth, isFollow, deleteLike);




export default router;