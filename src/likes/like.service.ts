import prisma from "../config/prisma"



export const createLikeService = async (userId: number, postId:number )=>{
    const post = await prisma.post.findUnique({
        where:{id: postId}
    })
    if(!post){
        throw new Error("NOT_FOUND")
    }
    const isLiked = await prisma.like.findUnique({
        where:{
            userId_postId:{
                userId,
                postId
            }
        }
    });

    if(isLiked){
        throw new Error("ALREADY_LIKED")

    }

    const newLike = await prisma.like.create({
        data:{
            userId,
            postId
        },
        include:{
            user:{
                select:{
                    email:true
                }
            },
            post:{
                select:{
                    title:true,
                    author:{
                        select: { email:true}
                    }
                }
            }
        }
    });

    return newLike;

}


export const deleteLikeService = async( userId: number, postId: number)=>{
    const existingLike = await prisma.like.findUnique({
        where:{ userId_postId:{
            userId,
            postId
        }}
    });
    if(!existingLike){
        throw new Error("NOT_LIKED")
    }

    const unLike = await prisma.like.delete({
        where:{
            userId_postId:{
                userId,
                postId
            }
        },
        include:{
            user:{
                select:{
                    email:true
                }
            },
            post:{
                select:{
                    title:true,
                    author:{
                        select: { email:true}
                    }
                }
            }
        }
    });

    return unLike;

}