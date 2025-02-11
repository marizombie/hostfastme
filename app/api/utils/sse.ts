type ClientMap = Map<string, ReadableStreamDefaultController>;
export type Notification = { type: string; message: string };

// Store connected clients with a unique identifier
export const clients: ClientMap = new Map();
// Store connected clients with a unique identifier
export const pendingNotifications = new Map<string, Notification[]>();

// Function to send a notification to a specific client
export function sendNotificationToClient(clientId: string, data: { type: string; message: string }) {
  console.log("clients")
  console.log(clients)
  const controller = clients.get(clientId);
  console.log(controller)
  if (controller) {
    console.log('if')
    const message = `data: ${JSON.stringify(data)}\n\n`;
    try {
      console.log('try')
      controller.enqueue(new TextEncoder().encode(message));
    } catch (error) {
      // If the stream is closed or errored, remove the client
      clients.delete(clientId);
    }
  } else {
    console.log('else')
    console.log(pendingNotifications)
    // If the client is not connected, store the notification for later
    if (!pendingNotifications.has(clientId)) {
      pendingNotifications.set(clientId, []);
    }
    pendingNotifications.get(clientId)?.push(data);
  }
}