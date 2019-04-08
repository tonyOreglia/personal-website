const WebSocket = require('ws');

export function websocketConnect(url) {
  const ws = new WebSocket(url, {
    origin: "glee-git-master.tony-oreglia.now.sh",
    protocolVersion: 8,
    rejectUnauthorized: false
  });
  ws.addEventListener('open', (event) => {
    ws.send('uci');
  });
  return ws;
}