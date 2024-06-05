import { useMessageRecordStore } from '@/store/messageRecord';

const ListenerMap = () => {
  const messageRecordStore = useMessageRecordStore();
  return {
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
    onP2PMessage: (e: any) => {
      console.log('接收回调', e.data);
      const receiveMessage = JSON.parse(e).data;
      const message = {
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
      messageRecordStore.addMessageRecord(message.fromId, message);
      console.log('监听回调，接收到消息', message);
      // 事件发布   fromId   toID - 自己   会话id
      // todo 直接回复已读 ack, 后续修改为点击进入聊天框
      // eslint-disable-next-line max-len
      window.imsdk.im.sendP2PMessageReadAck(message.messageKey, message.fromId, message.messageSequence);
    },
    onMutualLogin: (e: never) => {
      console.log('多端登录限制，当前端下线', e);
    },
    onLogin: (uid: string) => {
      console.log(`用户${uid}登陆sdk成功`);
    },
  };
};

export default ListenerMap;
