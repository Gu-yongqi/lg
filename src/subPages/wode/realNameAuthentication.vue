// 实名认证
<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="box_2 flex-col justify-between">
        <view class="box_3 flex-col">
          <view class="block_1 flex-col justify-between">
            <view class="group_1 flex-row justify-between">
              <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png" @click="black" />
              <text class="text_1">实名认证</text>
            </view>
          </view>
        </view>
        <view class="list_1 flex-col">
          <view class="list-items_1 flex-col" v-if="type!=2">
            <view class="block_2 flex-row">
              <image class="label_1" referrerpolicy="no-referrer" src="@/static/image/wode/gerenrenzheng.png" />
              <view class="text-wrapper_1 flex-col justify-between">
                <text class="text_2">个人认证</text>
                <text class="text_3">需要填写身份信息</text>
              </view>
              <view class="text-wrapper_2 flex-col">
                <text class="text_4" @click="gerenrenzheng">去认证</text>
              </view>
            </view>
          </view>
          <view class="list-items_1 flex-col">
            <view class="block_2 flex-row">
              <image class="label_1" referrerpolicy="no-referrer" src="@/static/image/wode/qiyerenzheng.png" />
              <view class="text-wrapper_1 flex-col justify-between">
                <text class="text_2">企业认证</text>
                <text class="text_3">需要填写企业资料</text>
              </view>
              <view class="text-wrapper_2 flex-col">
                <text class="text_4" @click="qiyerenzheng">去认证</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      dataObj: {},
      type: null
    };
  },
  onLoad() {
    try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    }
    let {
      userInfoCode,
      ticketTokenid
    } = this.dataObj;
    uni.request({
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'saas-proappcode': 'cs3',
        'saas-tenantcode': '00000000',
        'saas-token': ticketTokenid
      },
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userInfoAuth/getUserInfoAuth.json',
      method: 'POST',
      data: {
        userInfoCode
      },
      success: res => {
        console.log(res.data);
        this.type = res.data.dataObj.userinfoType;
      }
    })
  },
  methods: {
    black() {
      uni.navigateBack({
        url: '/pages/wode/wode'
      })
    },
    gerenrenzheng() {
      uni.navigateTo({
        url: '/subPages/wode/personalCertification'
      })
    },
    qiyerenzheng() {
      uni.navigateTo({
        url: '/subPages/wode/enterpriseCertification'
      })
    }
  },
};
</script>
<style lang="scss">
body *,
page view {
  box-sizing: border-box;
  flex-shrink: 0;
}

body {
  font-family: PingFangSC-Regular, Roboto, Helvetica Neue, Helvetica, Tahoma,
    Arial, PingFang SC-Light, Microsoft YaHei;
  margin: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
  background-color: transparent;
}

button:active {
  opacity: 0.6;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.align-start {
  display: flex;
  align-items: flex-start;
}

.align-center {
  display: flex;
  align-items: center;
}

.align-end {
  display: flex;
  align-items: flex-end;
}

.page {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;

  .box_1 {
    height: 1624rpx;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;

    .box_2 {
      width: 750rpx;
      height: 538rpx;

      .box_3 {
        height: 188rpx;
        background-color: rgba(255, 255, 255, 1);
        width: 750rpx;

        .block_1 {
          width: 674rpx;
          height: 126rpx;
          margin: 34rpx 0 0 38rpx;

          .image_1 {
            width: 674rpx;
            height: 24rpx;
          }

          .group_1 {
            width: 408rpx;
            height: 50rpx;
            margin-top: 52rpx;

            .thumbnail_1 {
              width: 18rpx;
              height: 32rpx;
              margin-top: 10rpx;
            }

            .text_1 {
              width: 144rpx;
              height: 50rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 36rpx;
              white-space: nowrap;
              line-height: 50rpx;
              text-align: center;
            }
          }
        }
      }

      .list_1 {
        width: 686rpx;
        height: 316rpx;
        justify-content: space-between;
        margin: 34rpx 0 0 32rpx;

        .list-items_1 {
          height: 144rpx;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
          margin-bottom: 28rpx;
          width: 686rpx;

          .block_2 {
            width: 586rpx;
            height: 80rpx;
            margin: 32rpx 0 0 46rpx;

            .label_1 {
              width: 60rpx;
              height: 54rpx;
              margin-top: 14rpx;
            }

            .text-wrapper_1 {
              width: 258rpx;
              height: 80rpx;
              margin-left: 44rpx;

              .text_2 {
                width: 116rpx;
                height: 40rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 28rpx;
                font-family: PingFangSC-Medium;
                white-space: nowrap;
                line-height: 40rpx;
                text-align: left;
              }

              .text_3 {
                width: 258rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(153, 153, 153, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: left;
                margin-top: 4rpx;
              }
            }

            .text-wrapper_2 {
              height: 48rpx;
              border-radius: 12px;
              border: 1px solid rgba(224, 37, 27, 1);
              width: 116rpx;
              margin: 16rpx 0 0 108rpx;

              .text_4 {
                width: 98rpx;
                height: 34rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(224, 37, 27, 1);
                font-size: 24rpx;
                white-space: nowrap;
                line-height: 34rpx;
                text-align: center;
                margin: 6rpx 0 0 8rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
