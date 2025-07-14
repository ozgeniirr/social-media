import { Request, Response, NextFunction} from "express";
import prisma from "../config/prisma"


export const isFollow = async(req:Request, res:Response, next:NextFunction)=>{
    const currentUserId = req.user!.userId;
    const postId= Number(req.params.postId);
    const post = await prisma.post.findUnique({
        where:{ id: postId},
        select:{authorId:true}
    });

    if(!post){
        return res.status(404).json({message:"Post bulunamadı."})
    }

    const isFollowing = await prisma.follow.findUnique({
        where:{
            followerId_followingId:{
                followerId:currentUserId,
                followingId: post.authorId
            }
        }

    });

    if(!isFollowing){
        return res.status(403).json({
            message:"Bu kullanıcıyı takip etmiyorsunuz."
        });
    }

    next();



    
}