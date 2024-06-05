<template>
  <!--  账号输入登录-->
  <div class="content">
    <div class="left">
      <img src="../../assets/img2.png" class="people p-animtion" alt="people">
      <img src="../../assets/img1.png" class="sphere s-animtion" alt="sphere">
    </div>
    <div class="right">
      <div class="top">
        <div class="top-item">
          <span class="top-text">首页</span>
        </div>
        <div class="top-item">
          <span class="top-text">注册</span>
        </div>
        <div class="top-item">
          <span class="top-text">其他</span>
        </div>
        <div class="top-item">
          <span class="top-text">帮助</span>
        </div>
      </div>
      <div class="form-wrappepr">
        <h1>欢迎使用，IM 服务</h1>
        <input type="text" class="inputs user" placeholder="请输入邮箱或者账号" v-model="userName">
        <input type="password" class="inputs pwd" placeholder="请输入密码" v-model="password">
        <span class="tips">忘记密码</span>
        <button @click="submit">登陆</button>
        <div class="other-login">
          <div class="divider">
            <span class="line"></span>
            <span class="divider-text">其他方式登陆</span>
            <span class="line"></span>
          </div>
          <div class="other-login-wrapper">
            <div class="other-login-item">
              <img src="../../assets/QQ.png" alt="QQ">
            </div>
            <div class="other-login-item">
              <img src="../../assets/WeChat.png" alt="WeChat">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';
import ListenerMap from '@/listener';
import { useUserInfoStore } from '@/store/userInfo';
import { useConversationSetStore } from '@/store/conversationSet';

const router = useRouter();
const ImSdk = inject('ImSdk');
const userInfoStore = useUserInfoStore();
const conversationSet = useConversationSetStore();

if (!ImSdk) {
  ElNotification({
    title: 'Error',
    message: 'SDK 不可用! 请联系IM服务管理员',
    type: 'error',
  });
  // 可以根据需要进行错误处理或提供默认值
}

const userName = ref('jiangjing');
const password = ref('123456');

const submit = () => {
  if (!userName.value) {
    ElMessage.error('请输入用户名!');
    return;
  }
  if (!password.value) {
    ElMessage.error('请输入密码!');
    return;
  }

  const requestData = {
    userName: userName.value,
    password: password.value,
    loginType: 1,
  };

  axios.post('http://127.0.0.1:8300/v1/login', requestData)
    .then(({ data }) => {
      if (data.code === 200) {
        ElNotification({
          title: 'Success',
          message: '业务系统登陆成功！初始化SDK',
          type: 'success',
        });
        const {
          appId,
          imUserSign,
          userId,
          userSign,
        } = data.data;
        ImSdk.init('http://127.0.0.1:8000/v1', appId, userId, imUserSign, ListenerMap(), (sdk) => {
          if (sdk) {
            ElNotification({
              title: 'Success',
              message: 'WebSocket 连接建立成功!',
              type: 'success',
            });
            userInfoStore.setUserInfo(data.data);
            conversationSet.syncConversationSet();
            router.push({ path: '/conversation' });
          } else {
            ElNotification({
              title: 'Error',
              message: 'WebSocket 连接建立失败! 请联系IM服务管理员',
              type: 'error',
            });
          }
        });
      } else {
        ElNotification({
          title: 'Error',
          message: '业务系统登陆失败！请联系业务系统管理员1',
          type: 'error',
        });
      }
    })
    .catch((error) => {
      ElNotification({
        title: 'Error',
        message: '业务系统登陆失败！请联系业务系统管理员2',
        type: 'error',
      });
    });
  console.log('-----------------------');
};
</script>

