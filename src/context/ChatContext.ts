import {UserRepository} from "../repo/UserRepository";
import {Message} from '../model/Message'
import {DB} from "../db/DB";
import MessageModel from "../db/model/MessageModel/messageModel";
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
      // this.msgRepo.getAllMessage()
      // 创建两个Message 接受和发送
      await this.msgRepo.sendDBMessage(sendMessage,receiveMessage)
    }catch (e){
      console.log(e)
    }


    return fid
  }

  // public async getMessage()
  public async readMessage(uid:number){
    const user = await this.repo.getUser(Math.floor(uid))
  }

  public async getMessage(uid:number){
    const result = await this.msgRepo.getAllMessage(uid)
    return result
  }

}