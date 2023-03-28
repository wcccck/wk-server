import {User} from "./User";
import {Message, MessageStatus, MessageType} from "./Message";
import {ChatSession} from "./ChatSession";
import MessageModel from "../db/model/MessageModel/messageModel";
import '../db/model/MessageModel/sync'
import {Op} from "sequelize";
export class UserChat{
  private user:User
  public Msgs:Array<Message> = []
  private session:Record<number, ChatSession>= {} // 存放会话
  constructor(user:User) {
    this.user = user

  }

  public createSession(to:User){
    console.log(to)
    if(this.session[to.getId()]){
      return this.session[to.getId()]
    }else{
      const newSession = new ChatSession(this.user,to)
      this.session[to.getId()] = newSession
      return newSession
    }

  }
  public sendMessage(msg:Message){ // 我发送信息

    this.Msgs.push(msg)
    msg.status = MessageStatus.SEND // 信息状态改成发送完毕
    msg.type = MessageType.SEND
  }
  public receiveMessage(msg:Message){ // 我接受信息
    this.Msgs.push(msg)
    msg.status = MessageStatus.RECEIVE // 接受信息完毕
    msg.type = MessageType.RECEIVE
  }
  public readTo(LastId:number = 0){ // 将读取的信息状态修改
    const reads = this.Msgs.filter(item=>{
      return item.id <= LastId && item.status == MessageStatus.RECEIVE
    })
    reads.forEach(item=>{
      item.status = MessageStatus.READ
    })
  }

  public getMessage(toId:number){
    // get谁的
  }
  public unReadMessage(LastId:number){
    const unRead = this.Msgs.filter(item=>{
      return item.id > LastId
    })
    return unRead
  }

}