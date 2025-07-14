const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("code-change", (code) => {
    // Broadcast to all other users
    socket.broadcast.emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
