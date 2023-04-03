
type dataType = {
  code?,
  msg?,
  data?
}
module.exports = function (req,res,next) {
  const _data:dataType = {}
  res.$success =  (data, code = 200)=> {
    res.status(code)
    _data.code = code
    if (typeof data === 'object') {
      _data.data = data
      _data.msg = 'success'
    } else {
      _data.msg = data
    }
    res.send(_data)
  }
  res.$error = (data, code = 500)=> {
    res.status(code)
    _data.code = code
    if (typeof data === 'object') {
      _data.data = data
      _data.msg = 'error'
    } else {
      _data.msg = data
    }
    res.send(_data)
  }
  next()
}