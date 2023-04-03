// 用来处理一对一对话
import {User} from "./User";
import {Message} from "./Message";

export class ChatSession{
  private from:User
  private to:User
  constructor(from:User,to:User) {
    this.from = from
    this.to = to
  }
  chat(fMessage:Message,tMessage:Message){
    this.from.getChat().sendMessage(fMessage)
    this.from.getChat().receiveMessage(tMessage)
  }
}