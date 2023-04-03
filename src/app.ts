const Express = require('express')
const app = new Express()
const upload = require('./router/upload')
const user = require('./router/user')
const login = require('./router/login')
import Friend from './router/Firend'
import Message from "./router/Message";
import './db/model/UserModel/syncModel'
import Discover from './router/Discover'
const port = 7777
const resultHandle = require('./middleware/resultMiddleWare')
const bodyParser = require('body-parser')
const {expressjwt} = require('express-jwt')
const {createToken,secret}= require("./token")
const cors = require('cors')

app.use(cors())
app.use('/uploads/',Express.static('./public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(resultHandle)
import {ChatContext} from "./context/ChatContext";

app.get('/stream/:id',async (req,res)=>{
  const id = req.params.id
  const context = ChatContext.getInstance()
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  const r = await context.getMessage(id)
  let len = r.length

  let interval = setInterval(async function () {
    const flush = context.getFlash()
    const Message = await context.getMessage(id)
    const result = JSON.stringify(Message)
    if(len !== Message.length){ // 长度不对 重新读取
      res.write("data: " + (result) + "\n\n");
      len = Message.length
    }else if(flush){ // 刷新仓库
      const fl = await context.flushMsg(id)
      const msg = await context.getMessage(id)
      const result =JSON.stringify(msg)
      res.write("data: " + (result) + "\n\n");
      console.log('推送新的信息')
      context.changeFlash() // 关闭刷新
      console.log('推送关闭',context.getFlash())
    }
  }, 0);

  req.connection.addListener('close',function (){
    clearInterval(interval)
  },false)
})

app.get('/chatSession/:id',(req,res)=>{
  const id = req.params.id
  const ctx = ChatContext.getInstance()
  var inter = setInterval(async ()=>{
     await ctx.readMessage(id) // 一直去读取
  },0)
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  res.write("data: " + (new Date()) + "\n\n");
  req.connection.addListener('close',function (){
     // 修改为关闭状态 避免重复
    if(ctx.getFlash()==true) ctx.changeFlash()
    clearInterval(inter)
    console.log('SSEcloseFlash应该是false',ctx.getFlash())
  })
})
// token + 白名单
app.use(expressjwt({
  secret,
  credentialsRequired:true,
  algorithms:['HS256'],
  getToken:function (req){
    let token = req.headers.token
    return token
  }
}).unless({
  path:[
      '/login',
      '/',
      '/testdb',
      '/register',
      '/socket.io',
      '/stream',
  ]
}))

// token 验证 中间件
app.use((err,req,res,next)=>{
  console.log(err.name) // UnauthorizedError token验证不通过
  if(err.name === 'UnauthorizedError'){
    res.$error({msg:"token失效"},401)
  }else{
    next()
  }
})


app.use(login)
app.use(Message)
app.use(Friend)
app.use(Discover)

app.listen(port,()=>{
  console.log('server is running http://localhost:7777')
})


