import {UserRepository} from "../repo/UserRepository";
import '../db/model/UserModel/syncModel'
// import Token from '../token'

export class AccountContext{ // scene
  static instance = new AccountContext()
  private repo = UserRepository.getInstance()
  static getInstance(){
    return AccountContext.instance
  }
  public async login(uname,pwd){

    const User = await this.repo.getUser(uname,pwd) // 查找数据库console.log(User)
    // const Token = createTo
    console.log(User)
    const Info = {
      id:'',
      username:'',
      headImage:'',
      chatID:'',
      QRCode:''
    }
    if(User){
      Info.id = User.getId()
      Info.username = User.username
      Info.headImage = User.headImage
      Info.chatID = User.chatID
      Info.QRCode = User.QRCode
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

  /**
   *  getAllFriend
   * @param id selfUserId
   */
  public async getFriend(id:number){
    const result = await this.repo.getFriend(id)
    return result

  }


}