import auth from "./routes/auth.routes";
import cors from "cors";
import express from "express";
import http from "http";
import IServer from "./IServer";
import IEnvronment from "../../config/environments/IEnvironment";
import { AuthController } from "./controllers/auth/auth.controller";
import { sequelize } from "../database";
import { Server as serverSocket } from "socket.io";
import { socketController } from "../socket/controller";
import { socketAuthorization } from "./middlewares/socketAuthorization";

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
    //await sequelize.sync({ force: true });
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
    this.app.use(this.PATH + "/auth", auth(new AuthController()));
  }

  userRoutes() {
    // service instance
    // constroller instance(service)
    // use user route(constroller)
  }

  //socket controllers
  socket() {
    this.io.on("connection", socketController);
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
