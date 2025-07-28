import app from "./src/app";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

io.on("connection", (socket) => {
  console.log("📡 Yeni bir kullanıcı bağlandı!", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Kullanıcı ayrıldı:", socket.id);
  });
});

const port = process.env.PORT || 2000;

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
