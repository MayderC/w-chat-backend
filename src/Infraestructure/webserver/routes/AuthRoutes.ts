import { AuthController } from "../controllers/auth/AuthController";
import { Router } from "express";
import { validations } from "../middlewares/valitadionResults";
import { check, header } from "express-validator";

export class AuthRoutes {
  private _router;

  constructor(authController: AuthController) {
    this._router = Router();
    this._router.post(
      "/register",
      this.userRegisterMiddle,
      authController.userRegister.bind(authController)
    );
    this._router.post(
      "/login",
      this.userLoginMiddle,
      authController.userLogin.bind(authController)
    );
    this._router.get(
      "/verify",
      this.userVerifyMiddle,
      authController.userVerify.bind(authController)
    );
  }

  get userLoginMiddle() {
    return [...this.commonMiddle];
  }

  get commonMiddle() {
    return [
      check("username", "the username must not be empty").notEmpty(),
      check("password", "the password must not be empty").notEmpty(),
      validations,
    ];
  }

  get userRegisterMiddle() {
    return [...this.commonMiddle];
  }

  get userVerifyMiddle() {
    return [header("token", "the  token is required").notEmpty()];
  }

  get router() {
    return this._router;
  }
}
