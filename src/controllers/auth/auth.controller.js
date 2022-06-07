const { AuthService } = require("../../services/auth/auth.service");
const {createToken} = require('../../helpers/jsonwebtoken')
const auth = new AuthService();

const userVerify = async (req, res) => {

  const token = req.headers["token"];
  const data = await auth.getProfile(token);
  return data ? res.send(data) : res.send({ msg: "Error" });
  
};

const userRegister = async (req, res) => {
  const { username, password } = req.body;

  const data = await auth.register(username, password);

  data.token =  await createToken({ id: data.user.id });

  console.log(data)

  return data ? res.send({ data }) : res.send({ msg: "Error" });
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
