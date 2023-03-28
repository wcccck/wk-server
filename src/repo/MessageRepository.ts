import {Message} from "../model/Message";
import MessageModel from "../db/model/MessageModel/messageModel";
import {Op} from 'sequelize'
import '../db/model/MessageModel/sync'
import MessageModels from "../db/model/MessageModel/messageModel";
export class MessageRepository{


  static ins = new MessageRepository()
  static getInstance(){
    return MessageRepository.ins
  }

  messages:Record<number, Array<Message>> = {}

  public async getAllMessage(uid:number){
    const id = Number(uid)
    if(this.messages[id]){
      console.log('消息缓存')
      return this.messages[id]
    }else{
      const Result = await MessageModel.findAll({
        where:{
          [Op.or]: [
            { from: id },
            { to: id}
          ]
        }
      })
      const a = Result.map(res=>{
        return {...res.dataValues}
      })
      this.messages[uid] = a
      return a
    }


  }

  public async sendDBMessage(sendMsg:Message,receiveMsg:Message){
    console.log({name:'send',...sendMsg})
    console.log({name:'rece',...receiveMsg})
    const fid = sendMsg.from // 发
    const tid = receiveMsg.to // 收
    if(this.messages[fid]){
      this.messages[fid].push(sendMsg)
    }else{
      this.messages[fid] = []
      this.messages[fid].push(sendMsg)
    }
    if(this.messages[tid]){
      this.messages[tid].push(receiveMsg)
    }else{
      this.messages[tid] = []
      this.messages[tid].push(receiveMsg)
    }


    const r1 = await MessageModels.create({
      ...sendMsg
    })
    const r2 = await MessageModel.create({
      ...receiveMsg
    })
    console.log({name:"缓存Message",...this.messages})
    return [r1,r2]

  }
}