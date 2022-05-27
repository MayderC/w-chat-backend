const express = require("express");



export default  (constroller) =>{
  const router = express.Router();
  
  router.post("/register", constroller.userRegister);
  router.post("/login", constroller.userLogin);
  router.get("/verify", constroller.userVerify);

  return router
}



