import { AuthController } from "../controllers/auth/auth.controller";
import { Router } from "express";

export class AuthRoutes {
  private _router;

  constructor(authController: AuthController) {
    this._router = Router();
    this._router.post(
      "/register",
      authController.userRegister.bind(authController)
    );
    this._router.post("/login", authController.userLogin.bind(authController));
    this._router.get("/verify", authController.userVerify.bind(authController));
  }

  get router() {
    return this._router;
  }
}
