const useMediaSocket = () => {
  const connect = (
    url: string,
    speaker: string,
    start: (socket: WebSocket) => void,
    stop: () => void
  ) => {
    const baseUrl = `ws://localhost:3002/?room=${url}&speaker=${speaker}`;
    const ws = new WebSocket(baseUrl);

    ws.addEventListener('message', (ev: MessageEvent) => {
      const { callUpdate } = JSON.parse(ev.data) as {
        callUpdate: { status: string };
      };

      console.log('CALL UPDATE', callUpdate);

      if (callUpdate.status === 'STARTED') {
        console.log('STARTED RECORDING');
        start(ws);
      }

      if (callUpdate.status === 'PAUSED') {
        stop();
      }
    });
  };

  return { connectSocket: connect };
};

export default useMediaSocket;
