const Express = require('express')
const app = new Express()
const upload = require('./router/upload')
const user = require('./router/user')
const login = require('./router/login')
import Friend from './router/Firend'
import Message from "./router/Message";
import './db/model/UserModel/syncModel'
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
  // res.header({
  //   "Context-Type":"text/event-stream",
  //   "Cache-Control":"no-cache",
  //   "Connections":"keep-alive"
  // })
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
  let i = 0
  const r = await context.getMessage(id)
  let len = r.length
  var interval = setInterval(async function () {
    const Message = await context.getMessage(id)
    const result = JSON.stringify(Message)
    if(len !== Message.length){
      res.write("data: " + (result) + "\n\n");
      len = Message.length
    }
  }, 300);

  req.connection.addListener('close',function (){
    clearInterval(interval)
  },false)
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



// app.use(upload)
// app.use(user)
app.use(login)
app.use(Message)
app.use(Friend)


app.listen(port,()=>{
  console.log('server is running http://localhost:7777')
})
// io.on('connection', function(socket){
//   console.log("草泥马的")
//   socket.emit('news', {hello :'world'});
//   socket.on('my other event', function(data){
//     console.log(data);
//   });
// });

