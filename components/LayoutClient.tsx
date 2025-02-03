"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
// import useWebSocket from "@/hooks/useWebSocket";
import config from "@/config";

interface Notification {
  status: "success" | "error";
  message: string;
}

// All the client wrappers are here (they can't be in server components)
// 1. SessionProvider: Allow the useSession from next-auth (find out if user is auth or not)
// 2. NextTopLoader: Show a progress bar at the top when navigating between pages
// 3. Toaster: Show Success/Error messages anywhere from the app with toast()
// 4. Tooltip: Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content=""
const ClientLayout = ({ children }: { children: ReactNode }) => {
  // useWebSocket();
  // useEffect(() => {
  //   const socket = io('http://localhost:3002'); // Replace with your backend server URL

  //   socket.on('connect', () => {
  //     console.log('Front Connected to WebSocket server');
  //   });

  //   socket.on("status", (data: Notification) => {
  //     if (data.status === "success") {
  //       toast.success(data.message);
  //       console.log(data.message);
  //     } else if (data.status === "error") {
  //       toast.error(data.message);
  //       console.error(data.message);
  //     } else {
  //       console.log(data.message)
  //     }
  //   });

  //   socket.on('error', (data: Notification) => {
  //     console.error(data.message);
  //     toast.error(data.message); // Display error notifications
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Front disconnected from WebSocket server');
  //   });
    
  //   // socket.off("status");

  //   return () => {
  //     socket.disconnect(); // Clean up on unmount
  //   };
  // }, []);
  
  return (
    <>
      <SessionProvider>
        {/* Show a progress bar at the top when navigating between pages */}
        <NextTopLoader color={config.colors.main} showSpinner={false} />

        {/* Content inside app/page.js files  */}
        {children}

        {/* Show Success/Error messages anywhere from the app with toast() */}
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

      </SessionProvider>
    </>
  );
};

export default ClientLayout;
