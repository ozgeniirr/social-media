import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TEST_TOKEN;

const socket = io("http://localhost:2000", {
  transports: ["websocket"],
  auth: {
    token: token
  }
});

socket.on("connect", () => {
  console.log("✅ Bağlantı kuruldu");
});

socket.on("notification", (data) => {
  console.log("📨 Bildirim alındı:", data);
});

socket.on("disconnect", () => {
  console.log("❌ Bağlantı kesildi");
});
