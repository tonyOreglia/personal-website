export function websocketConnect(url) {
  const ws = new WebSocket(url, {
      protocolVersion: 8,
      rejectUnauthorized: false
    }
    );
  ws.addEventListener('open', (event) => {
    ws.send('uci');
  });
  return ws;
}