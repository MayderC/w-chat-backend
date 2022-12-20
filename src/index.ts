import env from "./config/environments/index";
const { Server } = require("./Infraestructure/webserver/Server");

const main = async () => {
  const app = new Server(env);
  await app.start();
  console.log(`PORT: ${env.PORT}`);
  console.log(`ENVIRONMENT: ${env.NODE_ENV}`);
};

main();
