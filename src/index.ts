import { DependencyContainer } from "./config/container/DependencyContainer";
import IServer from "./Infraestructure/webserver/IServer";

const dependency = new DependencyContainer();

const main = async () => {
  try {
    const server: IServer = dependency.container.resolve("server");
    await server.start();
  } catch (error) {
    console.log(error);
  }
};

main();
