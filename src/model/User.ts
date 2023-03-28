import {UserChat} from "./UserChat";

export class User{
  private id
  private chat:UserChat
  public username:string
  public headImage:string

  public chatID:string
  public QRCode:string
  private friend:Record<number, object> = {} // 我的friend

  // public username
  // private friend
  constructor(id:number,username:string,headImage:string,chatID:string, QRCode?:string) {
    this.id = id
    this.headImage = headImage
    this.chatID = chatID
    this.QRCode = QRCode
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
