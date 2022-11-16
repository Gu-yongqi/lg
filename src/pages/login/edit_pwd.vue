<template>
  <view class="pwd">

    <view class="pwd-title">
      <view class="fanhui" @click="fanhui">
        <u-icon name="arrow-left" color="#333333" size="24"></u-icon>
      </view>
      <view class="logo">
        <image src="../../static/loginLogo.png" mode="widthFix"></image>
        <text class="titles">云货架</text>
      </view>
    </view>
    <view class="edit">
      <view class="number">
        <view class="nbr">
          <u-input placeholder="请输入手机号码" @change="blur" border="none" type="number" v-model="number">
            <u-text text="+86" slot="prefix" margin="0 3px 0 0" type="tips"></u-text>
            <u-text :text="btntxt" slot="suffix" type="info" margin="0 10px 0 0" :show="disabled"></u-text>
            <u-text :text="btntxt" slot="suffix" type="error" margin="0 10px 0 0" :show="!disabled" @click="sendSms"></u-text>
          </u-input>
        </view>
      </view>
      <view class="number">
        <view class="nbr">
          <u-input placeholder="请输入验证码" border="none" adjustPosition clearable type="number" v-model="code"></u-input>
        </view>
      </view>
      <view class="number paswd">
        <view class="nbr">
          <u--input placeholder="设置8-18位字母、数字密码" @change="pwds" v-model="password" border="none" password adjustPosition>
          </u--input>
        </view>
      </view>
      <view class="pwds">
        <text v-show="pwd" style="font-size: 10px; color: rgba(224, 37, 27, 1);">密码必须是8-16位，且至少大小写字母和数字组合</text>
      </view>
      <view class="number paswd">
        <view class="nbr">
          <u--input placeholder="请再次输入新密码" @change="pwdds" v-model="passwords" border="none" password adjustPosition>
          </u--input>
        </view>
      </view>
      <view class="pwds">
        <text v-show="pwdd" style="font-size: 10px; color: rgba(224, 37, 27, 1);">两次密码不一致</text>
      </view>
      <button @click="tijiao" class="logbtn">提交</button>
      <text class="reg" @click="navTo('/pages/login/reg')">注册新用户</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pwd: false,
      pwdd: false,
      number: '',
      password: '',
      passwords: '',
      code: '',
      btntxt: '获取验证码',
      seconds: 60,
      disabled: false,
      chongfu: ''
    }
  },
  methods: {
    pwdds() {
      if (this.password != this.passwords) {
        this.pwdd = true
      } else {
        this.pwdd = false
      }
    },
    pwds() {
      this.pwd = !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this.password))
    },
    blur() {
      uni.request({
        url: 'https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/checkUserPhone.json',
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
        success: (res) => {
          console.log(res);
          this.chongfu = res.data.success
        }
      })
    },
    //跳转
    navTo(item) {
      uni.navigateTo({
        url: item
      });
    },
    fanhui() {
      uni.navigateBack({
        delta: 1, //返回层数，2则上上页
      })
    },
    sendSms() {
      if (this.number == '') {
        uni.showToast({
          icon: "error",
          title: '手机号不能为空',
        });
      } else if (!(/^1[3456789]\d{9}$/.test(this.number))) {
        uni.showToast({
          icon: "error",
          title: '手机号有误',
        });
      } else if (this.chongfu) {
        uni.showToast({
          icon: "error",
          title: '手机号未注册',
        });
      } else {
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
          success: (res) => {
            console.log(res);
            this.msg = res.data.msg
            if (this.msg == '操作成功') {

              uni.showToast({
                title: '发送成功',
              });
            } else {
              uni.showToast({
                icon: "error",
                title: '发送失败',
              });
            }
          }
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
      }
    }

    ,
    tijiao() {
      if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(this.password))) {
        this.pwd = true
      } else if (this.password != this.passwords) {
        this.pwdd = true
      } else if (this.code == '') {
        uni.showToast({
          icon: "error",
          title: '验证码为空',
        });
      } else {
        uni.request({
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/ml/muser/updateUmuserPw.json',
          method: "POST",
          header: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Cookie': 'sidebarStatus=0; JSESSIONID=mSt9Wt0AmvNVWfHrqEkaVHe2KhL2ujTqz_AVK-KQ',
            'Origin': 'https://csweapp.saas.qianjiangcloud.cn',
            'Referer': 'https://csweapp.saas.qianjiangcloud.cn/paas/cs-cli-pc/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Accept-Encoding': 'deflate, gzip'
          },
          data: {
            userPhone: this.number,
            code: this.code,
            userPwsswd: this.password
          },
          success: (res) => {
            console.log(res);
            if (res.data.success) {
              uni.showToast({
                title: '修改成功',
              });
              const timer = setInterval(() => {
                this.navTo('/pages/login/login')
              }, 2000);
            } else if (res.data.errorCode == -1) {
              uni.showToast({
                icon: "error",
                title: '验证码错误',
              });
            }
          },
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pwds {
  height: 20px;
}

.pwd {
  height: 100vh;
  background-image: url('../../common/img/bg.png');
  background-size: cover;
  width: 100vw;
  .pwd-title {
    text-align: center;

    .fanhui {
      position: fixed;
      top: 5%;
      left: 4%;
    }

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
        margin-top: 110rpx;
        width: 200rpx;
      }
    }
  }

  .edit {
    width: 80%;
    margin: auto;

    .number {
      border: 1px solid rgba(153, 153, 153, 1);
      border-radius: 4px;
      margin: 20px 0;
      height: 42px;

      .nbr {
        padding: 10px 0 0 10px;
      }
    }

    .paswd {
      margin-bottom: 0;
      margin-top: 0;
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
</style>
