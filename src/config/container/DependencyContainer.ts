import { createContainer } from "awilix";
import { AwilixContainer } from "awilix/lib/container";
import { InjectionMode } from "awilix/lib/injection-mode";
import { asClass, asFunction, asValue } from "awilix/lib/resolvers";
import { Server } from "../../Infraestructure/webserver/Server";
import environments from "../environments/index";
import { AuthController } from "../../Infraestructure/webserver/controllers/auth/AuthController";
import { AuthService } from "../../Adapters/services/auth/AuthService";
import { AuthRoutes } from "../../Infraestructure/webserver/routes/AuthRoutes";
import {AuthRepository} from "../../Adapters/repositories/AuthRepository";

export class DependencyContainer {
  private readonly _container: AwilixContainer;

  constructor() {
    this._container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });

    this.environmentsVars();
    this.repositories();
    this.services();
    this.controllers();
    this.routes();
    this._container.register({
      server: asClass(Server).singleton(),
    });
  }

  get container() {
    return this._container;
  }

  controllers() {
    this._container.register({
      authController: asClass(AuthController).scoped(),
    });
  }
  routes() {
    this._container.register({
      authRoutes: asClass(AuthRoutes).singleton(),
    });
  }
  services() {
    this._container.register({
      authService: asClass(AuthService).scoped(),
    });
  }
  environmentsVars() {
    this._container.register({
      env: asValue(environments),
    });
  }
  repositories(){
    this._container.register({
      authRepository: asClass(AuthRepository).scoped()
    })
  }
}
