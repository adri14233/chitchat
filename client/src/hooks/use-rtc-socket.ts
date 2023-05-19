import { useEffect, useMemo, useState } from 'react';

const useRTCSocket = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [status, setStatus] = useState<number>(3);
  const [error, setError] = useState<string>();

  const connect = async (
    url: string,
    peerJoined: (socket: WebSocket) => void,
    offerReceived: (offer: string, socket: WebSocket) => void,
    answerReceived: (answer: string) => void,
    candidateReceived: (candidate: string) => void
  ) => {
    const baseUrl = `ws://localhost:3003/?room=${url}`;
    const ws = new WebSocket(baseUrl);

    ws.addEventListener('open', () => setStatus(WebSocket.OPEN));
    ws.addEventListener('close', () => setStatus(WebSocket.CLOSED));

    ws.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data) as { type: string; payload?: string };

      console.log('MessageDATA', data);

      if (data.type === 'PeerHasJoined') {
        peerJoined(ws);
      }

      if (data.type === 'Offer' && data.payload) {
        offerReceived(data.payload, ws);
      }

      if (data.type === 'Answer' && data.payload) {
        answerReceived(data.payload);
      }

      if (data.type === 'Candidate' && data.payload) {
        candidateReceived(data.payload);
      }
    });
    setSocket(ws);
  };

  return { connectSocket: connect };
};

export default useRTCSocket;
