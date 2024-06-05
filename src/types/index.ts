/**
 * 登录请求参数接口
 */
export interface LoginReq {
  userId:string,
  appId:string,
  clientType:number,
}

export interface Person {
  userId:string,
  appId:string,
  clientType:number,
}

/**
 * 消息记录的实体类
 */
export interface MessageRecord {
  messageId:any,
  fromId:any,
  isMe:any,
  toId:any,
  messageBody:any,
  messageTime:any,
  messageKey:any,
  messageSequence?:any,
  clientType:any,
  messageRandom?:any,
  messageType:any,
  // 0 未发送 1 已发送 2 已送达 3 已读
  messageStatus:any,
}

export interface messageRecordMap {
  [key: string]: MessageRecord[]; // 同样，可以指定数组元素的具体类型
}

/**
 * 定义一个自定义类型
 */
export type Persons = Person[];
