import AuthService from "../../../aplication-bussines-rules/services/auth/auth.service";
const {decodeToken, createToken} = require("../../helpers/jsonwebtoken")
import Express from "express";

export default class AuthController {

  _authService;

  constructor(authService : AuthService){
    this._authService = authService
  }

   userVerify = async (req : Express.Request, res : Express.Response) => {

    const payload = decodeToken(req.headers["token"] = "");
    if (!payload) return res.status(401).send({msg : "Error"});
  
  
    const data = await this._authService.getProfile(payload.id);
    return data ? res.send(data) : res.send({ msg: "Error" });
  };
  
   userRegister = async (req : Express.Request, res : Express.Response) => {

    const { username, password } = req.body;
    if(!username || !password) return res.status(400).send({ msg: "Error" })
  
    try {
      const user = await this._authService.register(username, password);
      if(!user) return res.send({ msg: "Error" });

      const token = createToken({id : user.id})
      const data = {user, token}
      return  res.send({ data }) 

    } catch (error) {
      return res.send({ msg: "Error" });
    }
  };
  
   userLogin = async (req : any, res : any) => {
    const { username, password } = req.body;
    if(!username || !password) return res.send({ msg: "Error" })

    try {
      const user = await this._authService.login(username, password);
      if(!user) return res.send({ msg: "Error"})
      
      const token = createToken({id : user.id})
      const data = {user, token}
      return res.send({ data }) 

    } catch (error) {
      return res.send({ msg: "Error" });
    }
  };
  
  
}