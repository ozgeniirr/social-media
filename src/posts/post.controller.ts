import { createPostService, deletePostService, getAllPostsService, updatePostService } from "./post.service";
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

export const updatePost = async(req:Request, res:Response):Promise<any> => {
    const parsed = createPostSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({message:"Eksik veri girişi"})
    }

    try{
        const id = Number(req.params.id);
        const{title, content} = parsed.data;
        const userId = req.user!.userId;
        const uPost= await updatePostService(id, title, content, userId)
        return res.status(200).json({message:"Post güncellendi ", uPost});

    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({
                message:"Post bulunamadı"
            })
        }else if(error.message==="NOT_ALLOWED"){
            return res.status(403).json({
                message:"İzinsiz işlem"
            })

        }

        return res.status(500).json({message:"Sunucu hatası"});
    }
}


export const deletePost = async(req:Request, res:Response): Promise <any> => {
    try {
        const id = Number(req.params.id);
        const userId = req.user!.userId;
        const dPost = await deletePostService(id, userId)
        return res.status(200).json({message: "Post silindi ", dPost})
    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"Post bulunamadı"})
        }else if(error.message==="NOT_ALLOWED"){
            return res.status(403).json({message:"Bu postu silme yetkiniz yok"})
        }

        return res.status(500).json({message:"Sunucu hatası"})
    };


} 