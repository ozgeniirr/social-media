import { Response, Request } from "express";
import { createFollowService, deleteFollowService, getFeedService } from "./user.service";


export const createFollow = async( req:Request, res:Response):Promise<any> => {
    try{
        const followerId= req.user!.userId;
        const followingId= Number(req.params.id);
        const cFollow = await createFollowService(followerId, followingId);

        return res.status(201).json({message:"Takip edildi ", cFollow})

    }catch(error:any){
        if(error.message==="SELF_FOLLOW_NOT_ALLOWED"){
            return res.status(400).json({message:"Kendinizi takip edemezsiniz "})
        }else if (error.message==="ALREADY_FOLLOWED"){
            return res.status(400).json({message:"Zaten takip ediliyor "})
        };

        return res.status(500).json({message:"Sunucu hatası "})
    };

}

export const deleteFollow = async( req:Request, res:Response): Promise<any> => {
    try{

        const followerId= req.user!.userId;
        const followingId= Number(req.params.id);
        await deleteFollowService(followerId, followingId);

        return res.status(200).json({message:"Takipten çıkarıldı "})

    }catch(error:any){
        if(error.message==="NOT_FOLLOWING"){
            return res.status(400).json({message:"Zaten takip edilmiyor."})
        }

        return res.status(500).json({message:"Sunucu hatası"})


    }
}


export const getFeed = async( req:Request, res:Response):Promise<any> => {

    try{
        const userId = req.user!.userId;
        const posts = await getFeedService(userId);
        return res.status(200).json({message:"Postlar başarıyla getirildi.", posts})



    }catch(error:any){
        if(error.message==="NOT_FOLLOWING"){
            return res.status(400).json({message:"Hiçbir kullanıcıyı takip etmiyorsunuz."})
        }else if(error.message==="NO_POST"){
            return res.status(404).json({message:"Hiç post bulunamadı "})
        }


        return res.status(500).json({
            message:"Sunucu hatası"
        });
    }



}