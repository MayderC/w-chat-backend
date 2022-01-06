const express = require('express');
const cors = require('cors');


class Server {

  constructor(ENV){
    this.app = express();
    this.PORT = ENV.PORT
    this.PATH = '/api'

    this.middlewares()
    this.routes()

  }


  middlewares(){
    this.app.use(express.json())
    this.app.use(cors());
  }

  routes(){

  }

  start(){
    return new Promise((resolve, reject) =>{
      this.app.listen(this.PORT, ()=> resolve())
    })
  }

}


module.exports = {Server}