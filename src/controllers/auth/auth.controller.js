const { AuthService } = require("../../services/auth/auth.service");
const auth = new AuthService();

const userRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    //retorna un token si se registro correctamente, false si no
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
};
