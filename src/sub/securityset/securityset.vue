<template>
  <view class="logout-container">
    <view class="editPwdBox" @click="editPwd">
      <view class="textBox">
        <view class="topText">修改手机号码</view>
        <view class="bottomText">修改手机号码</view>
      </view>
      <view class="iconBox">
        <uni-icons type="forward" size="20" color="#cfcfcf"></uni-icons>
      </view>
    </view>
    <view class="logoutBox">
      <view class="logout-btn" @click="logout">退出登录</view>
    </view>
  </view>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions('user', ['logout']),

    // 修改密码
    editPwd(){
      // uni.navigateTo({
      //   url: '/subPages/securityset/editpwd'
      // })
      uni.navigateTo({
        url: '/subPages/securityset/bind'
      })
    },

    // 退出登录
    logout(){
      uni.showModal({
        title: '提示',
        content: '您确定要退出登录吗？',
        confirmColor: '#e0251b',
        success: res => {
          if (res.confirm) {
            // 测试-不调用退出接口
              this.logout()
              uni.navigateTo({
                url: '/pages/login/login' // 跳转登录页面
              })

            // const logoutRes =  uni.$request({
            //   url: loginOut
            // })
            // if(logoutRes.success){
            //   this.logout()
            //   // uni.setStorageSync("dataObj", {}); // 清除token
            //   uni.navigateTo({
            //     url: '/pages/login/login' // 跳转登录页面
            //   })
            // }else{
            //   uni.showToast({
            //     title: '操作失败',
            //     icon: 'none',
            //     duration: 1000
            //   })
            // }

          } else if (res.cancel) {
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.logout-container{
  box-sizing: border-box;
  height: 100vh;
  background-color: #f8f8f8;
  padding-top: 10px;
  .editPwdBox{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16rpx;
    .textBox{
      .topText{
        font-size: 14px;
      }
      .bottomText{
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .iconBox{

    }
  }
  .logoutBox{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    width: 100%;

    .logout-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: #fff;
      color: #e22519;
      font-size: 14px;
    }
  }
}
</style>
