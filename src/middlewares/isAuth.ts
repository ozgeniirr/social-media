import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";   

declare module "express" {
  export interface Request {
    user?: { userId: number; email: string; role: string };
  }
}

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verifyToken(token); // ✅ burada kendi fonksiyonunu kullanıyorsun
    req.user = payload;                      // payload zaten { userId, email, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};
