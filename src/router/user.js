const router = require('express').Router()
const db = require('../db/index')
const {createToken} = require('../token')

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
  // return

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
        res.$error({msg:err.message})
      }else{
        let token = createToken({username:uname})
        console.log(token)
        res.$success({token,info:"创建成功",username:uname})
      }

    })
    // res.$success()
  }

})
router.put('/user/:id',(req,res)=>{
  const {id} = req.params
  const body = req.body
  if(id && body.username && body.ImageUrl){
    // 操作数据库
    let query = "UPDATE User set username=?,ImageUrl=? where id=? "
    db.query(query,[body.username,body.ImageUrl,id],(err,result)=>{
      if(err){
        res.$error({msg:err.message})
      }else{
        res.$success({msg:result.message},201)
      }
    })
  }else {
    res.$error({
      msg:"缺少参数",
    },403)
  }

})

router.delete('/user/:id',(req,res)=>{
  const {id} = req.params
  if(id){
    let query = "DELETE from User where id =?"
    db.query(query,[id],(err,result)=>{
      if(err){
        res.$error({msg:err.message})
      }else{
        // console.log(result)
        res.$success({msg:result.message},201)
      }
    })
  }else {
    res.$error({
      msg:"缺少参数",
    },403)
  }
})

module.exports = router