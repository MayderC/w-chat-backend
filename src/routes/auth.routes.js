const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userVerify,
} = require("../controllers/auth/auth.controller");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/verify", userVerify);

module.exports = router;
