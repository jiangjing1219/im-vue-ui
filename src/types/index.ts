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
  nickName?:string,
}

/**
 * 会话信息  未读消息条数
 */
export interface Conversation {
  conversationId: any,
  conversationType: number,
  fromId: any,
  toId: any,
  isMute: any,
  isTop: any,
  sequence: any,
  readedSequence: any,
  appId: any,
  unreadCount: number,
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
  // 0 未发送 1 已发送(接收到服务器回复的ack) 2 已送达（在线-回复接收成功ack，不在线服务器代回复ack） 3 已读（接收端已读）
  messageStatus: any,
}

export type MessageRecordList = MessageRecord[];

export interface MessageRecordMap {
  [key: string]: MessageRecord[]; // 同样，可以指定数组元素的具体类型
}

export interface GroupMessageRecord {
  appId?: string;
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
  // 0 未发送 1 已发送(接收到服务器回复的ack) 2 已送达（在线-回复接收成功ack，不在线服务器代回复ack） 3 已读（接收端已读）
  messageStatus: any,
  memberIds?: string[],
  imei?:string,
}

export interface GroupMessageRecordMap {
  [key: string]: GroupMessageRecord[]; // 同样，可以指定数组元素的具体类型
}

/**
 * 好友用户信息
 */
export interface ImUser {
  // 用户id
  userId: string;
  // 用户名称
  nickName: string;
  // 位置
  location?: string;
  // 生日
  birthDay?: string;
  password?: string;
  // 头像
  photo: string;
  // 性别
  userSex: number;
  // 个性签名
  selfSignature?: string;
  // 加好友验证类型（Friend_AllowType） 1需要验证
  friendAllowType?: number;
  // 管理员禁止用户添加加好友：0 未禁用 1 已禁用
  disableAddFriend?: number;
  // 禁用标识(0 未禁用 1 已禁用)
  forbiddenFlag?: number;
  // 禁言标识 0 为禁言 1 为禁言
  silentFlag: number;
  /**
   * 用户类型 1普通用户 2客服 3 机器人
   */
  userType?: number;
  /**
   * appid
   */
  appId: number;
  /**
   * 删除标识 0 未删除 1 已删除
   */
  delFlag: number;
  extra?: string;
}

export interface ImFriendShipEntity {
  // 应用ID
  appId?: number;
  // 发起方ID
  fromId?: string;
  // 接收方ID
  toId: string;
  // 备注
  remark?: string;
  // 状态：1正常 2删除
  status?: number;
  // 黑名单状态：1正常 2拉黑
  black?: number;
  // 创建时间
  createTime?: number; // 注意：Java中的Long类型在TS中通常对应number，因为TS运行在JavaScript环境中，没有单独的64位整数类型
  // 好友关系序列号
  friendSequence?: number;
  // 黑名单关系序列号
  blackSequence?: number;
  // 好友来源
  addSource?: string;
  // 扩展信息
  extra?: string;
  // 昵称（数据库不存在的字段）
  nickName?: string;
  // 个性签名
  selfSignature?: string;

  label?: string;
  // 在线状态
  onlineStatus?: number;
}
export type ImFriendShipEntityList = ImFriendShipEntity[];

/**
 * 好友请求实体类
 */
export interface ImFriendShipRequest {
  id: number;
  appId: number;
  fromId: string;
  toId: string;
  remark?: string; // 可选字段，表示备注
  readStatus: number;
  addSource?: string; // 可选字段，表示好友来源
  addWording?: string; // 可选字段，自定义添加文字
  approveStatus: number;
  createTime?: number; // 可选字段，创建时间
  updateTime?: number; // 可选字段，更新时间
  sequence: number;
}

export type ImFriendShipRequestList = ImFriendShipRequest[];

export class GroupMember {
  memberId: string;

  alias = '';

  // 0 普通成员, 1 管理员, 2 群主
  speakFlag = '0';

  // 是否全员禁言，0 不禁言；1 全员禁言。
  speakDate = 0;

  joinType = 0;

  // 0 普通成员, 1 管理员, 2 群主
  role = 0;

  constructor(memberId:string) {
    this.memberId = memberId;
  }
}

export interface ImGroupEntity {
  groupId: string;

  appId: number;

  ownerId: string;

  groupType: number;

  groupName: string;

  mute: number;

  applyJoinType: number;

  privateChat: number;

  introduction: string;

  notification: string;

  photo?: string;

  status: number;

  sequence: number;

  createTime: number;

  extra: string;

  memberList:GroupMember[];
}

export type ImGroupList = ImGroupEntity[];

export interface ClientInfo {
  brokerId: number;
  clientType: string;
  appId: string;
  imei: string;
  connectState: string;
  userId: string;
}

export type ClientInfoList = ClientInfo[];
