const router = require('express').Router()
const db = require('../db/index')
const {verToken,createToken} = require('../token')
const md5 = require('md5')


router.post('/login',(req,res,next)=>{

  let {username,password} = req.body
  if(username && password){
    password = md5(password + 'wkq')
    let query = "select * from User where username = ?"
    db.query(query,[username],(err,result)=>{
      if(!err){ // 进入查询
        const userInfo = result[0]
        if(result.length > 0){ // 查询到了结果
          if(password === userInfo.password){//密码正确
            let myToken = createToken({username:username,Id:userInfo.Id})
           // console.log(myToken)
            //   创建token 并且返回
            res.$success({token:myToken,username,id:userInfo.Id})
          }else{
            res.$error('密码错误',403)
          }


        }else{
          res.$error('密码错误或者用户不存在')
        }

      }else{
        res.$error(err)
      }

      // if(!err){
      //   console.log(result)
      //   res.$success({msg:result[0]})
      // }else{
      //   res.$error("密 码错误或者用户名不存在")
      //   // next()
      // }
    })
  }

  // res.$success('test')
})


module.exports = router