


export const onDisconnect = (socket : any) =>{

  socket.on('disconnect', () => {

    socket.disconnect()

  })

}