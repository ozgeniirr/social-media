import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export const generateToken = (userId: number, email: string, role:string ): string => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", 
  });
};



export const verifyToken = async (
  token: string
): Promise<{ userId: number; email: string; role: string }> => {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("Kullanıcı veritabanında bulunamadı");
  }

  return {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
};
