import prisma from "../config/prisma"



export const createFollowService = async( followerId: number, followingId:number )=> {
    if(followerId===followingId){
        throw new Error("SELF_FOLLOW_NOT_ALLOWED")

    }
    const existFollowing = await prisma.follow.findUnique({
        where:{
            followerId_followingId:{
                followerId, followingId
            }
        }
    });

    if(existFollowing){
        throw new Error("ALREADY_FOLLOWED")
    };
    const newFollow = await prisma.follow.create({
        data:{
            followerId, 
            followingId
        }
    });

    return newFollow;
}

export const deleteFollowService = async( followerId: number, followingId:number )=>{
    const unFollow = await prisma.follow.findUnique({
        where:{
            followerId_followingId:{
                followerId, followingId
            }
        }
    });

    if(!unFollow){
        throw new Error("NOT_FOLLOWING")
    }

    await prisma.follow.delete({
        where: {followerId_followingId: {
            followerId,
            followingId
        }
    }});

    
}


export const getFeedService = async(userId:number)=>{
    const follows = await prisma.follow.findMany({
        where:{
            followerId: userId
        }
    });

    if(follows.length===0){
        throw new Error("NOT_FOLLOWING")
    }


    const followingIds = follows.map((follow)=> follow.followingId);
    const post = await prisma.post.findMany({
        where:{
            authorId: { in: followingIds }
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            author:{
                select:{
                    email:true
                }
            }
        }

    })

    if(post.length===0){
        throw new Error("NO_POST")
    }

    return post;
}