import { io } from "socket.io-client";

const socket = io("http://localhost:2000", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("✅ Bağlantı başarılı, ID:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Bağlantı koptu");
});

socket.on("connect_error", (err) => {
  console.error("❌ Bağlantı hatası:", err.message);
});
