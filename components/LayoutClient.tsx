"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import { toast } from 'react-hot-toast';
// import useWebSocket from "@/hooks/useWebSocket";
import config from "@/config";

// All the client wrappers are here (they can't be in server components)
// 1. SessionProvider: Allow the useSession from next-auth (find out if user is auth or not)
// 2. NextTopLoader: Show a progress bar at the top when navigating between pages
// 3. Toaster: Show Success/Error messages anywhere from the app with toast()
// 4. Tooltip: Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content=""
const ClientLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const clientIdMatch = window.location.href.match(/[?&]clientId=([^&]+)/);
    const clientId = clientIdMatch ? clientIdMatch[1] : null;
    if (clientId) {
      const eventSource = new EventSource(`/api/sse?clientId=${clientId}`);

      eventSource.onopen = () => {
        console.log('SSE connection opened');
      };

      eventSource.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as { type: string; message: string };
        if (data.message !== "Connected") {
          toast(data.message, {
            duration: 5000,
            style: { 
              background: '#ff5555',
              'color': 'white'
            },
          })
        }
      };

      eventSource.onerror = (errorEvent) => {
        console.error('SSE error');
        console.log('EventSource details:', {
          url: eventSource.url,
          readyState: eventSource.readyState,
        });
        console.log(errorEvent)
        eventSource.close();
        localStorage.removeItem('clientId')
      };

      return () => {
        eventSource.close();
        localStorage.removeItem('clientId')
      };
    }
  }, []);
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
