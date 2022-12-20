const express = require("express");

export default (controller: any) => {
  const router = express.Router();

  router.post("/register", controller.userRegister.bind(controller));
  router.post("/login", controller.userLogin.bind(controller));
  router.get("/verify", controller.userVerify.bind(controller));

  return router;
};
