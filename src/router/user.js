const router = require('express').Router()
const db = require('../db/index')
router.get('/user/:id',(req,res)=>{
  const {id} = req.params
  let query = ''
  if(id){
    query = 'select * from User where id = ?'
    db.query(query,[id],(err,resulet)=>{
      if(!err){
        res.$success(resulet[0])
      }else{
        res.$error('数据库读取不到该数据')
      }

    })
  }else {}


})

router.post('/user',(req,res)=>{
  // const {username,ImageUrl} = req.body
  let uname = req.body.username
  let Image = req.body.ImageUrl
  if(!uname || !Image){
    res.$error({
      msg:"请输入姓名和图片路径",
      code:403
    })
  }else{
    let query = "INSERT INTO User(username,ImageUrl) VALUES(?,?)"
    db.query(query,[uname,Image],(err,result)=>{
      if(err) {
        res.$error(err)
        console.log(err)
        return
      }else{
        res.$success(result)
        console.log(result)
      }

    })
    // res.$success()
  }

})


module.exports = router