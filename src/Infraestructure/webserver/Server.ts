import cors from "cors";
import express from "express";
import http from "http";
import IServer from "./IServer";
import IEnvronment from "../../config/environments/IEnvironment";
import { sequelize } from "../database";
import { Server as ServerSocket } from "socket.io";
import { socketController } from "../socket/controller";
import { socketAuthorization } from "./middlewares/socketAuthorization";
import { AuthRoutes } from "./routes/AuthRoutes";

export class Server implements IServer {
  private app;
  private server;
  private io;
  private PORT;
  private PATH;
  private readonly _env: IEnvronment;
  private _authRoutes: AuthRoutes;
  constructor(env: IEnvronment, authRoutes: AuthRoutes) {
    this._authRoutes = authRoutes;
    this._env = env;
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new ServerSocket(this.server, {
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });
    this.PORT = this._env.PORT;
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
    this.app.use(this.PATH + "/auth", this._authRoutes.router);
  }

  socket() {
    this.io.on("connection", (socket)=>{
      socketController(socket, this.io)
    });
  }
  async start() {
    await this.server.listen(this.PORT);
  }
}
