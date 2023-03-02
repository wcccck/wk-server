export enum MessageStatus {
  SENDING = 0,
  SEND,
  RECEIVING,
  RECEIVE,
  READ,
  ERROR
}

export enum MessageType{
  SEND,
  RECEIVE,
  SYSTEM,
  NOTIFY
}

interface MessageData{
  id:number,
  status:MessageStatus,
  type:MessageType,
  from:number,
  to:number,
  createdAt?
}

export interface MessageImage extends MessageData{
  img:string
}

export interface MessageText extends MessageData{
  msg:string
}

export type Message = MessageImage | MessageText