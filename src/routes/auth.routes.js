const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
} = require("../controllers/auth/auth.controller");

router.post("/auth/register", userRegister);
router.post("/auth/login", userLogin);

module.exports = router;
