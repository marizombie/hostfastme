// import { useEffect } from "react";
// import { toast } from "react-hot-toast";
// import io from "socket.io-client";
// // import dotenv from "dotenv";

// // // reads only from .env, so ok for prod, but locally needs extra file
// // // front shouldn't know much on env vars 
// // dotenv.config();


// interface Notification {
//   status: "success" | "error";
//   message: string;
// }

// const socket = io(`http://localhost:3002`); // needs change, to depend on vars as server?

// // const useWebSocket = (): any => {
// //   useEffect(() => {
// socket.on("status", (data: Notification) => {
//   console.log('Front connected to WebSocket server');
//   if (data.status === "success") {
//     toast.success(data.message);
//     console.log(data.message);
//   } else if (data.status === "error") {
//     toast.error(data.message);
//     console.error(data.message);
//   } else {
//     console.log(data.message)
//   }
// });

// socket.on('disconnect', () => {
//   console.log('Front disconnected from WebSocket server');
// });

// // return () => {
// socket.off("status");
// // };
// //   }, []);

// //   return null; // This component doesn't render anything visible
// // };

// // export default useWebSocket;
