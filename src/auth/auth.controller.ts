import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { loginUserService, registerUserService } from "./auth.service";


export const registerUser = async(req:Request, res:Response):Promise<any> => {
    const parsed = registerSchema.safeParse(req.body);

    if(!parsed.success){
        return res.status(400).json({
            message:"Lütfen geçerli email veya şifre giriniz. ",
            errors: parsed.error.flatten().fieldErrors
        });
    }
    try{
        const newUser = await registerUserService(parsed.data);
        return res.status(201).json({
            message:"Kayıt oluşturuldu", newUser
        });
    }catch(error:any){
        if(error.message==="MAİL_EXİST"){
            return res.status(409).json({
                message:"Bu email zaten kayıtlı"
            });
        }

        return res.status(500).json({message:"Sunucu hatası"})
    }

}

export const loginUser = async(req:Request, res:Response): Promise<any> => {
    const parsed = loginSchema.safeParse(req.body);
    
    if(!parsed.success){
        return res.status(400).json({
            message:"Lütfen geçerli veri giriniz",
            errors: parsed.error.flatten().fieldErrors
        });
    }
    try{
        const logUser = await loginUserService( parsed.data )
        return res.status(200).json({
            message:"Giriş yapıldı",
            token:logUser
        })
    }catch(error:any){
        if(error.message==="NOT_FOUND"){
            return res.status(404).json({
                message:"böyle bir email yok"
            })

        }else if(error.message==="WRONG_PASSW"){
            return res.status(400).json({
                message:"Şifre hatalı"
            })
        }
        return res.status(500).json({
            message:"Sunucu hatası"
        });
    }
}