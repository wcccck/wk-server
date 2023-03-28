import {AccountContext} from "../context/AccountContext";

const router = require('express').Router()


const {verToken,createToken} = require('../token')
const md5 = require('md5')


router.post('/login',async (req,res,next)=>{

  let {username,password} = req.body
  const Context = AccountContext.getInstance()
  // password = md5(password + 'wkq')
  try {
    const result = await Context.login(username,password)
    let myToken = createToken({...result})
    res.$success({...result,myToken})
  }catch (e){
    res.$error("用户名或密码错误")
  }

})


module.exports = router