// app/api/sse/route.ts
import { NextResponse } from 'next/server';

// Store connected clients with a unique identifier
const clients = new Map<string, ReadableStreamDefaultController>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  // Create a ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Store the controller for this client
      clients.set(clientId, controller);

      // Send initial message to the client
      const data = JSON.stringify({ type: 'connected', message: 'Connected' });
      controller.enqueue(`data: ${data}\n\n`);

      // Handle client disconnect
      request.signal.onabort = () => {
        clients.delete(clientId);
        controller.close();
      };
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

// Function to send a notification to a specific client
export function sendNotificationToClient(clientId: string, data: { type: string; message: string }) {
  const controller = clients.get(clientId);
  if (controller) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    controller.enqueue(message);
  }
}