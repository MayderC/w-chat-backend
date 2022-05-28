const express = require("express");
import IServer from './IServer';
import IEnvronment from '../../config/environments/IEnvironment';
const cors = require("cors");
const auth = require("../../interfaces-adapters/routes/auth.routes");
const user = require("../../interfaces-adapters/routes/user.routes");
const { sequelize } = require("../../frameworks-drivers/database");
const { socketController } = require("../../interfaces-adapters/socket/controller");
const { socketAuthorization } = require("../../interfaces-adapters/middlewares/socketAuthorization");

import AuthController from '../../interfaces-adapters/controllers/auth/auth.controller';
import AuthService from '../services/auth/auth.service'
// socket

const http = require("http");
const { Server: serverSocket } = require("socket.io");

class Server implements IServer {

  private app;
  private server;
  private io;
  private PORT;
  private PATH;
  _env : string;
  constructor(ENV: IEnvronment) {
    this._env = "test"
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

    this.authRoutes()


    this.app.use("/api/user", user);
  }


  //routes
  authRoutes(){
    const authService = new AuthService();
    const authController = new AuthController(authService);

    this.app.use("/api/auth", auth(authController));
  }

  userRoutes(){
    // service instance
    // constroller instance(service)
    // use user route(constroller)
  }

  //socket controllers
  socket() {
    this.io.on("connection", socketController);
    console.log("SOCKET ON");
  }
  start() {
    return new Promise<void>((resolve, reject) => {
      this.server.listen(this.PORT, () => {
        console.log("SERVER ON");
        resolve();
      });
    });
  }
}

module.exports = { Server };
