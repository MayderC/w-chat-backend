const {createToken, decodeToken} = require('../../helpers/jsonwebtoken')



const userRegister = (req, res) =>{

  const {username, email, password} = req.body
  
  // servicio.login, si los datos son correctos retornar token, sino error


  if(result){
    return res.se
  }

}


const userLogin = async(req, res) =>{
  const token = await createToken({name : "mayder"})
  const payload = decodeToken(token)

  console.log(payload)

  res.send({token : token, payload : payload});
}



