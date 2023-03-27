import { AuthService } from "../../../../Adapters/services/auth/AuthService";
const { decodeToken, createToken } = require("../../helpers/jsonwebtoken");
import { Request, Response } from "express";

export class AuthController {
  private readonly _authService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  async userVerify(req: Request, res: Response) {
    const payload = decodeToken(req.headers["token"]);
    const data = await this._authService.getProfile(payload.id);
    return data ? res.send(data) : res.send({ msg: "Error" });
  }

  async userRegister(req: Request, res: Response) {
    console.log("Refistrandome desde el constroldor")
    try {
      const { username, password } = req.body;
      const user = await this._authService.register(username, password);
      if (!user) return res.send({ msg: "Error" });

      const token = await createToken({ id: user.id });
      return res.send({ data: { user, token } });
    } catch (error) {
      console.log(error)
      return res.send({ msg: "Error" });
    }
  }

  async userLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await this._authService.login(username, password);
      if (!user) return res.send({ msg: "Error" });

      const token = createToken({ id: user.id });
      const data = { user, token };
      return res.send({ data });
    } catch (error) {
      return res.send({ msg: "Error" });
    }
  }
}
