import { useMessageRecordStore } from '@/store/messageRecord';
import { useFriendRequestStore } from '@/store/friendRequestList';
import { ImFriendShipRequest } from '@/types';
import { useConcatListStore } from '@/store/contactsList';

const ListenerMap = () => {
  const friendRequestStore = useFriendRequestStore();
  const messageRecordStore = useMessageRecordStore();
  const concatListStore = useConcatListStore();
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
    onFriendRequest: (e: any) => {
      console.log('收到好友请求', JSON.parse(e).data);
      const friendRequest:ImFriendShipRequest = JSON.parse(e).data;
      friendRequestStore.addFriendShipRequest(friendRequest);
    },
    onFriendRequestApprove: (e: any) => {
      console.log('多端同步，其他端审核了好友申请', JSON.parse(e).data);
      const result = JSON.parse(e).data;
      friendRequestStore.approveFriendRequest(result.id, result.status);
    },
    onFriendRequestRead: (e: any) => {
      console.log('多端同步，其他端已读好友申请', JSON.parse(e).data);
    },
    /**
     * {
     *     "toId": "312144459464705",  好友id
     *     "sequence": 61,
     *     "addSource": "1",
     *     "remark": "",
     *     "fromId": "311968820887553"  自己
     * }
     * @param e
     */
    onAddFriend: (e: any) => {
      console.log('新增好友事件回调', JSON.parse(e).data);
      concatListStore.onAddFriend(JSON.parse(e).data.toId);
    },
    /**
     * {
     *     "groupType": 1,
     *     "groupId": "b5af75d37af049019e0e7b49052038bb",
     *     "photo": "",
     *     "mute": 0,
     *     "ownerId": "311968820887553",
     *     "notification": "群公告",
     *     "sequence": 1,
     *     "groupName": "testGroupName",
     *     "createTime": 1718807746543,
     *     "appId": 10000,
     *     "introduction": "群简介",
     *     "applyJoinType": 0,
     *     "status": 1
     * }
     * @param e
     */
    onCreateGroup: (e: any) => {
      console.log('新建群聊事件回调', JSON.parse(e).data);
      concatListStore.onAddGroup(JSON.parse(e).data);
    },
  };
};

export default ListenerMap;
