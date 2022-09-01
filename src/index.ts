const env: IEnvronment = require("./config/environments");
import IServer from "./Infraestructure/webserver/IServer";
import IEnvronment from "./config/environments/IEnvironment";
const { Server } = require("./Infraestructure/webserver/Server");

const main = async () => {
  const app: IServer = new Server(env);
  await app.start();
  console.log(`PORT: ${env.PORT}`);
  console.log(`ENVIRONMENT: ${env.NODE_ENV}`);
};

main();
