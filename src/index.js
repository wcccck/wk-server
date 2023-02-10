const koa = require('koa')
const {koaBody} = require('koa-body')
const Router = require('koa-router')
const fs = require('fs')
const app = new koa()
const router = new Router()

app.use(koaBody({
  multipart:true
}))

router.post('/upload',async(ctx,next)=>{
  
  const {files} = ctx.request.files
  // console.log(ctx.request.files)
  ctx.body = files
  // next()
  // fs.writeFile(files.originalFilename)
})

router.get('/',async(ctx,next)=>{
  ctx.body = 'hhh'
  // next()
})


app.use(router.routes()).use(router.allowedMethods());




app.listen(7777)