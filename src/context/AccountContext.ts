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