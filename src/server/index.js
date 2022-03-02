const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth.routes");
const user = require("../routes/user.routes");
const { sequelize } = require("../database");
const { socketController } = require("../socket/controller");
const { socketAuthorization } = require("../middlewares/socketAuthorization");
// socket

const http = require("http");
const { Server: serverSocket } = require("socket.io");

class Server {
  constructor(ENV) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new serverSocket(this.server, {
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });
    this.PORT = ENV.PORT;
    this.PATH = "/api";

    this.middlewares();
    this.routes();
    this.conexion();
    this.socket();
  }
  async conexion() {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Postgres ON");
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: 200,
      })
    );
    this.io.use(socketAuthorization);
  }
  routes() {
    this.app.use("/api/auth", auth);
    this.app.use("/api/user", user);
  }
  socket() {
    this.io.on("connection", socketController);
    console.log("SOCKET ON");
  }
  start() {
    return new Promise((resolve, reject) => {
      this.server.listen(this.PORT, () => {
        console.log("SERVER ON");
        resolve();
      });
    });
  }
}

module.exports = { Server };
