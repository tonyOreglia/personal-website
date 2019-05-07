const config = {};

config.gleeUri = process.env.NODE_ENV === "development" ? 
      "ws://localhost:8081/uci" : "wss://tonycodes.com:8081/uci";


export default config;