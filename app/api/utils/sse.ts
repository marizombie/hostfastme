type ClientMap = Map<string, ReadableStreamDefaultController>;

// Store connected clients with a unique identifier
export const clients: ClientMap = new Map();

// Function to send a notification to a specific client
export function sendNotificationToClient(clientId: string, data: { type: string; message: string }) {
  const controller = clients.get(clientId);
  if (controller) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch (error) {
      // If the stream is closed or errored, remove the client
      clients.delete(clientId);
    }
  }
}