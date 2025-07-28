import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { createFollow, deleteFollow, getFeed, getUserPostsController } from "./user.controller";


const router = Router();

router.post("/:id/follow", isAuth, createFollow);
router.post("/:id/unFollow", isAuth, deleteFollow);
router.get("/feed", isAuth, getFeed);
router.get("/me/posts", isAuth, getUserPostsController);


export default router;