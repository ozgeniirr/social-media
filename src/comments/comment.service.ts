import prisma from "../config/prisma";


export const createCommentService = async(authorId:number, postId:number, content:string )=>{
    const post = await prisma.post.findUnique({
        where:{id:postId}
    });

    if(!post){
        throw new Error("NOT_FOUND")
    }

   const crComment = await prisma.comment.create({
        data:{ 
            authorId,
            postId,
            content
        },
        include:{
            author:{
                select:{email:true,
                }
            },
            post:{
                select:{title:true,
                    author:{
                        select:{email:true}
                    }
                }
            }
        }
    });
    return crComment;

}


export const getCommentService = async(postId: number)=>{
    const comment = await prisma.comment.findMany({
        where:{postId:postId},
        include:{
            author:{
                select:{email:true}
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });

    if(comment.length===0){
        throw new Error("NOT_FOUND")
    }

    return comment;

}