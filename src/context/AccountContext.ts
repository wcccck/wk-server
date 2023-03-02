import {UserRepository} from "../repo/UserRepository";
import '../db/model/UserModel/syncModel'
// import Token from '../token'

export class AccountContext{ // 一个场景 scene
  static instance = new AccountContext()
  private repo = UserRepository.getInstance()
  static getInstance(){
    return AccountContext.instance
  }
  public async login(uname,pwd){

    const User = await this.repo.getUser(uname,pwd) // 查找数据库console.log(User)
    // const Token = createTo
    const Info = {
      id:'',
      username:''
    }
    if(User){
      Info.id = User.getId()
      Info.username = User.username
    }
    return  Info
    // return User
    // if(User){
    //
    //   // console.log(User)
    //   // console.log(typeof User)
    //   return User
    // }else{
    //   console.log("用户不存在")
    // }

    // this.repo
    // repo先去数据库看看 有的话 createToken 或者 从本地token拿
  }

  public async getFriend(id:number){
    const result = await this.repo.getFriend(id)
    return result
    // 通过自己ID查询数据 获得所有friend 需要发送一次请求来操作 也可以在User初始化的时候就数据库获取
  }
}