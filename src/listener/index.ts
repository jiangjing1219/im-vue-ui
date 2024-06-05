import { useMessageRecordStore } from '@/store/messageRecord';
import { MessageRecord } from '@/types';

const messageRecordStore = useMessageRecordStore();

const ListenerMap = {
  onSocketConnectEvent: (option: never, status: never, data: never) => {
    console.log(`已建立连接:${JSON.stringify(status)}`);
  },
  onSocketErrorEvent: (error: never) => {
    console.log('连接出现错误:', error);
  },
  onSocketReConnectEvent: () => {
    console.log('正在重连:');
  },
  onSocketCloseEvent: () => {
    console.log('连接关闭:');
  },
  onSocketReConnectSuccessEvent: () => {
    console.log('重连成功');
  },
  onTestMessage: (e: never) => {
    console.log(`onTestMessage ：${e}`);
  },
  onP2PMessageAck: (e: never) => {
    console.log(`onP2PMessageAck-消息发送成功ack ：${e}`);
  },
  /**
   * {
   *     "toId": "311968820887553",
   *     "messageKey": 359078612172801,
   *     "messageTime": 1717522825000,
   *     "clientType": 1,
   *     "messageBody": "{\"type\":1,\"content\":\"@@@\"}",
   *     "appId": 10000,
   *     "imei": "UNIAPP",
   *     "messageId": "v2d93cgwly1717522825763",
   *     "messageSequence": 576,
   *     "fromId": "312144459464705"
   * }
   * @param e
   */
  onP2PMessage: (e: any) => {
    const receiveMessage = JSON.parse(e.data);
    const message:MessageRecord = {
      isMe: false,
      messageRandom: '',
      messageStatus: 1,
      fromId: receiveMessage.fromId,
      toId: receiveMessage.toId,
      messageKey: receiveMessage.messageKey,
      messageTime: receiveMessage.messageTime,
      clientType: receiveMessage.clientType,
      messageBody: JSON.parse(receiveMessage.messageBody).content,
      messageId: receiveMessage.messageId,
      messageSequence: receiveMessage.messageSequence,
      messageType: 1,
    };
    messageRecordStore.addMessageRecord('', message);
    console.log('监听回调，接收到消息', e.data);
    // 事件发布   fromId   toID - 自己   会话id
  },
  onMutualLogin: (e: never) => {
    console.log('多端登录限制，当前端下线', e);
  },
  onLogin: (uid: string) => {
    console.log(`用户${uid}登陆sdk成功`);
  },
};

export default ListenerMap;
