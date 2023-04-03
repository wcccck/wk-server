import {User} from "../model/User";
import UserModel from "../db/model/UserModel/userModel";
import FriendModel from "../db/model/FriendModel/FriendModel";
import '../db/model/UserModel/syncModel'
import '../db/model/FriendModel/sync'
// import
export class UserRepository{ // 用户仓库
  private users:Record<number, User> = {}
  public static instance = new UserRepository()
  static getInstance(){
    return UserRepository.instance
  }

  public async getUser(id:number):Promise<User>
  public async getUser(username:string,password:string):Promise<User>
  public async getUser(idefity:number | string ,password?:string):Promise<User>{
    if(typeof idefity === 'number'){

      const id = idefity
      if(this.users[id]){ // 已经有了 没必要创建
        console.log('用户缓存')
        return this.users[id]
      }else{
        const dataUser = await UserModel.findOne({
          where:{
            id
          }
        })
        let user
        if(dataUser.dataValues){
          const id = dataUser.dataValues.id
          const username = dataUser.dataValues.username
          const headImage = dataUser.dataValues.headImage
          const chatID = dataUser.dataValues.chatID
          user = new User(id,username,headImage,chatID)
          this.users[id] = user
        }
        return user
      }
    }else{
      const username = idefity;
      const result = await UserModel.findOne({
        where:{
          username,
          password
        }
      })
      let user
      if(result.dataValues){
        const id = result.dataValues.id
        const username = result.dataValues.username
        const headImage = result.dataValues.headImage
        const chatID = result.dataValues.chatID
        user = new User(id,username,headImage,chatID)
        this.users[id] = user
      }
      return user
    }

  }

  public async getFriend(id:number):Promise<object>{
    const test = []
    const result = await FriendModel.findAll({
      where:{
        user_id:id
      }
    })
    let i = 0
    while (i<result.length){
      test.push(await this.getUser(result[i].dataValues.friend_id))
      i++
    }

    console.log(test)
    return result
  }

}