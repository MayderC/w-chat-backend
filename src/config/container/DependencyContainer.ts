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
import { AppDataSource } from "../../Infraestructure/database";
import { User } from "../../Infraestructure/database/entities/user.entity";
import { MessageService } from "../../Adapters/services/message/mesageService";
import { RoomUser } from "../../Infraestructure/database/entities/roomUser.entity";
import { Room } from "../../Infraestructure/database/entities/room.entity";
import { Friend } from "../../Infraestructure/database/entities/friend.entity";

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
      appDataSource: asValue(AppDataSource),
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
      messageService: asClass(MessageService).scoped()
    });
  }
  environmentsVars() {
    this._container.register({
      env: asValue(environments),
    });
  }
  repositories(){
    this._container.register({
      authRepository: asClass(AuthRepository).scoped(),
      userRepository: asFunction(() => AppDataSource.getRepository(User)).scoped(),
      roomRepository: asFunction(() => AppDataSource.getRepository(Room)).scoped(),
      roomUserRepository: asFunction(() => AppDataSource.getRepository(RoomUser)).scoped(),
      friendRepository: asFunction(() => AppDataSource.getRepository(Friend)).scoped(),
    })
  }
}
