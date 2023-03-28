const Express = require("express");
const router = Express.Router()
const multerConfig = require('../middleware/multerMiddleWare')

export function uploadFile(req,res){
  return new Promise((resolve,reject)=>{
    multerConfig.single('file')(req,res,function (err){
      if(err){
        reject(err)
      }else {
        resolve('上传成功')
      }
    })
  })
}

router.post('/upload',(req,res)=>{
  uploadFile(req,res).then(res2=>{
    res.$success(res2)
  }).catch(err =>{
    res.$error(err)
  })


})


module.exports = router