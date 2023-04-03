const multer = require('multer')
const md5 = require('md5');
const path = require('path')
// 文件处理中间件
const resolve = (p)=>{
  return path.resolve(__dirname,'./',p)
}
let storage = multer.diskStorage({
  // 存储路径
  destination:function (req,file,cb){
    // console.log('存储路径')
    cb(null,'uploads')
    // if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
    //   // console.log('存储路径')
    //   // cb(null,resolve('../../public/uploads'))
    //
    // }else {
    //   cb({error:"mime type not supported"})
    // }
  },
  // 文件名字
  filename:function (req,file,cb){
    let fileFormat = (file.originalname).split('.')
    console.log(fileFormat)
    console.log(file.originalname)
    cb(null,'t' + '.' + fileFormat[0] + '.' + fileFormat[fileFormat.length-1])
  }
})

const multerConf = multer({storage,limits:{
    // fileSize: 1024 * 1024,
  },})

export default multerConf