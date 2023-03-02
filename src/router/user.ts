const router = require('express').Router()
// const {createToken} = require('../token')
const md5 = require('md5')

router.post('/register',(req,res)=>{
  // const {username,ImageUrl} = req.body
  let uname = req.body.username
  let uPass = req.body.password
  let uEmail = req.body.email
  uPass = md5(uPass + 'wkq')
  if(!uname || !uPass){
    res.$error({
      msg:"请输入姓名和密码和邮箱",
      code:403
    })
  }else{

    res.$success({
      msg:"未开发"
    })
  }

})
router.put('/user/:id',(req,res)=>{
  const {id} = req.params
  const body = req.body

  res.$success({
    msg:"未开发"
  })

})



module.exports = router