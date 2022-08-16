const express = require("express");
import IServer from "./IServer";
import IEnvronment from "../../config/environments/IEnvironment";
import auth from "../routes/auth.routes";
const cors = require("cors");
const { sequelize } = require("../database");
const { socketController } = require("../socket/controller");
const { socketAuthorization } = require("../middlewares/socketAuthorization");

import { AuthController } from "../controllers/auth/auth.controller";

const http = require("http");
const { Server: serverSocket } = require("socket.io");

export class Server implements IServer {
  private app;
  private server;
  private io;
  private PORT;
  private PATH;
  _env: string;
  constructor(ENV: IEnvronment) {
    this._env = "test";
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
    this.app.use("/api/auth", auth(new AuthController()));
  }

  userRoutes() {
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
