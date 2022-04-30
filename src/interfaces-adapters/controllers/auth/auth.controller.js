const { AuthService } = require("../../../aplication-bussines-rules/services/auth/auth.service");
const {decodeToken, createToken} = require("../../../helpers/jsonwebtoken")
const auth = new AuthService();

const userVerify = async (req, res) => {

  const payload = decodeToken(req.headers["token"] = "");
  if (!payload) return res.status(401).send({msg : "Error"});


  const data = await auth.getProfile(payload.id);
  return data ? res.send(data) : res.send({ msg: "Error" });
};

const userRegister = async (req, res) => {
  const { username, password } = req.body;

  const user = await auth.register(username, password);
  if(!user) return res.send({ msg: "Error" });

  const token = createToken({id : user.id})
  const data = {user, token}

  return  res.send({ data }) 
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  const data = await auth.login(username, password);
  return data ? res.send({ data }) : res.send({ msg: "Error" });
};

module.exports = {
  userLogin,
  userRegister,
  userVerify,
};
