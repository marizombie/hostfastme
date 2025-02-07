type ClientMap = Map<string, ReadableStreamDefaultController>;

// Store connected clients with a unique identifier
export const clients: ClientMap = new Map();

// Function to send a notification to a specific client
export function sendNotificationToClient(clientId: string, data: { type: string; message: string }) {
  const controller = clients.get(clientId);
  if (controller) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    controller.enqueue(new TextEncoder().encode(message));
  }
}