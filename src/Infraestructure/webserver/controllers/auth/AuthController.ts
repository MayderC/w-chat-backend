import { AuthService } from "../../../../Adapters/services/auth/AuthService";

import { decodeToken, createToken } from "../../helpers/jsonwebtoken";
import { Request, Response } from "express";
import {STATUS, statusMSG} from "../../constants/http-codes";

export class AuthController {
  private readonly _authService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  async userVerify(req: Request, res: Response) {

    const token = req.headers['authorization']

    const payload = decodeToken(token || "");
    try {
      const data = await this._authService.getProfile(payload.id);
      return data
        ? res.status(STATUS.OK).send(data)
        : res.status(STATUS.UNAUTHORIZED).send(statusMSG('Authentication error'));
    }catch (e) {
      return res.status(STATUS.UNAUTHORIZED).send(statusMSG('Authentication error'));
    }
  }

  async userRegister(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this._authService.register({username, password});
      if (!user) return res.status(STATUS.BAD).send(statusMSG('Registration failed'));
      const token = await createToken({ id: user.id, exp: 1 });
      return res.send({ data: { user, token } });
    } catch (error) {
      return res.status(STATUS.BAD).send(statusMSG('Registration failed'));
    }
  }

  async userLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await this._authService.login({username, password});
      if (!user) return res.status(STATUS.UNAUTHORIZED).send({ msg: "Authentication failed" });
      const token = await createToken({ id: user.id, exp: 1 });
      const data = { user, token };
      return res.send({ data });
    } catch (error) {
      return res.status(STATUS.UNAUTHORIZED).send({ msg: "Authentication failed" });
    }
  }
}
