<template>
  <view class="page flex-col">
    <view class="section_1 flex-col">
      <view class="box_1 flex-col justify-between">
        <view class="group_1 flex-col">
          <view class="block_1 flex-col">
            <view class="box_2 flex-row">
              <image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png" @click="black" />
              <u-search :actionStyle="{width: '120rpx',height: '56rpx',lineHeight: '56rpx',color:'#fff',background: '#E0251B',borderRadius: '16px'}" margin="0 0 0 40rpx" placeholder="请输入关键词" v-model="keyword" @custom="init()"></u-search>
            </view>
            <u-tabs :current="index" lineColor="#ffffff" :activeStyle="{ color: '#E0251B',fontWeight:'700' }" :list="list1" @change="tabs">
            </u-tabs>
          </view>
        </view>
        <!--  -->
        <view class="list_1 flex-col" v-if="list.length">
          <view class="list-items_1 flex-col" v-for="(item, index) in list" :key="index">
            <view v-for="(item2,index2) in item.goodsList" :key="index2">
              <view class="text-wrapper_9 flex-row justify-between">
                <text class="text_20">{{item2.memberCname}}</text>
                <text class="text_21" v-if="item.dataState==13">13</text>
                <text class="text_21" v-if="item.dataState==1">待确认</text>
                <text class="text_21" v-if="item.dataState==2">待发货</text>
                <text class="text_21" v-if="item.dataState==3">待收货</text>
                <text class="text_21" v-if="item.dataState==5">已完成</text>
                <text class="text_21" v-if="item.dataState==-1">已取消</text>
              </view>
              <view class="block_2 flex-row justify-between">
                <view class="block_3 flex-col">
                  <view class="box_8 flex-col">
                    <view class="block_4 flex-col">
                      <view class="group_11 flex-col">
                        <view class="image-wrapper_3 flex-col">
                          <image class="image_4" referrerpolicy="no-referrer" :src="item2.dataPic" />
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="block_5 flex-col">
                  <text class="text_22">{{item2.goodsName}}</text>
                  <view class="text-wrapper_10 flex-row justify-between">
                    <text class="text_23">{{item2.skuName}}</text>
                    <text class="text_24">X{{item2.goodsNum}}</text>
                  </view>
                  <text class="text_25">￥{{item2.contractGoodsMoney}}</text>
                </view>
              </view>
              <view class="block_6 flex-row">
                <button class="text-wrapper_11 flex-col" @click="carInfo(index)">
                  <text class="text_26">查看详情</text>
                </button>
              </view>
            </view>
          </view>
          <view v-if="flag" style="text-align: center;font-size: 24rpx; color: #999999;padding-bottom: 20rpx;">
            拼命加载中...
          </view>
          <view v-else style="text-align: center;font-size: 24rpx; color: #999999;padding-bottom: 20rpx;">
            没有更多数据了
          </view>
        </view>
        <!--  -->
        <view style="padding-top: 600rpx;text-align: center;" v-else-if="list.length==0&&show==false">
          <image style="width: 716rpx;height: 216rpx;" src="@/static/image/wode/chongzhijilu.png" mode="">
          </image>
          <view style="margin-top: 50rpx;font-size: 24rpx; color: #999999;">暂无订单</view>
        </view>
        <view style="position: fixed;top:400rpx;left:320rpx;">
          <u-loading-icon :show="show" color="#E0251B" text="加载中..." vertical textColor="#E0251B"></u-loading-icon>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  onLoad(option) {
    this.index = Number(option.index);
  },
  data() {
    return {
      dataObj: {},
      keyword: '',
      index: 0,
      dataState: 0,
      list: [],
      limit: 10,
      count: 0,
      flag: true,
      show: true,
      list1: [{
        name: '全部',
      }, {
        name: '待确认',
      }, {
        name: '待发货'
      }, {
        name: '待收货'
      }, {
        name: '已完成'
      }, {
        name: '已取消'
      }],
    }
  },
  onShow() {
    try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    }
    this.init();
  },
  //触底函数
  onReachBottom() {
    if (this.count > this.limit) {
      this.limit += 10;
      this.init();
    } else {
      this.flag = false;
      return false;
    }
  },
  //上拉函数
  onPullDownRefresh() {
    this.limit = 10;
    this.flag = true;
    uni.showToast({
      title: '刷新中...'
    });
    this.init();
    setTimeout(() => {
      uni.startPullDownRefresh();
    }, 1000)
  },
  methods: {
    black() {
      uni.navigateBack({
        url: '/pages/wode/wode'
      })
    },
    tabs(e) {
      this.index = e.index;
      this.init();
    },
    init() {
      let {
        ticketTokenid
      } = this.dataObj;
      if (this.index == 4) {
        this.dataState = 5;
      } else if (this.index == 5) {
        this.dataState = -1;
      } else {
        this.dataState = this.index;
      }
      if (this.dataState == 0) {
        uni.request({
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-token': ticketTokenid
          },
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
          method: 'POST',
          data: {
            rows: this.limit,
            page: 1,
            goodsName: this.keyword
          },
          success: res => {
            console.log(res.data);
            this.list = res.data.list;
            this.count = res.data.total;
            this.show = false;
            if (this.limit >= this.count) {
              this.flag = false;
            } else {
              this.flag = true;
            }
          }
        })
      } else {
        uni.request({
          header: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'saas-token': ticketTokenid
          },
          url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
          method: 'POST',
          data: {
            rows: this.limit,
            page: 1,
            dataState: this.dataState,
            goodsName: this.keyword
          },
          success: res => {
            console.log(res.data);
            this.list = res.data.list;
            this.count = res.data.total;
            this.show = false;
            if (this.limit >= this.count) {
              this.flag = false;
            } else {
              this.flag = true;
            }
          }
        })
      }
    },
    carInfo(i) {
      uni.navigateTo({
        url: "/subPages/wode/order?list=" + encodeURIComponent(JSON.stringify(this.list[i]))
      })
    },
  },
};
</script>
<style lang="scss">
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
  // height: 2128rpx;
  height: 100vh;
  // overflow-y: scroll;

  .section_1 {
    // height: 2128rpx;
    height: 100vh;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;

    .box_1 {
      width: 750rpx;
      // height: 2086rpx;

      .group_1 {
        height: 300rpx;
        background-color: rgba(255, 255, 255, 1);
        width: 750rpx;
        position: fixed;
        z-index: 999;

        .block_1 {
          width: 704rpx;
          height: 192rpx;
          margin: 60rpx 0 0 20rpx;

          .image_1 {
            width: 674rpx;
            height: 24rpx;
            margin-left: 18rpx;
          }

          .box_2 {
            width: 704rpx;
            height: 64rpx;
            margin: 60rpx 0 20rpx;

            .thumbnail_1 {
              width: 20rpx;
              height: 32rpx;
              margin-top: 16rpx;
            }

            .group_2 {
              height: 64rpx;
              border-radius: 16px;
              background-color: rgba(248, 248, 248, 1);
              margin-left: 54rpx;
              width: 552rpx;

              .group_3 {
                width: 184rpx;
                height: 34rpx;
                margin: 16rpx 0 0 24rpx;

                .thumbnail_2 {
                  width: 26rpx;
                  height: 26rpx;
                  margin-top: 4rpx;
                }

                .text_1 {
                  width: 144rpx;
                  height: 34rpx;
                  display: inline-block;
                  overflow-wrap: break-word;
                  color: rgba(153, 153, 153, 1);
                  font-size: 24rpx;
                  white-space: nowrap;
                  line-height: 34rpx;
                  text-align: left;
                }
              }
            }

            .thumbnail_3 {
              width: 38rpx;
              height: 8rpx;
              margin: 28rpx 0 0 40rpx;
            }
          }

          .text-wrapper_1 {
            width: 692rpx;
            height: 42rpx;
            margin: 40rpx 0 0 8rpx;

            .text_2 {
              width: 60rpx;
              height: 42rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(224, 37, 27, 1);
              font-size: 30rpx;
              font-family: Helvetica;
              white-space: nowrap;
              line-height: 42rpx;
              text-align: center;
            }

            .text_3 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin-left: 74rpx;
            }

            .text_4 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin-left: 74rpx;
            }

            .text_5 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin-left: 74rpx;
            }

            .text_6 {
              width: 84rpx;
              height: 40rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(51, 51, 51, 1);
              font-size: 28rpx;
              white-space: nowrap;
              line-height: 40rpx;
              text-align: center;
              margin-left: 74rpx;
            }
          }
        }
      }

      .list_1 {
        width: 710rpx;
        height: 1206rpx;
        justify-content: space-between;
        margin: 330rpx 0 20rpx 20rpx;

        .list-items_1 {
          // height: 386rpx;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
          margin-bottom: 24rpx;
          width: 710rpx;

          .text-wrapper_9 {
            width: 666rpx;
            // height: 40rpx;
            margin: 24rpx 0 0 20rpx;

            .text_20 {
              width: 112rpx;
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

            .text_21 {
              width: 78rpx;
              height: 36rpx;
              display: inline-block;
              overflow-wrap: break-word;
              color: rgba(224, 37, 27, 1);
              font-size: 26rpx;
              white-space: nowrap;
              line-height: 36rpx;
              text-align: right;
              margin-top: 2rpx;
            }
          }

          .block_2 {
            width: 678rpx;
            height: 174rpx;
            margin: 28rpx 0 0 16rpx;

            .block_3 {
              position: relative;
              width: 174rpx;
              height: 174rpx;
              border-radius: 4px;
              overflow: hidden;
              // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng0bdae5d0eddbc85c5c9d7e7f6d67cd544ace889a659d575f95e9bf758d67431f) 100% no-repeat;

              .box_8 {
                height: 174rpx;
                // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc587ac202a9692986a30140c8b331235c96f8c8ce1337f05ff0fad246244b597) 100% no-repeat;
                width: 174rpx;
                position: absolute;
                left: 0;
                top: 0;

                .block_4 {
                  height: 174rpx;
                  // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngeba4a0fa38e03ac436dafdc12a34ec22ac04ddf5f6084e09fbed5776ecd7723c) 100% no-repeat;
                  width: 174rpx;

                  .group_11 {
                    height: 174rpx;
                    // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngdb7ec4f268d6f73b9acf99c93d692dfedfddaae731f03ec53fae87573fe9738f) 100% no-repeat;
                    width: 174rpx;

                    .image-wrapper_3 {
                      height: 174rpx;
                      // background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc0c68804c87ca7950695def954db8d815001a46f4ed6da04526859a23ce979af) 100% no-repeat;
                      width: 174rpx;

                      .image_4 {
                        width: 174rpx;
                        height: 174rpx;
                      }
                    }
                  }
                }
              }
            }

            .block_5 {
              width: 490rpx;
              height: 164rpx;

              .text_22 {
                width: 490rpx;
                height: 80rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(51, 51, 51, 1);
                font-size: 28rpx;
                line-height: 40rpx;
                text-align: left;
              }

              .text-wrapper_10 {
                width: 480rpx;
                height: 36rpx;
                margin-top: 40rpx;

                .text_23 {
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

                .text_24 {
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

              .text_25 {
                width: 95rpx;
                height: 34rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(224, 37, 27, 1);
                font-size: 24rpx;
                font-family: PingFangSC-Semibold;
                white-space: nowrap;
                line-height: 34rpx;
                text-align: right;
                margin: 6rpx 0 0 390rpx;
              }
            }
          }

          .block_6 {
            width: 186rpx;
            height: 60rpx;
            margin: 34rpx 0 26rpx 500rpx;

            .text-wrapper_11 {
              height: 60rpx;
              border-radius: 15px;
              border: 0.5px solid rgba(224, 37, 27, 1);
              width: 186rpx;

              .text_26 {
                width: 104rpx;
                height: 36rpx;
                display: inline-block;
                overflow-wrap: break-word;
                color: rgba(224, 37, 27, 1);
                font-size: 26rpx;
                white-space: nowrap;
                line-height: 36rpx;
                text-align: center;
                margin: 12rpx 0 0 42rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
