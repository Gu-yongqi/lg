<template>
  <view class="page flex-col">
    <view class="group_1 flex-col">
      <view class="group_2 flex-col">
        <view class="section_1 flex-col">
          <view class="box_1 flex-col"></view>
          <view class="box_2 flex-col">
            <view class="box_3 flex-col">
              <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui2.png" @click="black" />
              <view class="group_3 flex-row justify-between" v-if="list.dataState==1">
                <image class="thumbnail_2" referrerpolicy="no-referrer" src="@/static/image/wode/dqr.png" />
                <text class="text_1">待确认</text>
              </view>
              <view class="group_3 flex-row justify-between" v-if="list.dataState==2">
                <image class="thumbnail_2" referrerpolicy="no-referrer" src="@/static/image/wode/dfh.png" />
                <text class="text_1">待发货</text>
              </view>
              <view class="group_3 flex-row justify-between" v-if="list.dataState==3">
                <image class="thumbnail_2" referrerpolicy="no-referrer" src="@/static/image/wode/dsh.png" />
                <text class="text_1">待收货</text>
              </view>
              <view class="group_3 flex-row justify-between" v-if="list.dataState==5">
                <image class="thumbnail_2" referrerpolicy="no-referrer" src="@/static/image/wode/ywc.png" />
                <text class="text_1">已完成</text>
              </view>
              <view class="group_3 flex-row justify-between" v-if="list.dataState==-1">
                <image class="thumbnail_2" referrerpolicy="no-referrer" src="@/static/image/wode/yqx.png" />
                <text class="text_1">已取消</text>
              </view>
            </view>
          </view>
          <view class="box_4 flex-col">
            <view class="box_5 flex-col justify-between">
              <view class="block_1 flex-row">
                <image class="thumbnail_3" referrerpolicy="no-referrer" src="@/static/image/wode/dingwei.png" />
                <text class="text_2">{{list.goodsReceiptMem}}</text>
                <text class="text_3">{{list.goodsReceiptPhone}}</text>
              </view>
              <text class="text_4">地址：{{list.goodsReceiptArrdess}}</text>
            </view>
          </view>
        </view>
        <view class="section_2 flex-col">
          <view class="text-wrapper_1 flex-row justify-between">
            <text class="text_5">订单编号：</text>
            <text class="text_6">{{list.contractBillcode}}</text>
          </view>
          <view class="text-wrapper_2 flex-row justify-between">
            <text class="text_7">下单时间：</text>
            <text class="text_8">{{new Date(list.gmtCreate).getFullYear()+'-'+((new Date(list.gmtCreate).getMonth()+1)<10?('0'+(new Date(list.gmtCreate).getMonth()+1)):(new Date(list.gmtCreate).getMonth()+1))+'-'+((new Date(list.gmtCreate).getDate())<10?('0'+(new Date(list.gmtCreate).getDate())):(new Date(list.gmtCreate).getDate()))+' '+((new Date(list.gmtCreate).getHours())<10?('0'+(new Date(list.gmtCreate).getHours())):(new Date(list.gmtCreate).getHours()))+':'+((new Date(list.gmtCreate).getMinutes())<10?('0'+(new Date(list.gmtCreate).getMinutes())):(new Date(list.gmtCreate).getMinutes()))+':'+((new Date(list.gmtCreate).getSeconds())<10?('0'+(new Date(list.gmtCreate).getSeconds())):(new Date(list.gmtCreate).getSeconds()))}}</text>
          </view>
        </view>
        <view class="section_3 flex-col" v-if="list.dataState!=5&&list.dataState!=-1">
          <button class="text-wrapper_3 flex-col" @click="error">
            <text class="text_9">取消订单</text>
          </button>
        </view>
      </view>
      <view class="group_4 flex-col">
        <view class="group_5 flex-col">
          <view class="box_6 flex-row">
            <image class="thumbnail_4" referrerpolicy="no-referrer" src="@/static/image/wode/shangcheng.png" />
            <text class="text_10">{{list.memberCname}}</text>
            <image class="thumbnail_5" referrerpolicy="no-referrer" src="" />
          </view>
          <view class="box_7 flex-row justify-between">
            <view class="box_8 flex-col">
              <view class="box_9 flex-col">
                <view class="box_10 flex-col">
                  <view class="image-wrapper_1 flex-col">
                    <image class="image_2" referrerpolicy="no-referrer" :src="list.goodsList[0].dataPic" />
                  </view>
                </view>
              </view>
            </view>
            <view class="box_11 flex-col">
              <text class="text_11">{{list.goodsList[0].goodsName}}</text>
              <view class="text-wrapper_4 flex-row justify-between">
                <text class="text_12">{{list.goodsList[0].skuName}}</text>
                <text class="text_13">x{{list.goodsList[0].goodsNum}}</text>
              </view>
              <!-- <text class="text_14">¥{{list.goodsList[0].contractGoodsPrice}}</text> -->
            </view>
          </view>
          <view class="text-wrapper_5 flex-row justify-between">
            <text class="text_15">商品总价</text>
            <text class="text_16">¥{{list.goodsList[0].contractGoodsPrice}}</text>
          </view>
          <view class="text-wrapper_6 flex-row justify-between">
            <text class="text_17">运费</text>
            <text class="text_18">¥0.00</text>
          </view>
          <view class="box_12 flex-row justify-between">
            <text class="text_19">实付款</text>
            <view class="text-wrapper_7">
              <text class="text_20">¥{{list.goodsList[0].contractGoodsPrice}}</text>
              <!-- <text class="text_21">69</text>
              <text class="text_22">.00</text> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  onLoad(option) {
    try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
    this.list = JSON.parse(decodeURIComponent(option.list));
    // JSON.parse(option.list);
    // console.log(JSON.parse(option.list));
    // console.log(JSON.parse(decodeURIComponent(option.list))
  },
  data() {
    return {
      dataObj: {},
      list: {}
    };
  },
  methods: {
    black() {
      uni.navigateBack({
        url: '/subPages/wode/all'
      })
    },
    error() {
      let {
        ticketTokenid
      } = this.dataObj;
      let {
        contractId,
        contractNbillcode
      } = this.list
      uni.showModal({
        title: '提示',
        content: '确定要取消订单吗？',
        success: function (res) {
          if (res.confirm) {
            uni.request({
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
                'saas-proappcode': 'cs3',
                'saas-tenantcode': '00000000',
                'saas-token': ticketTokenid
              },
              url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/cancelContractC.json',
              method: 'POST',
              data: {
                contractId,
                contractNbillcode
              },
              success: res => {
                console.log(res.data);
                if (res.data.errorCode == 'error') {
                  uni.showToast({
                    title: '取消订单失败',
                    icon: 'none',
                    duration: 2000
                  });
                } else {
                  uni.showToast({
                    title: '取消订单成功',
                    icon: 'none',
                    duration: 2000
                  });
                  setTimeout(() => {
                    uni.navigateBack();
                  }, 2000)
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.u-page {
  padding: 0;
}

.u-cell-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}

.u-cell-group__title__text {
  font-weight: bold;
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
  height: 100vh;
  overflow: hidden;
  background-color: #f8f8f8;

  .group_1 {
    height: 1374rpx;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;
    position: relative;

    .group_2 {
      width: 750rpx;
      height: 1374rpx;

      .section_1 {
        height: 478rpx;
        background-color: rgba(248, 248, 248, 1);
        width: 750rpx;
        position: relative;

        .box_1 {
          width: 750rpx;
          height: 344rpx;
          background-color: rgba(72, 127, 252, 1);
        }

        .box_2 {
          height: 394rpx;
          background: url(@/static/image/wode/Bg.png) no-repeat;
          background-size: cover;
          width: 750rpx;
          position: absolute;

          .box_3 {
            width: 692rpx;
            height: 176rpx;
            margin: 16rpx 0 0 20rpx;

            .image_1 {
              width: 674rpx;
              height: 24rpx;
              margin-left: 18rpx;
            }

            .thumbnail_1 {
              width: 20rpx;
              height: 32rpx;
              margin-top: 38rpx;
            }

            .group_3 {
              width: 174rpx;
              height: 56rpx;
              margin: 26rpx 0 0 268rpx;

              .thumbnail_2 {
                width: 38rpx;
                height: 38rpx;
                margin-top: 10rpx;
              }

              .text_1 {
                width: 120rpx;
                height: 56rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(255, 255, 255, 1);
                font-size: 40rpx;
                white-space: nowrap;
                line-height: 56rpx;
                text-align: left;
              }
            }
          }
        }

        .box_4 {
          height: 156rpx;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 1);
          width: 750rpx;
          position: absolute;
          left: 0;
          top: 264rpx;

          .box_5 {
            width: 448rpx;
            height: 82rpx;
            margin: 32rpx 0 0 30rpx;

            .block_1 {
              width: 312rpx;
              height: 36rpx;
              margin-left: 2rpx;

              .thumbnail_3 {
                width: 22rpx;
                height: 26rpx;
                margin-top: 4rpx;
              }

              .text_2 {
                // width: 78rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: left;
                margin-left: 14rpx;
              }

              .text_3 {
                width: 170rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: left;
                margin-left: 28rpx;
              }
            }

            .text_4 {
              width: 448rpx;
              height: 34rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(153, 153, 153, 1);
              font-size: 24rpx;
              white-space: nowrap;
              line-height: 34rpx;
              text-align: left;
              margin-top: 12rpx;
            }
          }
        }
      }

      .section_2 {
        height: 174rpx;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 1);
        margin-top: 494rpx;
        width: 750rpx;
        justify-content: flex-center;

        .text-wrapper_1 {
          width: 688rpx;
          height: 36rpx;
          margin: 32rpx 0 0 30rpx;

          .text_5 {
            width: 130rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_6 {
            // width: 250rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: right;
          }
        }

        .text-wrapper_2 {
          width: 688rpx;
          height: 36rpx;
          margin: 38rpx 0 32rpx 30rpx;

          .text_7 {
            width: 130rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_8 {
            width: 262rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: right;
          }
        }
      }

      .section_3 {
        height: 100rpx;
        box-shadow: 0px -2px 7px 0px rgba(241, 241, 241, 0.5);
        // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnge52ca4d58e9ebb122c556cd2bb009c23efdaaac781d97dc1b5f6aad8a6aa88a6)
        //   0rpx -18rpx no-repeat;
        // background-size: 750rpx 118rpx;
        background-color: #fff;
        margin-top: 128rpx;
        width: 750rpx;
        position: fixed;
        bottom: 0;

        .text-wrapper_3 {
          height: 60rpx;
          border-radius: 15px;
          border: 0.5px solid rgba(153, 153, 153, 1);
          width: 186rpx;
          margin: 20rpx 0 0 536rpx;

          .text_9 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
            margin: 12rpx 0 0 42rpx;
          }
        }
      }
    }

    .group_4 {
      height: 508rpx;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 1);
      width: 750rpx;
      position: absolute;
      left: 0;
      top: 444rpx;

      .group_5 {
        width: 690rpx;
        height: 438rpx;
        margin: 36rpx 0 0 30rpx;

        .box_6 {
          width: 348rpx;
          height: 40rpx;

          .thumbnail_4 {
            width: 28rpx;
            height: 28rpx;
            margin-top: 6rpx;
          }

          .text_10 {
            // width: 280rpx;
            height: 40rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 28rpx;
            font-family: PingFangSC-Medium;
            white-space: nowrap;
            line-height: 40rpx;
            text-align: left;
            margin-left: 12rpx;
          }

          .thumbnail_5 {
            width: 28rpx;
            height: 36rpx;
            background: url(@/static/image/wode/you.png) 0rpx 0rpx no-repeat;
            background-size: 12rpx 18rpx;
            margin: 12rpx 0 0 16rpx;
          }
        }

        .box_7 {
          width: 690rpx;
          height: 174rpx;
          margin-top: 28rpx;

          .box_8 {
            position: relative;
            width: 174rpx;
            height: 174rpx;
            border-radius: 4px;
            overflow: hidden;

            // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng0bdae5d0eddbc85c5c9d7e7f6d67cd544ace889a659d575f95e9bf758d67431f)
            //   100% no-repeat;
            .box_9 {
              height: 174rpx;
              // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc587ac202a9692986a30140c8b331235c96f8c8ce1337f05ff0fad246244b597)
              //   100% no-repeat;
              width: 174rpx;
              position: absolute;
              left: 0;
              top: 0;

              .box_10 {
                height: 174rpx;
                // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngeba4a0fa38e03ac436dafdc12a34ec22ac04ddf5f6084e09fbed5776ecd7723c)
                //   100% no-repeat;
                width: 174rpx;

                .image-wrapper_1 {
                  height: 174rpx;
                  // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngdb7ec4f268d6f73b9acf99c93d692dfedfddaae731f03ec53fae87573fe9738f)
                  //   100% no-repeat;
                  width: 174rpx;

                  .image_2 {
                    width: 174rpx;
                    height: 174rpx;
                  }
                }
              }
            }
          }

          .box_11 {
            width: 502rpx;
            height: 174rpx;

            .text_11 {
              width: 490rpx;
              height: 80rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              line-height: 40rpx;
              text-align: left;
            }

            .text-wrapper_4 {
              width: 500rpx;
              height: 36rpx;

              .text_12 {
                margin-top: 60rpx;
                width: 26rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(153, 153, 153, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: left;
              }

              .text_13 {
                margin-top: 60rpx;
                width: 24rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(153, 153, 153, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: left;
              }
            }

            .text_14 {
              width: 92rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: right;
              margin: 18rpx 0 0 410rpx;
            }
          }
        }

        .text-wrapper_5 {
          width: 688rpx;
          height: 36rpx;
          margin-top: 40rpx;

          .text_15 {
            width: 104rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_16 {
            width: 86rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: right;
          }
        }

        .text-wrapper_6 {
          width: 688rpx;
          height: 36rpx;
          margin-top: 12rpx;

          .text_17 {
            width: 52rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(153, 153, 153, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: left;
          }

          .text_18 {
            width: 70rpx;
            height: 36rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 26rpx;
            white-space: nowrap;
            line-height: 36rpx;
            text-align: right;
          }
        }

        .box_12 {
          width: 688rpx;
          height: 44rpx;
          margin-top: 28rpx;

          .text_19 {
            width: 90rpx;
            height: 42rpx;
            display: inline-block;
            overflow-wrap: break-word;
            color: rgba(51, 51, 51, 1);
            font-size: 30rpx;
            white-space: nowrap;
            line-height: 42rpx;
            text-align: left;
            margin-top: 2rpx;
          }

          .text-wrapper_7 {
            width: 90rpx;
            height: 44rpx;
            overflow-wrap: break-word;
            text-align: right;
            white-space: nowrap;
            font-size: 0;

            .text_20 {
              font-size: 32rpx;
              font-family: Helvetica;
              color: #e0251b;
              line-height: 28rpx;
            }

            .text_21 {
              font-size: 32rpx;
              font-family: Helvetica;
              // color: rgba(255, 255, 255, 1);
              line-height: 28rpx;
            }

            .text_22 {
              font-size: 24rpx;
              font-family: Helvetica;
              // color: rgba(255, 255, 255, 1);
              line-height: 28rpx;
            }
          }
        }
      }
    }
  }
}
</style>
