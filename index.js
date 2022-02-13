const ENVIRONMENT = require("./src/config/environments");
const { Server } = require("./src/server");

const main = async () => {
  const app = new Server(ENVIRONMENT);
  await app.start();
  console.log(`PORT: ${ENVIRONMENT.PORT}`);
  console.log(`ENVIRONMENT: ${ENVIRONMENT.NODE_ENV}`);
};

main();
