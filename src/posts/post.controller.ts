import { createPostService, getAllPostsService } from "./post.service";
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

export const getAllPosts = async(req:Request, res:Response): Promise<any> => {
    
    try{
        const posts = await getAllPostsService()
        return res.status(200).json({
            message:"Tüm postlar: ", posts
        })
    
    }catch(error:any){
        return res.status(500).json({message:"Sunucu hatası"})

    }

}
