import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

// reads only from .env, so ok for prod, but locally needs extra file
dotenv.config();

interface Notification {
  status: "success" | "error";
  message: string;
}

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXTAUTH_URL, // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`${new Date().toString()} Client connected: ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.warn(`${new Date().toString()} Client disconnected: ${socket.id}, Reason: ${reason}`);
  });

  socket.on('error', (err) => {
    console.error(`${new Date().toString()} Socket error for client ${socket.id}:`, err);
  });

  // Emit a test message to confirm event delivery
  socket.emit('message', { data: 'Hello from the backend!' });

});

// httpServer.listen(Number(process.env.SOCKET_PORT), 
// () => console.log(`Socket.IO server running on port ${process.env.SOCKET_PORT}`));


export const emitNotification = (notification: Notification) => {
  io.emit("status", notification);
};

export const emitMessage = (data: string) => {
  io.emit("message", { data });
};

io.emit('hello', { message: 'This is a test notification' });
export default io;
