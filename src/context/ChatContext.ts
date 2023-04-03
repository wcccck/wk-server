import {UserRepository} from "../repo/UserRepository";
import {Message} from '../model/Message'
import '../db/model/MessageModel/sync'
import {MessageRepository} from "../repo/MessageRepository";
export class ChatContext{ // chat场景
  static instance = new ChatContext()
  private repo = UserRepository.getInstance()
  private msgRepo = MessageRepository.getInstance()
  static getInstance(){
    return ChatContext.instance
  }
  public async sendMessage(fromId:number,msg:Message){
    const fid = Math.floor(fromId)
    const tid = Math.floor(msg.to)
    const sendMessage = {...msg}
    const receiveMessage = {...msg}
    try {
      const User = await this.repo.getUser(fid)
      const toUser = await this.repo.getUser(tid)
      const session = User.getChat().createSession(toUser)
      session.chat(sendMessage,receiveMessage)
      const fMsg= this.msgRepo.getAllMessage(fid)
      const tMsg= this.msgRepo.getAllMessage(tid)

      // this.msgRepo.getAllMessage()
      // 创建两个Message 接受和发送
      await this.msgRepo.sendDBMessage(sendMessage,receiveMessage)
      return [fMsg,tMsg]
    }catch (e){
      return e
    }



  }

  // public async getMessage()
  public async readMessage(uid:number){
      try {
        const result = await this.msgRepo.readMessage(uid)
        return result
      }catch (e){
        return e
      }
  }

  public async getMessage(uid:number){
    const result = await this.msgRepo.getAllMessage(uid)
    return result
  }

  public async flushMsg(uid:number){
    await this.msgRepo.flushCacheMsg(uid)
  }
  public getFlash():boolean{
    return this.msgRepo.getFlash()
  }

  /**
   * 是否给客户端推送新的数据
   */
  public changeFlash(){
    this.msgRepo.changeFlash()
  }



}