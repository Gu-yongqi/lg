// 企业认证结果
<template>
  <view class="page flex-col">
    <view class="group_1 flex-col">
      <view class="box_1 flex-col">
        <view class="group_2 flex-col">
          <view class="section_1 flex-col">
            <view class="block_1 flex-col justify-between">
              <view class="box_2 flex-row justify-between">
                <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png" @click="black" />
                <text class="text_1">企业认证</text>
              </view>
            </view>
          </view>
          <view v-if="code==-1">
            <view class="sectionTwo flex-col">
            </view>
            <text class="text_2">企业认证失败</text>
            <text class="text_3">未通过原因：没有营业执照</text>
            <view class="section_4 flex-row justify-between">
              <button class="text-wrapper_1 flex-col" @click="black">
                <text class="text_4">取消认证</text>
              </button>
              <button class="text-wrapper_2 flex-col" @click="successGo">
                <text class="text_5">重新认证</text>
              </button>
            </view>
          </view>
          <view v-else-if="code==0">
            <view class="sectionThr flex-col">
            </view>
            <text class="text_2">企业认证审核中</text>
            <text class="text_3">您已提交企认证，请耐心等待认证结果</text>
            <view class="section_4 flex-row justify-between">
              <view class="text-wrapper_1 flex-col">
                <text class="text_4" style="color:rgba(220, 223, 230, 1)">重新认证</text>
              </view>
              <button class="text-wrapper_2 flex-col" @click="successInfo">
                <text class="text_5">查看详情</text>
              </button>
            </view>
          </view>
          <view v-else-if="code==1">
            <view class="sectionOne flex-col">
            </view>
            <text class="text_2">企业认证成功</text>
            <text class="text_3">您已成功通过企业认证，如需变更可重新认证</text>
            <view class="section_4 flex-row justify-between">
              <button class="text-wrapper_1 flex-col" @click="successGo">
                <text class="text_4">重新认证</text>
              </button>
              <button class="text-wrapper_2 flex-col" @click="successInfo">
                <text class="text_5">查看详情</text>
              </button>
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
      code: null
    };
  },
  mounted() {
    try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
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
        this.code = res.data.dataObj.userinfoState;
      }
    })
  },
  methods: {
    black() {
      uni.switchTab({
        url: '/pages/wode/wode'
      })
    },
    successGo() {
      uni.navigateTo({
        url: '/subPages/wode/realNameAuthentication'
      })
    },
    successInfo() {
      uni.navigateTo({
        url: '/subPages/wode/info'
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

  .group_1 {
    height: 1624rpx;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;

    .box_1 {
      height: 1624rpx;
      background-color: rgba(255, 255, 255, 1);
      width: 750rpx;

      .group_2 {
        width: 750rpx;
        height: 1556rpx;

        .section_1 {
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

            .box_2 {
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

        .sectionOne {
          height: 312rpx;
          background: url(@/static/image/wode/renzhengchenggong.png) 100%
            no-repeat;
          width: 442rpx;
          margin: 32rpx 0 0 154rpx;
        }

        .text_2 {
          width: 192rpx;
          height: 44rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 32rpx;
          font-family: PingFangSC-Semibold;
          white-space: nowrap;
          line-height: 44rpx;
          text-align: justify;
          margin: 46rpx 0 0 278rpx;
        }

        .text_3 {
          width: 480rpx;
          height: 34rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 24rpx;
          white-space: nowrap;
          line-height: 34rpx;
          text-align: center;
          margin: 20rpx 0 0 134rpx;
        }

        .section_4 {
          width: 378rpx;
          height: 60rpx;
          margin: 48rpx 0 0 186rpx;

          .text-wrapper_1 {
            height: 60rpx;
            border-radius: 15px;
            border: 1px solid rgba(220, 223, 230, 1);
            background-color: rgba(255, 255, 255, 1);
            width: 176rpx;

            .text_4 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }

          .text-wrapper_2 {
            height: 60rpx;
            border-radius: 15px;
            background-color: rgba(224, 37, 27, 1);
            width: 176rpx;

            .text_5 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(255, 255, 255, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }
        }

        .sectionThr {
          height: 312rpx;
          background: url(@/static/image/wode/renzhengzhong.png) 100% no-repeat;
          width: 442rpx;
          margin: 32rpx 0 0 154rpx;
        }

        .text_2 {
          width: 192rpx;
          height: 44rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 32rpx;
          font-family: PingFangSC-Semibold;
          white-space: nowrap;
          line-height: 44rpx;
          text-align: justify;
          margin: 46rpx 0 0 278rpx;
        }

        .text_3 {
          width: 480rpx;
          height: 34rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 24rpx;
          white-space: nowrap;
          line-height: 34rpx;
          text-align: center;
          margin: 20rpx 0 0 134rpx;
        }

        .section_4 {
          width: 378rpx;
          height: 60rpx;
          margin: 48rpx 0 0 186rpx;

          .text-wrapper_1 {
            height: 60rpx;
            border-radius: 15px;
            border: 1px solid rgba(220, 223, 230, 1);
            background-color: rgba(255, 255, 255, 1);
            width: 176rpx;

            .text_4 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }

          .text-wrapper_2 {
            height: 60rpx;
            border-radius: 15px;
            background-color: rgba(224, 37, 27, 1);
            width: 176rpx;

            .text_5 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(255, 255, 255, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }
        }

        .sectionTwo {
          height: 312rpx;
          background: url(@/static/image/wode/renzhengshibai.png) 100% no-repeat;
          width: 442rpx;
          margin: 32rpx 0 0 154rpx;
        }

        .text_2 {
          width: 192rpx;
          height: 44rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(51, 51, 51, 1);
          font-size: 32rpx;
          font-family: PingFangSC-Semibold;
          white-space: nowrap;
          line-height: 44rpx;
          text-align: justify;
          margin: 46rpx 0 0 278rpx;
        }

        .text_3 {
          width: 480rpx;
          height: 34rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 24rpx;
          white-space: nowrap;
          line-height: 34rpx;
          text-align: center;
          margin: 20rpx 0 0 134rpx;
        }

        .section_4 {
          width: 378rpx;
          height: 60rpx;
          margin: 48rpx 0 0 186rpx;

          .text-wrapper_1 {
            height: 60rpx;
            border-radius: 15px;
            border: 1px solid rgba(220, 223, 230, 1);
            background-color: rgba(255, 255, 255, 1);
            width: 176rpx;

            .text_4 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(96, 98, 102, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }

          .text-wrapper_2 {
            height: 60rpx;
            border-radius: 15px;
            background-color: rgba(224, 37, 27, 1);
            width: 176rpx;

            .text_5 {
              width: 96rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(255, 255, 255, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: center;
              margin: 14rpx 0 0 40rpx;
            }
          }
        }
      }
    }
  }
}
</style>
