import prisma from "../config/prisma"



export const createPostService = async(title:string, content:string, authorId:number)=>{
    const post = await prisma.post.create({

        data: {title, content, authorId }

    })
    return post;
}


export const getAllPostsService = async()=>{
    const posts = await prisma.post.findMany({
          include: {
    author: {
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    }
  }
    });
    return posts;
}

export const updatePostService = async(id:number, title: string, content: string, userId:number  ) => {
    const post = await prisma.post.findUnique({
        where:{id}
    });

    if(!post){
        throw new Error("NOT_FOUND")
    }

    else if(post.authorId!== userId){
        throw new Error("NOT_ALLOWED")
    }
    const uPost= await prisma.post.update({
        where:{id},
        data:{title, content  },
        include: {
            author:{
                select: {
                    email:true
                }
            }
        }

    })

    return uPost;
}


export const deletePostService = async(id:number, userId:number)=> {
    const post = await prisma.post.findUnique({
        where:{id}
    });

    if(!post){
        throw new Error("NOT_FOUND")

    }else if(post.authorId!==userId){
        throw new Error("NOT_ALLOWED")


    };

    const dPost = await prisma.post.delete({
        where:{id}

    })

    return dPost;

}