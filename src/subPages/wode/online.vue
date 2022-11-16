<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="group_1 flex-col">
        <view class="group_2 flex-col">
          <view class="box_2 flex-col justify-between">
            <view class="box_3 flex-row justify-between">
              <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png" @click="black" />
              <text class="text_1">线上充值</text>
            </view>
          </view>
        </view>
        <view class="group_3 flex-col">
          <view class="text-wrapper_1 flex-row justify-between">
            <text class="text_2">收款名称</text>
            <text class="text_3">{{dataList.userinfoCorp||'收款名称'}}</text>
          </view>
        </view>
        <view class="group_4 flex-col">
          <view class="text-wrapper_2 flex-row justify-between">
            <text class="text_4">现有金额</text>
            <text class="text_5">&nbsp;{{dataPrick.faccountPortion||0}}元</text>
          </view>
          <view class="text-wrapper_3 flex-row" style="position: relative;">
            <text class="text_6">充值金额</text>
            <!-- <text class="text_7">请输入金额</text> -->
            <u--input type="number" class="text_7" placeholder="请输入充值金额" v-model="module" @blur="blur">
            </u--input>
            <text style="color: #E0251B; font-size: 24rpx;position: absolute;top: 30rpx;left: 150rpx;">{{toast}}</text>
            <text class="text_8">（元）</text>
          </view>
          <view class="group_5 flex-row">
            <text class="text_9">支付方式</text>
            <view class="section_1 flex-col"></view>
            <text class="text_10">微信支付</text>
            <view class="section_2 flex-col" @click="cheak"></view>
            <text class="text_11" @click="cheak">支付宝支付</text>
          </view>
        </view>
        <view class="paragraph_1">
          使用遇到问题?<br> 1.输入充值金额后，为什么无法成功充值? <br>答:通过微信、支付宝线上扫码充值，会受到充值额度的限制，建议你分批进行充值，每次充值金额不超过10,000元<br>
          2.充值成功了，为什么账户里没有查到?<br> 答:若无查到记录可能是系统延时引起的，你可稍后查看。若超过24小时仍未显示，请与客服联系
        </view>
        <view class="text-wrapper_4 flex-col" @click="submit">
          <text class="text_12">立即充值</text>
        </view>
      </view>
      <view class="group_6 flex-col"></view>
      <view class="group_7 flex-col"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      dataObj: {},
      dataList: {},
      dataPrick: {},
      payList: {},
      module: '',
      toast: '',
    }
  },
  mounted() {
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
        this.dataList = res.data.dataObj;
      }
    })
    uni.request({
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
        'saas-proappcode': 'cs3',
        'saas-tenantcode': '00000000',
        'saas-token': ticketTokenid
      },
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/vd/vdfaccountouter/queryAccountOuterByUser.json',
      method: 'POST',
      data: {
        fundType: "01"
      },
      success: res => {
        console.log(res.data);
        this.dataPrick = res.data.dataObj;
      }
    })
  },
  methods: {
    black() {
      uni.navigateBack({
        url: '/pages/wode/wode'
      })
    },
    cheak() {
      uni.showToast({
        title: '暂不支持支付宝支付',
        icon: 'none',
        duration: 2000
      });
    },
    blur() {
      const isNaN = String(Number(this.module)) == 'NaN';
      if (!this.module) {
        this.toast = '充值金额不能为空';
      } else if (Number(this.module) <= 0) {
        this.toast = '充值金额必须大于零';
      } else if (this.module.includes('.') && this.module.split('.')[1]) {
        const num = this.module.split('.')[1].length <= 2;
        if (!num) {
          this.toast = '小数部分不能大于两位';
        } else {
          this.toast = '';
        }
      } else if (isNaN) {
        this.toast = '请输入数字';
      } else {
        this.toast = '';
      }
    },
    submit() {
      let {
        ticketTokenid
      } = this.dataObj;
      if (this.module == '') {
        this.toast = '充值金额不能为空';
      } else {
        this.toast = '';
        uni.request({
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-Agent': 'qj-wemini',
            'saas-token': ticketTokenid,
          },
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/cp/recharge/balanceRechargeOnline.json',
          method: 'POST',
          data: {
            fchannelCode: 'wechatmini',
            rechargeMoney: this.module
          },
          success: res => {
            debugger
            console.log(164, res.data);
            this.payList = res.data.dataObj;
            uni.request({
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
                'saas-proappcode': 'cs3',
                'saas-tenantcode': '00000000',
                'saas-Agent': 'qj-wemini',
                'saas-token': ticketTokenid
              },
              url: 'https://csweapp.saas.qianjiangcloud.cn/web/pte/pay/paymentCommit.json',
              method: 'POST',
              data: {
                ptradeSeqno: this.payList.ptradeSeqno,
                payCommitStr: JSON.stringify([{
                  "faccountIdType": "ACCOUNT",
                  "fchannelCode": "wechatmini",
                  "orderAmount": this.module,
                  "faccountId": this.payList.faccountId
                }]),
                contractBlance: 0
              },
              success: res => {
                debugger
                console.log('top', res);
                let { appId, nonceStr, paySign, signType, timeStamp } = res.data.dataObj.requestData || {};
                wx.requestPayment({
                  timeStamp,
                  nonceStr,
                  package: res.data.dataObj.requestData.package || {},
                  signType,
                  paySign,
                  success: res => {
                    console.log('支付成功',res);
                    uni.showToast({
                      title: '支付成功',
                      icon: 'none',
                      duration: 2000
                    });
                  },
                  fail: err => {
                    console.log('支付失败',err);
                    uni.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              }
            })
          }
        })
      }
    }
  },
};
</script>
<style lang="scss">
.u-border {
  border: 0 !important;
}

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

