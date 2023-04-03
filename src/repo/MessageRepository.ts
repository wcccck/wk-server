import {Message, MessageStatus} from "../model/Message";
import MessageModel from "../db/model/MessageModel/messageModel";
import MessageModels from "../db/model/MessageModel/messageModel";
import {Op} from 'sequelize'
import '../db/model/MessageModel/sync'

export class MessageRepository{


  static ins = new MessageRepository()
  static getInstance(){
    return MessageRepository.ins
  }

  /**
   * 控制是否刷新
   * @private
   */
  private flash:boolean = false
  public getFlash(){
    return this.flash
  }
  public changeFlash(){
    // 关闭缓存
    this.flash = false
    console.log('nowFlsh',this.flash)
  }
  messages:Record<number, Array<Message>> = {}

  /**
   * 控制是否缓存Msg
   */
  public
  cacheControl = true


  public async getAllMessage(uid:number){
    const id = Number(uid)
    /**
     * 判断cacheControl
     */
    if(this.messages[id]){
      return this.messages[id]
    }else{
       try {
         await this.flushCacheMsg(id)
         return this.messages[uid]
       }catch (e) {
         return e
       }
    }

  }


  public async sendDBMessage(sendMsg:Message,receiveMsg:Message){
    console.log({name:'send',...sendMsg})
    console.log({name:'rece',...receiveMsg})
    const fid = sendMsg.from // 发
    const tid = receiveMsg.to // 收


    try{
      // insert两条新的 此时status还是3
      const r1 = await MessageModel.create({
        ...sendMsg
      })
      const r2 = await MessageModel.create({
        ...receiveMsg
      })
      await this.flushCacheMsg(fid)
      await this.flushCacheMsg(tid)
      return [r1,r2]
    }catch (e) {
      return e
    }

  }

  /**
   * 创建会话之后调用
   * @param uid
   */
  public async readMessage(uid:number){
    const Msgs = await this.getAllMessage(uid) //
    // 仓库里未读的id
    const unRead = Msgs.filter((item)=>{
      if(item.status == MessageStatus.RECEIVE && item.from == uid){
        return item.id
      }
    })
    const unReadPromise = []
    // 只有在unRead为0才flush
    if(unRead.length>0){
      unRead.forEach((id)=>{
        unReadPromise.push(id)
      })
      try{
        for (const unReadPromiseElement of unReadPromise) {
          console.log(unReadPromiseElement)
          await MessageModel.update({status:MessageStatus.READ},{
            where:{
              id:unReadPromiseElement.id
            }
          })
        }
        const result= await this.flushCacheMsg(uid)
        // 开启推送
        this.changeFlash()
        return result
      }catch (e){
        return e
      }
    }


    // 修改DB内容
    // 让服务器重新推送给客户端

  }





  /**
   * get all new Messages
   * @param uid Message from or to ID
   */
  public async queryMessageDB(uid:number){
    const result = await MessageModel.findAll({
      where:{
        [Op.or]: [
          { from: uid },
          { to: uid}
        ]
      }
    })
    return result
  }

  public async flushCacheMsg(uid:number){
      try{
        const result = await this.queryMessageDB(uid)
        this.messages[uid] = result.map((item)=>{
          return {...item.dataValues}
        })
        return true
      }catch (e) {
        return e
      }
  }
}