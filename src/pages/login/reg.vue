<template>
  <view class="reg">
    <view class="login-title">
      <view class="logo">
        <image src="../../static/loginLogo.png" mode="widthFix"></image>
        <text class="titles">云货架</text>
      </view>
    </view>
    <view class="regm">
      <text class="text_1">欢迎注册</text>
      <text class="text_2">已有账号？</text><text class="text_3" @click="navTo('/pages/login/login')">登录</text>
      <view class="number marbot">
        <view class="nbr">
          <u-input placeholder="请输入手机号" border="none" @change="blue" adjustPosition clearable type="number" v-model="number"></u-input>
        </view>
      </view>
      <view class="tish">
        <text v-show="tishi" style="font-size: 10px; color: rgba(224, 37, 27, 1);">{{numbers}}</text>
      </view>
      <view class="number martop">
        <view class="nbr">
          <u-input placeholder="请输入验证码" v-model="yanz" adjustPosition border="none">
            <u-text :text="btntxt" slot="suffix" type="info" margin="0 10px 0 0" :show="disabled"></u-text>
            <u-text :text="btntxt" slot="suffix" type="error" margin="0 10px 0 0" :show="!disabled" @click="sendSms"></u-text>

          </u-input>
        </view>
      </view>
      <view class="number marbot">
        <view class="nbr">
          <u--input placeholder="请输入密码" @change="pwds" v-model="password" border="none" password adjustPosition>
          </u--input>
        </view>
      </view>
      <view class="tish">
        <text v-show="pwd" style="font-size: 10px; color: rgba(224, 37, 27, 1);">密码必须是8-16位，且至少大小写字母和数字组合</text>
      </view>
      <view class="checked">
        <u-checkbox-group v-model="checked">
          <u-checkbox size="14px" activeColor="red" label="阅读并同意"></u-checkbox>
          <text style="color: rgba(224, 37, 27, 1);font-size: 14px;" @click="navTo('/pages/login/agree')">用户协议</text>、
          <text style="color: rgba(224, 37, 27, 1);font-size: 14px;" @click="navTo('/pages/login/policy')">隐私政策</text>
        </u-checkbox-group>
      </view>

      <button @click="reg" class="regg">立即注册</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tishi: false,
      pwd: false,
      numbers: '',
      checked: [],
      number: '',
      password: '',
      yanz: '',
      btntxt: '获取验证码',
      blues: '',
      seconds: 60,
      disabled: false,
      chongfu: '',
      tips: '',
      value: '',
      msg: ''
    }
  },
  methods: {
    //校验密码格式
    pwds() {
      this.pwd = !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this.password))
    },
    //手机号是否注册
    blue() {
      if (this.number != '') {
        this.tishi = false
      }
      uni.request({
        url: 'https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/getPhoneForPlaRegSc.json',
        method: "GET",
        header: {
          // 'Accept': 'application/json, text/plain, */*',
          // 'Accept-Language': 'zh-CN,zh;q=0.9',
          // 'Connection': 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          // 'Cookie': 'sidebarStatus=0; JSESSIONID=jzioNZm_HVnL1eDx-QeV-08Of5r0wbtpiImj_75B',
          // 'Referer': 'https://cscommercial.saas.qianjiangcloud.cn/paas/cs-cli-pc/',
          // 'Sec-Fetch-Dest': 'empty',
          // 'Sec-Fetch-Mode': 'cors',
          // 'Sec-Fetch-Site': 'same-origin',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
          'saas-proappcode': 'cs3',
          'saas-tenantcode': '00000000',
          'saas-token': 'D144C9033DA73932AD7CE25EEDE39F5D'
          // 'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          // 'sec-ch-ua-mobile': '?0',
          // 'sec-ch-ua-platform': '"Windows"',
          // 'Accept-Encoding': 'deflate, gzip'
        },
        data: {
          userPhone: this.number
        },
        success: (res) => {
          console.log(res);
          this.chongfu = res.data.success
        }
      })
      console.log(this.chongfu);

    },
    //注册按钮
    reg() {
      if (this.number == '') {
        this.numbers = '手机号不能为空'
        this.tishi = true
      }
      else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this.password))) {
        console.log(this.password);
        this.pwd = true
      } else if (this.checked.length == 0) {
        uni.showToast({
          icon: "error",
          title: '请阅读并同意协议',
        });
      } else if (this.yanz == '') {
        uni.showToast({
          icon: "error",
          title: '验证码不能为空',
        });
      } else {

        uni.request({
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/saveUserPhoneForPla.json', //仅为示例，并非真实接口地址。
          header: {
            // 'Accept': 'application/json, text/plain, */*',
            // 'Accept-Language': 'zh-CN,zh;q=0.9',
            // 'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'Cookie': 'sidebarStatus=0; JSESSIONID=7eH0B2K2Pe155aOtmktnVJQ5PLNMwDxLFkpbIPh5',
            // 'Origin': 'https://csweapp.saas.qianjiangcloud.cn',
            // 'Referer': 'https://csweapp.saas.qianjiangcloud.cn/paas/cs-cli-pc/',
            // 'Sec-Fetch-Dest': 'empty',
            // 'Sec-Fetch-Mode': 'cors',
            // 'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-token': 'D144C9033DA73932AD7CE25EEDE39F5D'
            // 'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            // 'sec-ch-ua-mobile': '?0',
            // 'sec-ch-ua-platform': '"Windows"',
            // 'Accept-Encoding': 'deflate, gzip'
          },
          data: {
            userName: this.number,
            userPwsswd: this.password,
            code: this.yanz,
            userPhone: this.number
          },
          success: (res) => {
            console.log(res.data);
            if (res.data.msg == '操作成功') {
              uni.showToast({
                title: '注册成功',
              });
              this.navTo('/pages/login/login')
            } else if (res.data.msg == '验证码输入错误') {
              uni.showToast({
                icon: "error",
                title: '验证码错误',
              });
            }
            else {
              uni.showToast({
                icon: "error",
                title: '注册失败',
              });
            }
          }
        });
      }
    },
    //跳转
    navTo(item) {
      uni.navigateTo({
        url: item
      });
    },
    codeChange(text) {
      this.tips = text;
    },
    //获取验证码
    sendSms() {
      if (this.number == '') {
        uni.showToast({
          icon: "error",
          title: '手机号不能为空',
        });
        this.tishi = true
        this.numbers = '手机号不能为空'
      } else if (!(/^1[3456789]\d{9}$/.test(this.number))) {
        this.tishi = true
        this.numbers = '手机号有误'


      } else if (this.chongfu) {
        uni.request({
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/sendPhone.json',
          method: "GET",
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-token': 'D144C9033DA73932AD7CE25EEDE39F5D',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
          },
          data: {
            userPhone: this.number
          },
          success: function (res) {
            console.log(res);
            this.msg = res.data.msg
            if (this.msg == '操作成功') {

              uni.showToast({
                title: '操作成功',
              });
            } else {
              uni.showToast({
                icon: "error",
                title: '发送失败',
              });
            }
          },
        });
        const timer = setInterval(() => {
          this.btntxt = this.seconds + '秒再试';
          this.seconds--;
          this.disabled = true;
          if (this.seconds === 0) {
            clearInterval(timer);
            this.btntxt = '发送验证码';
            this.seconds = 60;
            this.disabled = false
          }
        }, 1000);

      } else {
        uni.showToast({
          icon: "error",
          title: '手机号已被注册',
        });
      }
    },

  }
}
</script>

<style scoped lang="scss">
.reg {
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

  .regm {
    width: 80%;
    margin: auto;

    .text_1 {
      width: 122px;
      height: 30px;
      display: block;
      overflow-wrap: break-word;
      color: rgba(51, 51, 51, 1);
      font-size: 22px;
      font-family: Helvetica;
      white-space: nowrap;
      line-height: 30px;
      text-align: left;
    }

    .text_2 {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }

    .text_3 {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      color: rgba(224, 37, 27, 1);
      line-height: 18px;
    }

    .number {
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 4px;
      margin: 20px 0 20px 0;
      height: 42px;

      .nbr {
        padding: 10px 0 0 10px;
      }
    }
    .martop {
      margin-top: 0;
    }
    .marbot {
      margin-bottom: 0;
    }
    .tish {
      height: 21px;
    }
    .regg {
      margin-top: 50px;
      color: #fff;
      background: rgba(224, 37, 27, 1);
      border-radius: 50px;
    }
  }
}
</style>
