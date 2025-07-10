import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";


         


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


export const loginUserService = async(data: { email:string, password:string}) =>{
    const user = await prisma.user.findUnique({
        where: {email:data.email}
    })

    if(!user){
        throw new Error("NOT_FOUND")
    }
    const Tpassword = await bcrypt.compare(data.password, user.password)
    
    if( Tpassword === false ){
        throw new Error("WRONG_PASSW")

    }
    const userToken = await generateToken(user.id, user.email, user.role );   
    return userToken;
} 