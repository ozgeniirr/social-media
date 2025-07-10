import { createPostService } from "./post.service";
import { Response, Request } from "express";
import { createPostSchema } from "../validators/post.validator";


export const createPost = async( req:Request, res:Response): Promise<any> => {
    const parsed = createPostSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({
            message:"Eksik veri girişi."
        })
    }
    try {
    const{title, content} = parsed.data;
    const authorId = req.user!.userId;

    const post =  await createPostService(title, content, authorId );
    return res.status(201).json({
        message:"Başarıyla oluşturuldu", post
    })


    }catch(error:any){
        return res.status(500).json({
            message:"Sunucu Hatası"
        })
    }


}
