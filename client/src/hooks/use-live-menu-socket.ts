import { useEffect, useState } from 'react';
import { ChatMessage } from '../models/chat-message-model';

const useLiveMenuSocket = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [socketStatus, setSocketStatus] = useState<number>(3);

  useEffect(() => {
    return () => socket?.close();
  }, []);

  const connect = (
    url: string,
    handleEdit: (id: string, status: string) => void,
    handleChat: (message: ChatMessage) => void
  ) => {
    const ws = new WebSocket(`ws://localhost:3004/?room=${url}`);
    ws.addEventListener('open', () => setSocketStatus(WebSocket.OPEN));
    ws.addEventListener('close', () => setSocketStatus(WebSocket.CLOSED));

    ws.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data) as { type: string; payload: any };

      console.log('DATA', data);

      if (data.type === 'Edit') {
        const { id, status } = data.payload as { id: string; status: string };
        handleEdit(id, status);
      }

      if (data.type === 'Chat') {
        console.log("THIS IS A CHAT MESSAGE")
        const message = data.payload as ChatMessage;
        console.log(message);
        handleChat(message);
      }
    });

    setSocket(ws);
  };

  const sendEditUpdate = (id: string, status: string): boolean => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'Edit', payload: { id, status } }));
      return true;
    }

    return false;
  };

  const sendChatMessage = (speaker: string, message: string): boolean => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const timestamp = new Date().getTime();
      socket.send(
        JSON.stringify({
          type: 'Chat',
          payload: { timestamp, speaker, message },
        })
      );
      return true;
    }

    return false;
  };

  return { sendEditUpdate, sendChatMessage, connect };
};

export default useLiveMenuSocket;
