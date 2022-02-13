const express = require("express");
const router = express.Router();

//enviar mensaje para usuario:id
router.post("/message/:id", function (req, res) {
  res.send("MENSAJE");
});

//buscar usuarios

//mensajes entre user logeado y usuario clikeado

//borrar mensaje

//obetner mis mensasajes, usuarios que me enviarion un mensaje, vista asidebar

module.exports = router;
