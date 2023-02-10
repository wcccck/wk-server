const Express = require('express')
const app = new Express()
const router = require('./router/index')
const upload = require('./router/upload')
const port = 7777
const resultHandle = require('./middleware/resultMiddleWare')
const bodyParser = require('body-parser')

const db = require('./db/index')
const query = "INSERT INTO User(username,ImageUrl) VALUES('caonima','hhaha')"
// const query2 = "update User set username=1 where id = 1"

db.query(query,(err,result)=>{
  if(err){
    console.log(err.message)
  }else {
    console.log(result[0].username)
  }

})


app.use('/uploads/',Express.static('./public/'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(resultHandle)

app.use(router)
app.use(upload)
app.listen(port,()=>{
  console.log('server is running http://localhost:7777')
})


