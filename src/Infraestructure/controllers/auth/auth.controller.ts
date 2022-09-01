import { AuthService } from "../../../Application/Adapters/services/auth/auth.service";
const { decodeToken, createToken } = require("../../helpers/jsonwebtoken");
import { Request, Response } from "express";

export class AuthController {
  _authService;

  constructor() {
    this._authService = new AuthService();
  }

  async userVerify(req: Request, res: Response){
    const payload = decodeToken(req.headers["token"] || "");
    if (payload.id === "") return res.status(401).send({ msg: "Error" });


    const data = await this._authService.getProfile(payload.id);
    return data ? res.send(data) : res.send({ msg: "Error" });
  };

  async userRegister (req: Request, res: Response){
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ msg: "Error" });

    try {
      const user = await this._authService.register(username, password);
      if (!user) return res.send({ msg: "Error" });

      const token = await createToken({ id: user.id });
      const data = { user, token };
      return res.send({ data });
    } catch (error) {
      return res.send({ msg: "Error" });
    }
  };

  async userLogin (req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) return res.send({ msg: "Error" });

    try {
      const user = await this._authService.login(username, password);
      if (!user) return res.send({ msg: "Error" });

      const token = createToken({ id: user.id });
      const data = { user, token };
      return res.send({ data });
    } catch (error) {
      return res.send({ msg: "Error" });
    }
  };
}
