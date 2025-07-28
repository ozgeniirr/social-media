import { Response, Request } from "express";
import { createFollowService, deleteFollowService, getFeedService, getUserPostsService } from "./user.service";
import redis from "../config/redis";


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

export const getUserPostsController = async (req:Request, res:Response): Promise<any> => {
    try{

        const userId = req.user!.userId;

        const cacheKey = `posts:user:${userId}`;
        console.log("Redis key: ", cacheKey);

        const cached = await redis.get(cacheKey);
        if(cached){
            console.log("Redis cache den veri döndü");
            return res.status(200).json({message:"Kendi postlarınız (cache): ",
                posts: JSON.parse(cached)
            });
        }

        const posts = await getUserPostsService(userId);
        console.log("Db den alındı", posts);


        await redis.set(cacheKey, JSON.stringify(posts), "EX", 60);
        console.log("DB den alındı redis e yazıldı.");
        return res.status(200).json({
            message:"Kendinize ait tüm postlar: ", posts
        })

    }catch(error:any){
        if(error.message==="POSTS_NOT_FOUND"){
            return res.status(404).json({message:"Hiç Post bulunamadı."})
        }

        return res.status(500).json({message:"Sunucu hatası."});
    }

}