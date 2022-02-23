const { AuthService } = require("../../services/auth/auth.service");
const auth = new AuthService();

const userVerify = async (req, res) => {
  const token = req.headers["token"];
  try {
    const data = await auth.getProfile(token);
    return data ? res.send(data) : res.send({ msg: "Error" });
  } catch (error) {
    return res.send({ msg: "Error" });
  }
};

const userRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await auth.register(username, password);
    return data ? res.send({ data }) : res.send({ msg: "Error" });
  } catch (error) {
    return res.send({ msg: "Error" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await auth.login(username, password);
    return data ? res.send({ data }) : res.send({ msg: "Error" });
  } catch (error) {
    return res.send({ msg: "Error" });
  }
};

module.exports = {
  userLogin,
  userRegister,
  userVerify,
};
