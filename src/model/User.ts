import {UserChat} from "./UserChat";

export class User{
  private id
  private chat:UserChat
  public username:string
  private friend:Record<number, object> = {} // 我的friend
  // public username
  // private friend
  constructor(id:number,username:string) {
    this.id = id
    this.username = username
    this.chat = new UserChat(this)
  }
  getId(){
    return this.id
  }
  getChat(){
    return this.chat
  }
}
