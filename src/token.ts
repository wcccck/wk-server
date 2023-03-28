

const jwt = require('jsonwebtoken')

const secret = "first_token" // 自定义秘钥

const createToken = function (Data){ // 通过Data生成token
  let token = jwt.sign(Data,secret,{
    expiresIn:60*60*24  // s为单位
  })
  return token
}

const verToken = function (token){
  return new Promise((resolve,reject)=>{
    const info = jwt.verify(token,secret,(err,decoded)=>{
      if(err){
        return {token:'token失效'}
      }else {
        return {token:"没事"}
      }

    })
    resolve(info)
  })
}

module.exports = {secret,verToken,createToken}

