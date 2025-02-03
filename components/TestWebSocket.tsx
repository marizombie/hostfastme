"use client";

import { useEffect } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';

interface Notification {
    status: "success" | "error";
    message: string;
  }

const WebSocketTester = () => {
  useEffect(() => {
    // const socket = io('http://localhost:3002'); // Match backend URL and port

    const manager = new io.Manager('http://localhost:3002', {
        port: '3002',
        secure: true
      });
    const socket = manager.socket("/");

    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
    });

    socket.on('message', (data: any) => {
      console.log('Message received:', data);
      toast.success(data.data);
    });

    socket.on("status", (data: Notification) => {
      console.log('Notification received')
      if (data.status === "success") {
        toast.success(data.message);
        console.log(data.message);
      } else if (data.status === "error") {
        toast.error(data.message);
        console.error(data.message);
      } else {
        console.log(data.message)
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>WebSocket Tester</div>;
};

export default WebSocketTester;
