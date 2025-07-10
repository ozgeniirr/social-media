import prisma from "../config/prisma"



export const createPostService = async(title:string, content:string, authorId:number)=>{
    const post = await prisma.post.create({

        data: {title, content, authorId }

    })

    return post;
}