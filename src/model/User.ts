import {UserChat} from "./UserChat";
import {Friend} from "./Friend";

export class User{
  private id
  private chat:UserChat
  public username:string
  public headImage:string

  public chatID:string
  public QRCode:string
  private Friends:Friend[]=[] // 我的friend

  constructor(id:number,username:string,headImage:string,chatID:string,friends?:Array<Friend>, QRCode?:string) {
    this.id = id
    this.headImage = headImage
    this.chatID = chatID
    this.QRCode = QRCode
    this.username = username
    this.chat = new UserChat(this)
    friends && (this.Friends = friends)
  }
  getId(){
    return this.id
  }
  getChat(){
    return this.chat
  }
}
