const Express = require("express");
const router = Express.Router()

router.get('/',(req,res,next)=>{
  console.log(req)
  res.$success("hello express",201)
})

module.exports = router