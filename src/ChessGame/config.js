import bunyan from 'bunyan';

const config = {
  gleeUri: process.env.NODE_ENV === "development" ? 
    "ws://localhost:8081/uci" : "wss://tonycodes.com:8443/uci",
  WHITE: 'w',
  BLACK: 'b',
  logger: bunyan.createLogger({
    name: 'chess-board'
  })
};

export default config;
