const express = require("express");
const cors = require("cors");
const auth = require("../routes/auth.routes");
const { sequelize, initVarsEnv } = require("../database");

class Server {
  constructor(ENV) {
    this.app = express();
    this.PORT = ENV.PORT;
    this.PATH = "/api";

    this.middlewares();
    this.routes();
    this.conexion();
  }

  async conexion() {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Postgres ON");
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api", auth);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.app.listen(this.PORT, () => resolve());
    });
  }
}

module.exports = { Server };
