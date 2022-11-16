<template>
  <view class="login">
    <view class="login-title">
      <view class="logo">
        <image src="../../static/loginLogo.png" mode="widthFix"></image>
        <text class="titles">云货架</text>
      </view>
    </view>
    <view v-if="isNeedBind" class="logs">
        <view class="number">
          <view class="nbr">
            <u-input placeholder="请输入手机号" adjustPosition border="none" clearable type="number" v-model="number"></u-input>
          </view>
        </view>
        <view class="number">
          <view class="nbr">
            <u-input placeholder="请输入验证码" v-model="code" adjustPosition border="none">
              <u-text :text="btntxt" slot="suffix" type="info" margin="0 10px 0 0" :show="disabled"></u-text>
              <u-text :text="btntxt" slot="suffix" type="error" margin="0 10px 0 0" :show="!disabled" @click="sendSms"></u-text>
            </u-input>
          </view>
        </view>
      <button @click="nextLogin" class="logbtn">登录</button>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';

import {warrantyLogin, saveUmuserPhoneByWX} from "@/api/interface";
export default {
  data() {
    return {
      topTitle: '',
      isNeedBind: false,
      sms: 2,
      number: "",
      password: "",
      code: "",
      btntxt: "发送验证码",
      seconds: 60,
      disabled: false,
      checked: [],
      nextPath: "", //登录成功跳转地址
    };
  },
  onLoad(option) {
    if (option.path) {
      this.nextPath = decodeURIComponent(option.path);
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),

    // 登录后跳转到目标页面
    submitBack() {
      // uInfo 与 lgen-config.js 配置文件中 uInfo 的值一致，自行设置
      uni.setStorageSync('uInfo', 'aa');

      if (!this.nextPath) {
        // 自定义目标地址为空时跳转
        uni.switchTab({
          url: '/pages/wode/wode'
        })
      } else if (this.nextPath.includes('tabPage')) {
        // tabPage 是 tab 页面所在文件夹，根据实际情况设置
        uni.switchTab({
          url: this.nextPath
        })
      } else {
        uni.redirectTo({
          url: this.nextPath
        })
      }
    },
    fn(item) {
      uni.switchTab({
        url: item,
      });
    },
    navTo(item) {
      uni.navigateTo({
        url: item,
      });
    },
    los(item) {
      this.sms = item;
    },

    async login() {
      const res = await new Promise(resolve => {
        wx.login({
          success: res => {
            resolve(res)
          }
        })
      })
      const result = await uni.$request({
        url: warrantyLogin,
        data: {
          js_code: res.code
        }
      })
      uni.setStorageSync("openId", result.dataObj.userOpenid);
      if(result.dataObj.userPhone) {
        this.finalImpl(result.dataObj.userInfo);
        return;
      }
      this.isNeedBind = true;
      this.userOpenid = result.dataObj.userOpenid;
    },

    finalImpl(res) {
      uni.setStorageSync("dataObj", res);
      // this.fn("/pages/home/home");
      this.submitBack()
      uni.showToast({
        title: "登录成功",
      });
      this.setUserInfo(res)
    },
    async nextLogin() {
        const res = await uni.$request({
          method: 'POST',
          url: saveUmuserPhoneByWX,
          data: {
            userPhone: this.number,
            code: this.code,
            userOpenid: this.userOpenid
          }
        })

        if (res.success) {
          this.isNeedBind = false;
          this.finalImpl(res.dataObj);
        }
    },
    sendSms() {
      if (this.number == "") {
        uni.showToast({
          icon: "error",
          title: "手机号不能为空",
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.number)) {
        uni.showToast({
          icon: "error",
          title: "手机号有误",
        });
      } else {
        uni.request({
          url: "https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/sendPhone.json",
          method: "GET",
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "saas-proappcode": "cs3",
            "saas-tenantcode": "00000000",
            // "saas-token": "D144C9033DA73932AD7CE25EEDE39F5D",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
          },
          data: {
            userPhone: this.number,
          },
          success: (res) => {
            console.log(res);
            this.msg = res.data.msg;
            if (this.msg == "操作成功") {
              uni.showToast({
                title: "操作成功",
              });
              const timer = setInterval(() => {
                this.btntxt = this.seconds + "秒再试";
                this.seconds--;
                this.disabled = true;
                if (this.seconds === 0) {
                  clearInterval(timer);
                  this.btntxt = "发送验证码";
                  this.seconds = 60;
                  this.disabled = false;
                }
              }, 1000);
            } else {
              uni.showToast({
                icon: "error",
                title: "发送失败",
              });
            }
          },
        });
      }
    },
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  background: url('../../common/img/bg.png') 100% no-repeat;
  background-size: cover;
  width: 100vw;

  .login-title {
    margin-top: 110rpx;
    text-align: center;

    .titles {
      width: 60px;
      height: 28px;
      display: block;
      color: rgba(51, 51, 51, 1);
      font-size: 20px;
      font-family: PingFangSC-Regular;
      line-height: 28px;
      text-align: left;
      margin: auto;
      padding-top: 20rpx;
      padding-bottom: 70rpx;
    }

    .logo {
      image {
        width: 200rpx;
      }
    }
  }

  .logs {
    width: 80%;
    margin: auto;

    .sms {
      width: 100%;
      margin: auto;

      .chat {
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 25px;
        position: relative;

        .Under {
          width: 20px;
          height: 5px;
          border-bottom: 1px solid #333;
          position: absolute;
          left: 43%;
        }
      }

      .pwd {
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 25px;
        position: relative;

        .Unders {
          width: 20px;
          height: 5px;
          border-bottom: 1px solid #333;
          position: absolute;
          right: 43%;
        }
      }
    }

    .lons {
      width: 100%;
      margin: auto;
      margin-top: 64rpx;
    }

    .alogin {
    }

    .logbtn {
      margin-top: 50px;
      color: #fff;
      background: rgba(224, 37, 27, 1);
      border-radius: 50px;
    }

    .reg {
      color: #999999;
      font-size: 12px;
      text-align: center;
      display: block;
      margin-top: 10px;
    }
  }
}

.high {
  color: rgba(51, 51, 51, 0.59);
  font-size: 15px;
  font-family: PingFangSC-Regular;
}

.highs {
  color: rgba(51, 51, 51, 1);
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
}

.number {
  border: 1px solid rgba(153, 153, 153, 1);
  border-radius: 4px;
  margin: 20px 0;
  height: 42px;

  .nbr {
    padding: 10px 0 0 10px;
  }
}

.number:last-child {
  margin: 20px 0 10px 0;
}
</style>
