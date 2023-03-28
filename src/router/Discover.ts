import {DiscoverContext} from "../context/DiscoverContext";
import multer from 'multer'
import multerConf from '../middleware/multerMiddleWare'
// const upload = multer({dest:'uploads/',preservePath:true})
const Router = require('express').Router()

Router.get('/discover',( async (req,res)=>{
  const ctx =  DiscoverContext.getInstance()
  const result = await ctx.getMyFrDiscover(1)
  res.$success(result)
}))

Router.post('/discover',multerConf.any(),async (req,res)=>{
  const ctx = DiscoverContext.getInstance()
  const files = req.files
  const sendMsg = JSON.parse(req.body.sendMsg)
  try{
    const result = await ctx.sendDiscover(sendMsg)
    res.$success({files,urlArr:['1','2','3'],sendMsg,result})
  }catch (e) {
    res.$error(e)
  }
})

Router.post('/discover/comment/:id',async (req,res)=>{
  const id = req.query.id || req.params.id
  const msg = req.body.msg
  const username = req.body.username
  const selfId = req.body.id
  const comment ={id:selfId,name:username,msg}
  console.log(comment)
  console.log(id)
  const ctx =  DiscoverContext.getInstance()
  try {
    const result = await ctx.commentDiscover(comment,id)
    res.$success(result)
  }catch (e) {
    res.$error(e)
  }
})
export default Router