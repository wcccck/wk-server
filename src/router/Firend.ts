import {AccountContext} from "../context/AccountContext";

const router = require('express').Router()
import {ChatContext} from "../context/ChatContext";

// get all friend
router.get('/friend/:id',async (req,res)=>{
  const id = req.params.id
  console.log('router')
  const context = AccountContext.getInstance()
  try {
    const result = await context.getFriend(id)
    res.$success(result)
  }catch (e){
    res.$error(e)
  }
})

router.post('/friend/:id',(req,res)=>{
  const myId = req.params.id
  const fid = req.body.fid
  const fName = req.body.fname
  const fImage = req.body.fImage

})

export default router