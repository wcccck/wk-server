import express from 'express'
const Router = express.Router()
import {ResType} from "../ResType";
import {DB} from "../db/DB";
import {Message} from "../model/Message";
import {ChatContext} from "../context/ChatContext";

// 获取自己的收件箱或者发件箱
Router.get('/message/:id',async (req,res:ResType)=>{
  const id = req.params.id
  res.setHeader("cache-control","max-age=0")
  // const messageType = req.query.messageType
  const context = ChatContext.getInstance()
  const result = await context.getMessage(Number(id))
  // const email = req.query.Email
  // const email = req.body

  res.$success(result)
})

// 发送自己的信息 有一个发送的ID 给接受者的接受信息中添加 和自己的发送信息里添加
Router.post('/message',async (req,res:ResType)=>
{
  const Message= req.body as Message
  const id = req.body.from // selfID
  const context = ChatContext.getInstance()
  const MessageId = await context.sendMessage(id,Message)

  // console.log(MessageId)
  if(MessageId){
    res.$success(MessageId,200)
  }else{
    res.$error('错误')
  }

})

// 删除自己的信息 通过id
Router.delete('/message',(req,res)=>{

})

Router.put('/message/:id',async (req,res:ResType)=>{
  const id = req.params.id
  const ctx=  ChatContext.getInstance()

  try {
    const result = await ctx.readMessage(Number(id))
    res.$success(result)
  }catch (e) {
    res.$error(e)
  }

  // readMessage
})




export default Router