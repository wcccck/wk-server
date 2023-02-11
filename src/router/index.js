const Express = require("express");
const router = Express.Router()

router.get('/',(req,res,next)=>{
  res.$success("hello express",201)
})

module.exports = router