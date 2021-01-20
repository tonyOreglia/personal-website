const fs = require("fs");

export default class Pipe {
  constructor(pathToPipe) {
    const fd = fs.openSync("pathToPipe", "r+");
    this.wPipe = fs.createWriteStream(pathToPipe);
    this.rPipe = fs.createReadStream(null, { fd });
  }

  startReader() {
    this.rPipe.on("data", (data) => {
      console.log(data.toString());
    });
  }

  write(message) {
    this.wPipe.write(message);
  }
}
