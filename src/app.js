const Express = require('express')
const app = new Express()
const router = require('./router/index')
const upload = require('./router/upload')
const user = require('./router/user')
const login = require('./router/login')
const port = 7777
const resultHandle = require('./middleware/resultMiddleWare')
const bodyParser = require('body-parser')
// const jwt = require("jsonwebtoken");
const {expressjwt} = require('express-jwt')
const {createToken,secret}= require("./token")



app.use('/uploads/',Express.static('./public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(resultHandle)

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
      '/'
  ]
}))

app.use((err,req,res,next)=>{
  console.log(err.name) // UnauthorizedError token验证不通过
  if(err.name === 'UnauthorizedError'){
    res.$error({msg:"token失效"},401)
  }else{
    next()
  }
})

app.use(router)
app.use(upload)
app.use(user)
app.use(login)

app.listen(port,()=>{
  console.log('server is running http://localhost:7777')
})


