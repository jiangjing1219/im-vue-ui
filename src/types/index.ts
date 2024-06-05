/**
 * 用户信息
 */
export interface UserInfo {
  userId: any,
  appId: any,
  clientType?: any,
  birthDay: any,
  photo?: any,
  userSex: any,
  selfSignature?: any,
  friendAllowType?: any,
  disableAddFriend?: any,
  userType?: any,
  imUserSign?: any,
  userSign?: any,
}

export interface Conversation {
  conversationId: any,
  conversationType: any,
  fromId: any,
  toId: any,
  isMute: any,
  isTop: any,
  sequence: any,
  readedSequence: any,
  appId: any,
}

export type ConversationSet = Conversation[];

/**
 * 消息记录的实体类
 */
export interface MessageRecord {
  messageId: any,
  fromId: any,
  isMe: any,
  toId: any,
  messageBody: any,
  messageTime: any,
  messageKey: any,
  messageSequence?: any,
  clientType: any,
  messageRandom?: any,
  messageType: any,
  // 0 未发送 1 已发送 2 已送达 3 已读
  messageStatus: any,
}

export interface messageRecordMap {
  [key: string]: MessageRecord[]; // 同样，可以指定数组元素的具体类型
}
