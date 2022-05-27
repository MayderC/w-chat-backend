const {decodeToken, createToken} = require("../../helpers/jsonwebtoken")


export default class AuthController {

  _authService;

  constructor(authService : any){
    this._authService = authService
  }

   userVerify = async (req : any, res : any) => {

    const payload = decodeToken(req.headers["token"] = "");
    if (!payload) return res.status(401).send({msg : "Error"});
  
  
    const data = await this._authService.getProfile(payload.id);
    return data ? res.send(data) : res.send({ msg: "Error" });
  };
  
   userRegister = async (req : any, res : any) => {
    const { username, password } = req.body;
  
    const user = await this._authService.register(username, password);
    if(!user) return res.send({ msg: "Error" });
  
    const token = createToken({id : user.id})
    const data = {user, token}
  
    return  res.send({ data }) 
  };
  
   userLogin = async (req : any, res : any) => {
    const { username, password } = req.body;
  
    const data = await this._authService.login(username, password);

    // create token if login service is okey


    return data ? res.send({ data }) : res.send({ msg: "Error" });
  };
  
  
}