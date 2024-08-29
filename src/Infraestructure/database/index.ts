const { Sequelize } = require("sequelize");
import ENV from "../../config/environments";

import "reflect-metadata";
import { DataSource } from "typeorm";

export const sequelize = new Sequelize(ENV.DB_STRING_CONECTION, {
  dialectOptions: {
    /*
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },*/
  },
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5431,
  username: "admin",
  password: "admin",
  database: "mychat",
  entities: [__dirname + "/entities/*.entity{.ts,.js}"], // Incluye todas las entidades en el proyecto
  synchronize: true,
  logging: false,
});
