const onMessage = (socket) => {
  socket.on("send-message", async (message) => {
    console.log(socket.userInfo, message);
    //guardar en DB. llamar a servicio que guarda msg
    //const messageInfo = await Message.create({})
    // notificar a usuario destino. si el mensaje se guardo
    // solo a los 2 suaurios, data.id_user and friend
    socket.emit("message-to", message);
  });
};

module.exports = { onMessage };
