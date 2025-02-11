// app/api/sse/route.ts
import { NextResponse } from 'next/server';
import { clients, pendingNotifications, Notification } from '../utils/sse';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  // Create a ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      console.log("start controller SSE")
      // Store the controller for this client
      clients.set(clientId, controller);

      // Send initial message to the client
      const data = JSON.stringify({ type: 'connected', message: 'Connected' });
      controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      console.log(pendingNotifications)
      // Check for pending notifications and send them
      if (pendingNotifications.has(clientId)) {
        const notifications = pendingNotifications.get(clientId);
        if (notifications) {
          console.log("notifications")
          console.log(notifications)
          notifications.forEach((notification: Notification) => {
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(notification)}\n\n`));
          });
          console.log("delete")
          pendingNotifications.delete(clientId);
        }
      }

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        console.log('abort')
        if (clients.has(clientId)) {
          clients.delete(clientId);
          controller.close();
        }
      });
    },
  });

  // Return the response with SSE headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}