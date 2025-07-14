import { Response, Request } from "express";
import { createLikeService, deleteLikeService } from "./like.service";
import { likeParamSchema } from "../validators/like.validator";

export const createLike = async (req: Request, res: Response): Promise<any> => {
    const parsed = likeParamSchema.safeParse(req.params);
    if(!parsed.success){
        return res.status(400).json({message:"Lütfen geçerli bir parametre giriniz. "})
    }
    try{
        const userId = req.user!.userId;
        const postId = Number(parsed.data.postId);
        const liked = await createLikeService(userId, postId);
        return res.status(201).json({message: "Post beğenildi. ", liked});
    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({message:"Post bulunamadı."})
        }else if(error.message==="ALREADY_LIKED"){
            return res.status(400).json({message:"Bu postu zaten beğendiniz."})
        }

        return res.status(500).json({message:"Sunucu hatası"});
    }
} 


export const deleteLike = async ( req: Request, res:Response): Promise<any> => {
    const parsed =  likeParamSchema.safeParse(req.params);
    if(!parsed.success){
        return res.status(400).json({message:"Lütfen geçerli bir id giriniz. "})
    }
    try{
        const userId = req.user!.userId;
        const postId= Number(parsed.data.postId);
        const unLiked = await deleteLikeService(userId, postId);
        return res.status(200).json({
            message: `${unLiked.user.email} adlı kullanıcı '${unLiked.post.title}' postundaki beğenisini geri aldı.`,unLiked
});

    }catch(error:any){
        if(error.message==="NOT_LIKED"){
            return res.status(404).json({message:"Zaten beğenmemişsiniz"})
        }

        return res.status(500).json({message:"Sunucu hatası"});
    }
}