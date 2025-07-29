import { Socket, Server } from "socket.io";

type FollowPayload = {
  toUserId: number;
};

export default function registerNotificationHandlers(io:any, socket:any){

  socket.on("follow", ({ toUserId}: FollowPayload)=>{
    const fromUserId = socket.data.user!.userId;
    if(!fromUserId){
      console.warn("User not authenticated for follow event")
      return;
    }
    console.log(`User ${fromUserId} followed to User ${toUserId}`)


    io.to(`user: ${toUserId}`).emit("notification", {
      type:"follow",
      message:`User: ${fromUserId} started following you.`
    });
  })};