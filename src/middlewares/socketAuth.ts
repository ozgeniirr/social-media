import { Socket } from "socket.io";
import { verifyToken } from "../utils/jwt";

export const socketAuth = async (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const payload = await verifyToken(token);  
    socket.data.user = payload;               
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
