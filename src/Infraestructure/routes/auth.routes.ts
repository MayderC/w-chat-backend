const express = require("express");

export default (controller: any) => {
  const router = express.Router();

  router.post("/register", controller.userRegister);
  router.post("/login", controller.userLogin);
  router.get("/verify", controller.userVerify);

  return router;
};
