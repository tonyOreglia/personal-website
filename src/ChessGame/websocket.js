export function websocketConnect(url) {
  const ws = new WebSocket(url);
  ws.addEventListener("open", (event) => {
    ws.send("uci");
  });
  return ws;
}
