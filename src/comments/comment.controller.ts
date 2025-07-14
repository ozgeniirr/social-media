import { commentSchema } from "../validators/comment.validator";
import { likeParamSchema } from "../validators/like.validator";
import { Request, Response } from "express";
import { createCommentService, getCommentService } from "./comment.service";

export const createComment = async(req:Request, res:Response):Promise<any> => {
    const parsed = likeParamSchema.safeParse(req.params);
    if(!parsed.success){
        return res.status(400).json({message: "Lütfen geçerli bir parametre giriniz.",
            errors: parsed.error.flatten().fieldErrors
        })
    }

    const parsed2 = commentSchema.safeParse(req.body);
    if(!parsed2.success){
        return res.status(400).json({message: "Lütfen geçerli bir content giriniz.",
            errors: parsed2.error.flatten().fieldErrors
        })
    }

    try{
        const content = String(parsed2.data.content)
        const authorId = req.user!.userId;
        const postId = Number(parsed.data.postId);
        const comment = await createCommentService(authorId, postId, content)
        return res.status(201).json({message:"Yorum yapıldı", comment})


    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"Böyle bir post bulunamadı"})
        }

        return res.status(500).json({message:"Sunucu hatası"})

    }
};



export const getComment = async (req: Request, res:Response): Promise<any> => {
    try{
        const postId = Number(req.params.postId)
        const comments = await getCommentService(postId);
        return res.status(200).json({message: `Toplam ${comments.length} yorum bulundu.`,comments});


    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"Hiç yorum yok "})
        }

        return res.status(500).json({message:"Sunucu hatası"})
    }
}