input {
  margin-left: 32rpx;
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
    position: relative;

    .group_1 {
      width: 750rpx;
      height: 1026rpx;

      .group_2 {
        height: 188rpx;
        background-color: rgba(255, 255, 255, 1);
        width: 750rpx;

        .box_2 {
          width: 674rpx;
          height: 126rpx;
          margin: 34rpx 0 0 38rpx;

          .image_1 {
            width: 674rpx;
            height: 24rpx;
          }

          .box_3 {
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

      .group_3 {
        height: 86rpx;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
        width: 686rpx;
        margin: 28rpx 0 0 32rpx;

        .text-wrapper_1 {
          width: 206rpx;
          height: 36rpx;
          margin: 26rpx 0 0 28rpx;

          .text_2 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_3 {
            width: 52rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }
        }
      }

      .group_4 {
        height: 262rpx;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
        width: 686rpx;
        margin: 20rpx 0 0 32rpx;

        .text-wrapper_2 {
          width: 270rpx;
          height: 36rpx;
          margin: 26rpx 0 0 28rpx;

          .text_4 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_5 {
            width: 116rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(224, 37, 27, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }
        }

        .text-wrapper_3 {
          width: 630rpx;
          height: 36rpx;
          margin: 50rpx 0 0 28rpx;

          .text_6 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_7 {
            width: 130rpx;
            height: 36rpx;
            // display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
            margin-left: 32rpx;
          }

          .text_8 {
            width: 78rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
            // margin-left: 268rpx;
          }
        }

        .group_5 {
          width: 518rpx;
          height: 36rpx;
          margin: 52rpx 0 38rpx 28rpx;

          .text_9 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .section_1 {
            width: 14px;
            height: 14px;
            border: 4px solid rgba(224, 37, 27, 1);
            background-color: #f7f7f7;
            border-radius: 50%;
            margin: 2px 0 0 21px;
          }

          .text_10 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(224, 37, 27, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
            margin-left: 16rpx;
          }

          .section_2 {
            width: 28rpx;
            height: 28rpx;
            border: 1px solid rgba(218, 218, 218, 1);
            background-color: rgba(247, 247, 247, 1);
            border-radius: 50%;
            margin: 4rpx 0 0 42rpx;
          }

          .text_11 {
            width: 130rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
            margin-left: 16rpx;
          }
        }
      }

      .paragraph_1 {
        width: 686rpx;
        height: 252rpx;
        display: inline-block;
        overflow-wrap: break-word;
        color: rgba(153, 153, 153, 1);
        font-size: 24rpx;
        line-height: 36rpx;
        text-align: left;
        margin: 20rpx 0 72rpx 32rpx;
      }

      .text-wrapper_4 {
        height: 88rpx;
        border-radius: 21.5px 21.5px 21.5px 21.5px;
        background-color: rgba(224, 37, 27, 1);
        width: 688rpx;
        // margin: 72rpx 0 0 32rpx;
        margin-left: 32rpx;

        .text_12 {
          width: 128rpx;
          height: 44rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(255, 255, 255, 1);
          font-size: 32rpx;
          white-space: nowrap;
          line-height: 44rpx;
          text-align: center;
          margin: 22rpx 0 0 280rpx;
        }
      }
    }

    .group_6 {
      position: absolute;
      left: 32rpx;
      top: 404rpx;
      width: 688rpx;
      height: 4rpx;
      border-bottom: 1rpx solid #d8d8d8;
      // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5f1fa4979384c06f636a303563a131436bc5576cbd8ac450c723b540a9704bd2) 100% no-repeat;
    }

    .group_7 {
      position: absolute;
      left: 32rpx;
      top: 492rpx;
      width: 688rpx;
      height: 4rpx;
      border-bottom: 1rpx solid #d8d8d8;
      // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng5f1fa4979384c06f636a303563a131436bc5576cbd8ac450c723b540a9704bd2) 100% no-repeat;
    }
  }
}
</style>
