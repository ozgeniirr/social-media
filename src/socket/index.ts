import { Server } from "socket.io";
import  {socketAuth} from "../middlewares/socketAuth";
import  registerNotificationHandlers from "./handlers/notification";


 let io : Server;

export const initSocket = (server:any) => {
  io = new Server(server, {
    cors: { origin: "*"},
  });

  io.use(socketAuth);


  io.on("connection", (socket) =>{
    const userId = socket.data.user?.userId;
    if(userId){

      socket.join(`user:${userId}`);
      console.log(`Kullanıcı ${userId} odasına katıldı.`)
    }

    console.log("Yeni bağlantı kuruldu. ", socket.id);

    registerNotificationHandlers(io, socket);


    socket.on("disconnect", () =>{
      console.log(`Kullanıcı ${socket.id} odadan ayrıldı.`)
    });
    
    

  })};



    
    export const getIo = () => io;