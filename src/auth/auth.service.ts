import prisma from "@/config/prisma";
import bcrypt from "bcrypt";


         


export const registerUserService = async(data: {email:string, password:string})=> {
    const existingUser = await prisma.user.findUnique({
        where: {email: data.email}
    });

    if(existingUser){
        throw new Error("MAİL_EXİST")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
        data:{
            email: data.email,
            password: hashedPassword 
        }
    });

    return newUser;


}