<style scoped lang="scss">
:root {
  font-size: 15px;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: #abc6f8;
  background-image: radial-gradient(closest-side, rgb(255, 255, 255), rgba(235, 105, 78, 0)),
  radial-gradient(closest-side, rgb(250, 203, 203), rgba(243, 11, 164, 0)),
  radial-gradient(closest-side, rgb(237, 252, 202), rgba(254, 234, 131, 0)),
  radial-gradient(closest-side, rgb(197, 248, 241), rgba(170, 142, 245, 0)),
  radial-gradient(closest-side, rgb(206, 200, 243), rgba(248, 192, 147, 0));
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

body::after {
  content: "";
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.content {
  width: 90vw;
  height: 90vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  // overflow: hidden;
  .left {
    flex: 1;
    position: relative;

    .sphere {
      position: absolute;
      left: 30%;
      width: 90%;
      z-index: 1;
      animation: sphereAnimation 2s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }

    .people {
      position: absolute;
      left: -50%;
      top: 20%;
      width: 70%;
      // height: 100px;
      z-index: 2;
    }

    .p-animtion {
      animation: peopleAnimation 2s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }

    .p-other-animtion {
      animation-name: pOtherAnimation; // 动画名称
      animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
      animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
      animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
      animation-duration: 3s; // 动画完成时间
    }

    .s-animtion {
      animation: sphereAnimation 2s;
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }

    .s-other-animtion {
      animation-name: sOtherAnimation; // 动画名称
      animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
      animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
      animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
      animation-duration: 3s; // 动画完成时间
    }
  }

  .right {
    flex: 1;
    position: relative;
    z-index: 12;

    .top {
      width: 80%;
      margin-left: 38px;
      color: rgb(51, 52, 124);
      font-size: 20px;
      font-weight: 600;
      font-family: "Century Gothic", Times, serif;
      position: absolute;
      left: 50%;
      top: 5%;
      transform: translate(-50%, 0);

      .top-item {
        float: left;
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-right: 10px;
        transition: 0.5s;

        &:hover {
          border: 0;
          background-color: #fff;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: -20px 10px 32px 1px rgba(182, 183, 185, 0.37);
        }
      }
    }

    .form-wrappepr {
      width: 60%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: right;

      h1 {
        float: left;
        font-family: "Century Gothic", Times, serif;
        margin: 30px 0;
        // color: rgb(68,96,241);
      }

      .inputs {
        display: block;
        width: 100%;
        height: 70px;
        margin: 30px 0;
        border-radius: 10px;
        border: 0;
        background-color: rgb(210 223 237);
        color: rgb(80, 82, 84);
        font-family: "Century Gothic", Times, serif;
        outline: none;
        padding: 20px;
        box-sizing: border-box;
        font-size: 20px;
      }

      .tips {
        display: block;
        margin-top: -15px;
        color: rgb(160, 170, 182);
        cursor: pointer;
      }

      button {
        width: 100%;
        height: 50px;
        background-color: rgb(68, 96, 241);
        border-radius: 10px;
        font-size: 15px;
        color: #fff;
        border: 0;
        font-weight: 600;
        margin: 30px 0;
        cursor: pointer;
        box-shadow: -20px 28px 42px 0 rgba(62, 145, 255, 0.37);
        font-family: "Century Gothic", Times, serif;
      }

      .other-login {
        .divider {
          width: 100%;
          margin: 20px 0;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .line {
            display: inline-block;
            max-width: 35%;
            width: 35%;
            flex: 1;
            height: 1px;
            background-color: rgb(162, 172, 185);
          }

          .divider-text {
            vertical-align: middle;
            margin: 0px 20px;
            // line-height: 0px;
            display: inline-block;
            width: 150px;
            color: rgb(162, 172, 185);
            white-space: normal;
          }
        }

        .other-login-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .other-login-item {
            width: 70px;
            // border: 1px solid rgb(162, 172, 185);
            padding: 10px;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            color: rgb(51, 49, 116);
            margin: 0 10px;
            transition: 0.4s;

            img {
              width: 40px;
              height: 40px;
              vertical-align: middle;
            }

            span {
              vertical-align: middle;
            }

            &:hover {
              width: 80px;
              height: 50%;
              background-color: #fff;
              border: 0;
              box-shadow: -20px 10px 32px 1px rgba(182, 183, 185, 0.37);
            }
          }
        }
      }
    }
  }
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax, 110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax, -30vmax -10vmax, 50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax, -40vmax -20vmax, 40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax, 60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax, 20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax, 90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax, -10vmax 10vmax, 40vmax 60vmax;
  }
}

@keyframes sphereAnimation {
  0% {
    width: 10%;
  }
  100% {
    width: 90%;
    transform: translate(-30%, 5%);
  }
}

@keyframes peopleAnimation {
  0% {
    width: 40%;
  }
  100% {
    width: 70%;
    transform: translate(90%, -10%);
  }
}

@keyframes pOtherAnimation {
  0% {
    transform: translate(90%, -10%);
  }
  100% {
    transform: translate(90%, -15%);
  }
}

@keyframes sOtherAnimation {
  0% {
    transform: translate(-30%, 5%);
  }
  100% {
    transform: translate(-30%, 10%);
  }
}
</style>
