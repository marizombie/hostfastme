import axios from 'axios';

export const sendTelegramMessage = async (message: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chat_id,
      text: message,
    });
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};