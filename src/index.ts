import { DependencyContainer } from "./config/container/DependencyContainer";
import IServer from "./Infraestructure/webserver/IServer";
import "reflect-metadata"


const main = async () => {
  try {
    const dependency = new DependencyContainer();
    const server: IServer = dependency.container.resolve("server");
    await server.start();
    console.log("Server running on port 3000");
  } catch (error) {
    console.log(error);
  }
};

main();