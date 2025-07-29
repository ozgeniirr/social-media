import http from "http";
import app from "./src/app";
import { initSocket } from "./src/socket";

const server = http.createServer(app);
initSocket(server);

server.listen(2000, () => {
  console.log("🚀 Server running on http://localhost:2000");
});
