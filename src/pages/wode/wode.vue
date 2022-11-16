<template>
  <view>
    <view class="page flex-col" v-if="!!uInfo&&!!dataObj">
      <view class="box_1 flex-col">
        <view class="section_2 flex-row">
          <view class="nav-bar_1 flex-row">
            <text class="text_1">我的</text>
            <image class="image_1" referrerpolicy="no-referrer" src="@/static/image/wode/shezhiTop.png" @click="safe" />
          </view>
          <view class="group_4 flex-col">
          </view>

        </view>
        <view class="section_9 flex-row">
          <image class="image-wrapper_3 flex-col" :src="userInfo.userImgurl||'../../static/image/wode/touxiang.png'" @click="info"></image>
          <view class="section_11 flex-col justify-between">
            <text class="text_27" @click="info">{{userInfo.userinfoCorp||'用户名'}}</text>
            <view class="group_8 flex-row justify-between" v-if="dataList.userinfoState==1">
              <button class="text-wrapper_3 flex-col" @click="yirenzheng">
                <text class="text_29">已认证</text>
              </button>
            </view>
            <view class="group_8 flex-row justify-between" v-else>
              <text class="text_28">未认证</text>
              <button class="text-wrapper_3 flex-col" @click="renzheng">
                <text class="text_29">去认证</text>
              </button>
            </view>
          </view>
        </view>
        <view class="section_6 flex-col">
          <view class="block_12 flex-row justify-between">
            <text class="text_9">我的订单</text>
            <view class="image-text_1 flex-row justify-between" @click="all">
              <text class="text_10">查看全部订单</text>
              <view class="thumbnail_1 flex-col"></view>
            </view>
          </view>
          <view class="block_13 flex-row">
            <view class="image-text_2 flex-col justify-between" @click="confirm">
              <view class="icon_1 flex-col"></view>
              <text class="text_11">待确认</text>
              <view class="daiqueren" v-if="totalOne">
                <text>{{totalOne}}</text>
              </view>
            </view>
            <view class="group_9 flex-col justify-between" @click="shipments">
              <view class="label_1 flex-col"></view>
              <text class="text_12">待发货</text>
              <view class="daiqueren" v-if="totalTwo">
                <text>{{totalTwo}}</text>
              </view>
            </view>
            <view class="group_10 flex-col justify-between" @click="receipt">
              <view class="block_4 flex-col">
              </view>
              <text class="text_13">待收货</text>
              <view class="daiqueren" v-if="totalThr">
                <text>{{totalThr}}</text>
              </view>
            </view>
            <view class="image-text_3 flex-col justify-between" @click="finish">
              <view class="label_2 flex-col"></view>
              <text class="text_14">已完成</text>
              <view class="daiqueren" v-if="totalFor">
                <text>{{totalFor}}</text>
              </view>
            </view>
            <view class="image-text_4 flex-col justify-between" @click="cancel">
              <view class="block_5 flex-col"></view>
              <text class="text_15">已取消</text>
              <view class="daiqueren" v-if="totalFiv">
                <text>{{totalFiv}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="section_7 flex-col">
          <view class="group_11 flex-row justify-between" @click="online">
            <view class="image-text_5 flex-row justify-between">
              <view class="image-wrapper_1 flex-col"></view>
              <text class="text_18">线上充值</text>
            </view>
            <view class="thumbnail_3 flex-col"></view>
          </view>
          <view class="group_12 flex-row justify-between" @click="offline">
            <view class="image-text_6 flex-row justify-between">
              <view class="thumbnail_4 flex-col"></view>
              <text class="text_19">线下充值</text>
            </view>
            <view class="thumbnail_5 flex-col"></view>
          </view>
          <view class="group_13 flex-row justify-between" @click="settlement">
            <view class="image-text_7 flex-row justify-between">
              <view class="thumbnail_6 flex-col"></view>
              <text class="text_20">结算明细</text>
            </view>
            <view class="thumbnail_7 flex-col"></view>
          </view>
          <view class="group_14 flex-row justify-between" @click="recharge">
            <view class="image-text_8 flex-row justify-between">
              <view class="thumbnail_8 flex-col"></view>
              <text class="text_21">充值明细</text>
            </view>
            <view class="thumbnail_9 flex-col"></view>
          </view>
          <view class="group_15 flex-row justify-between" @click="safe">
            <view class="image-text_9 flex-row justify-between">
              <view class="thumbnail_10 flex-col"></view>
              <text class="text_22">安全设置</text>
            </view>
            <view class="thumbnail_11 flex-col"></view>
          </view>
        </view>
        <!-- <view class="section_8 flex-row">
				<view class="tab-bar-item_1 flex-col justify-between">
					<view class="thumbnail_12 flex-col"></view>
					<text class="text_23">首页</text>
				</view>
				<view class="tab-bar-item_2 flex-col justify-between">
					<view class="thumbnail_13 flex-col"></view>
					<text class="text_24">选品库</text>
				</view>
				<view class="tab-bar-item_3 flex-col justify-between">
					<view class="thumbnail_14 flex-col"></view>
					<text class="text_25">下单</text>
				</view>
				<view class="tab-bar-item_4 flex-col justify-between">
					<view class="image_2 flex-col"></view>
					<text class="text_26">我的</text>
				</view>
			</view> -->
      </view>
    </view>
    <view class="page flex-col" v-else @click="bug">
      <view class="box_1 flex-col">
        <view class="section_2 flex-row">
          <view class="nav-bar_1 flex-row">
            <text class="text_1">我的</text>
            <image class="image_1" referrerpolicy="no-referrer" src="@/static/image/wode/shezhiTop.png" />
          </view>
          <view class="group_4 flex-col">
          </view>

        </view>
        <view class="section_9 flex-row">
          <image class="image-wrapper_3 flex-col" src="../../static/image/wode/touxiang.png"></image>
          <view class="section_11 flex-col justify-between">
            <text class="text_27">用户名</text>
            <view class="group_8 flex-row justify-between">
              <text class="text_28">未认证</text>
              <button class="text-wrapper_3 flex-col">
                <text class="text_29">去认证</text>
              </button>
            </view>
          </view>
        </view>
        <view class="section_6 flex-col">
          <view class="block_12 flex-row justify-between">
            <text class="text_9">我的订单</text>
            <view class="image-text_1 flex-row justify-between">
              <text class="text_10">查看全部订单</text>
              <view class="thumbnail_1 flex-col"></view>
            </view>
          </view>
          <view class="block_13 flex-row">
            <view class="image-text_2 flex-col justify-between">
              <view class="icon_1 flex-col"></view>
              <text class="text_11">待确认</text>
              <view class="daiqueren" v-if="totalOne">
                <text>{{totalOne}}</text>
              </view>
            </view>
            <view class="group_9 flex-col justify-between">
              <view class="label_1 flex-col"></view>
              <text class="text_12">待发货</text>
              <view class="daiqueren" v-if="totalTwo">
                <text>{{totalTwo}}</text>
              </view>
            </view>
            <view class="group_10 flex-col justify-between">
              <view class="block_4 flex-col">
              </view>
              <text class="text_13">待收货</text>
              <view class="daiqueren" v-if="totalThr">
                <text>{{totalThr}}</text>
              </view>
            </view>
            <view class="image-text_3 flex-col justify-between">
              <view class="label_2 flex-col"></view>
              <text class="text_14">已完成</text>
              <view class="daiqueren" v-if="totalFor">
                <text>{{totalFor}}</text>
              </view>
            </view>
            <view class="image-text_4 flex-col justify-between">
              <view class="block_5 flex-col"></view>
              <text class="text_15">已取消</text>
              <view class="daiqueren" v-if="totalFiv">
                <text>{{totalFiv}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="section_7 flex-col">
          <view class="group_11 flex-row justify-between">
            <view class="image-text_5 flex-row justify-between">
              <view class="image-wrapper_1 flex-col"></view>
              <text class="text_18">线上充值</text>
            </view>
            <view class="thumbnail_3 flex-col"></view>
          </view>
          <view class="group_12 flex-row justify-between">
            <view class="image-text_6 flex-row justify-between">
              <view class="thumbnail_4 flex-col"></view>
              <text class="text_19">线下充值</text>
            </view>
            <view class="thumbnail_5 flex-col"></view>
          </view>
          <view class="group_13 flex-row justify-between">
            <view class="image-text_7 flex-row justify-between">
              <view class="thumbnail_6 flex-col"></view>
              <text class="text_20">结算明细</text>
            </view>
            <view class="thumbnail_7 flex-col"></view>
          </view>
          <view class="group_14 flex-row justify-between">
            <view class="image-text_8 flex-row justify-between">
              <view class="thumbnail_8 flex-col"></view>
              <text class="text_21">充值明细</text>
            </view>
            <view class="thumbnail_9 flex-col"></view>
          </view>
          <view class="group_15 flex-row justify-between">
            <view class="image-text_9 flex-row justify-between">
              <view class="thumbnail_10 flex-col"></view>
              <text class="text_22">安全设置</text>
            </view>
            <view class="thumbnail_11 flex-col"></view>
          </view>
        </view>
        <!-- <view class="section_8 flex-row">
				<view class="tab-bar-item_1 flex-col justify-between">
					<view class="thumbnail_12 flex-col"></view>
					<text class="text_23">首页</text>
				</view>
				<view class="tab-bar-item_2 flex-col justify-between">
					<view class="thumbnail_13 flex-col"></view>
					<text class="text_24">选品库</text>
				</view>
				<view class="tab-bar-item_3 flex-col justify-between">
					<view class="thumbnail_14 flex-col"></view>
					<text class="text_25">下单</text>
				</view>
				<view class="tab-bar-item_4 flex-col justify-between">
					<view class="image_2 flex-col"></view>
					<text class="text_26">我的</text>
				</view>
			</view> -->
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      uInfo: '',
      dataObj: {},
      dataList: {},
      userInfo: {},
      totalOne: 0,
      totalTwo: 0,
      totalThr: 0,
      totalFor: 0,
      totalFiv: 0
    };
  },
  // mounted() {
  //   this.uInfo = uni.getStorageSync('uInfo');
  //   this.dataObj = uni.getStorageSync('dataObj');
  // },
  onShow() {
    try {
      this.uInfo = uni.getStorageSync('uInfo');
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    }catch (err) {
      console.log(err)
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userservice/getUserservice.json',
      method: 'GET',
      success: res => {
        console.log(res.data);
        this.userInfo = res.data
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
      method: 'POST',
      data: {
        rows: 10,
        page: 1,
        dataState: 1
      },
      success: res => {
        console.log(res.data);
        this.totalOne = res.data.total;
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
      method: 'POST',
      data: {
        rows: 10,
        page: 1,
        dataState: 2
      },
      success: res => {
        console.log(res.data);
        this.totalTwo = res.data.total;
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
      method: 'POST',
      data: {
        rows: 10,
        page: 1,
        dataState: 3
      },
      success: res => {
        console.log(res.data);
        this.totalThr = res.data.total;
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
      method: 'POST',
      data: {
        rows: 10,
        page: 1,
        dataState: 5
      },
      success: res => {
        console.log(res.data);
        this.totalFor = res.data.total;
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
      url: 'https://csweapp.saas.qianjiangcloud.cn/web/oc/contract/queryContractPageBuiMat.json?childFlag=true',
      method: 'POST',
      data: {
        rows: 10,
        page: 1,
        dataState: -1
      },
      success: res => {
        console.log(res.data);
        this.totalFiv = res.data.total;
      }
    })
  },
  methods: {
    bug() {
      uni.showModal({
        title: '提示',
        content: '即将跳转到登录',
        success: res => {
          console.log(res);
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    },
    info() {
      uni.navigateTo({
        url: '/subPages/wode/info'
      })
    },
    yirenzheng() {
      if (this.userInfo.userinfoType == 1) {
        uni.navigateTo({
          url: '/subPages/wode/individualResults'
        })
      } else {
        uni.navigateTo({
          url: '/subPages/wode/enterpriseResults'
        })
      }
    },
    renzheng() {
      uni.navigateTo({
        url: '/subPages/wode/realNameAuthentication'
      })
    },
    all() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 0
      })
    },
    confirm() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 1
      })
    },
    shipments() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 2
      })
    },
    receipt() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 3
      })
    },
    finish() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 4
      })
    },
    cancel() {
      uni.navigateTo({
        url: '/subPages/wode/all?index=' + 5
      })
    },
    online() {
      uni.navigateTo({
        url: '/subPages/wode/online'
      })
    },
    offline() {
      uni.navigateTo({
        url: '/subPages/wode/offline'
      })
    },
    settlement() {
      uni.navigateTo({
        url: '/subPages/wode/settlement'
      })
    },
    recharge() {
      uni.navigateTo({
        url: '/subPages/wode/recharge'
      })
    },
    safe() {
      uni.navigateTo({
        url: '/subPages/securityset/securityset'
      })
    }
  },
};
</script>
<style>
.daiqueren {
  position: relative;
  top: -100rpx;
  left: 48rpx;
  overflow-wrap: break-word;
  color: rgba(224, 37, 27, 1);
  font-size: 20rpx;
  text-align: center;
  white-space: nowrap;
  line-height: 15px;
  width: 42rpx;
  height: 28rpx;
  border-radius: 14rpx;
  border: 4rpx solid #e0251b;
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
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  overflow: hidden;
}

.box_1 {
  background-color: rgba(248, 248, 248, 1);
  width: 750rpx;
  height: 1624rpx;
}

.section_2 {
  /* background-color: rgba(35, 79, 157, 1); */
  border-radius: 0px 0px 20px 20px;
  position: relative;
  width: 750rpx;
  height: 320rpx;
  overflow: hidden;
}

.nav-bar_1 {
  width: 744rpx;
  height: 76rpx;
  margin: 138rpx 0 0 2rpx;
  position: relative;
  z-index: 999;
}

.text_1 {
  width: 72rpx;
  height: 50rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 36rpx;
  font-family: PingFangSC-Medium;
  text-align: center;
  white-space: nowrap;
  line-height: 50rpx;
  margin: 6rpx 0 0 336rpx;
}

.image_1 {
  width: 44rpx;
  height: 40rpx;
  margin: 12rpx 24rpx 0 268rpx;
}

.group_4 {
  box-shadow: 20px 20px 60px 0px rgba(0, 0, 0, 0.3);
  border-radius: 0px 0px 10px 10px;
  background-image: url(@/static/image/wode/Bg.png);
  background-size: contain;
  height: 350rpx;
  width: 750rpx;
  position: absolute;
  left: 0;
  top: 0;
}

.group_2 {
  width: 674rpx;
  height: 22rpx;
  margin: 26rpx 0 0 38rpx;
}

.section_9 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  position: absolute;
  left: 18rpx;
  top: 224rpx;
  width: 712rpx;
  height: 204rpx;
}

.image-wrapper_3 {
  border-radius: 50%;
  width: 124rpx;
  height: 124rpx;
  margin: 38rpx 0 0 40rpx;
}

.section_11 {
  width: 168rpx;
  height: 98rpx;
  margin: 50rpx 360rpx 0 20rpx;
}

.text_27 {
  width: 96rpx;
  height: 44rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 32rpx;
  font-family: PingFangSC-Medium;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}

.group_8 {
  width: 168rpx;
  height: 34rpx;
  margin-top: 20rpx;
}

.text_28 {
  width: 72rpx;
  height: 34rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 24rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 34rpx;
}

.text-wrapper_3 {
  background-color: rgba(227, 58, 49, 0.1);
  border-radius: 8px;
  height: 34rpx;
  border: 1px solid rgba(224, 37, 27, 1);
  width: 78rpx;
}

.text_29 {
  width: 60rpx;
  height: 28rpx;
  overflow-wrap: break-word;
  color: rgba(224, 37, 27, 1);
  font-size: 20rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 28rpx;
  margin: 2rpx 0 0 8rpx;
}

.section_6 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  height: 240rpx;
  width: 712rpx;
  position: relative;
  margin: 128rpx 0 0 18rpx;
}

.block_12 {
  width: 638rpx;
  height: 40rpx;
  margin: 26rpx 0 0 40rpx;
}

.text_9 {
  width: 112rpx;
  height: 40rpx;
  overflow-wrap: break-word;
  color: rgba(102, 102, 102, 1);
  font-size: 28rpx;
  font-family: PingFangSC-Medium;
  text-align: left;
  white-space: nowrap;
  line-height: 40rpx;
}

.image-text_1 {
  width: 170rpx;
  height: 34rpx;
  margin-top: 4rpx;
}

.text_10 {
  width: 144rpx;
  height: 34rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 24rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 34rpx;
}

.thumbnail_1 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 8rpx;
}

.block_13 {
  width: 622rpx;
  height: 88rpx;
  margin: 54rpx 0 32rpx 40rpx;
}

.image-text_2 {
  width: 66rpx;
  height: 88rpx;
}

.icon_1 {
  width: 46rpx;
  height: 44rpx;
  background: url(@/static/image/wode/daiqueren.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 10rpx;
}

.text_11 {
  width: 66rpx;
  height: 32rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 32rpx;
  margin-top: 12rpx;
}

.group_9 {
  width: 66rpx;
  height: 88rpx;
  margin-left: 74rpx;
}

.label_1 {
  width: 44rpx;
  height: 44rpx;
  background: url(@/static/image/wode/daifahuo.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 10rpx;
}

.text_12 {
  width: 66rpx;
  height: 32rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 32rpx;
  margin-top: 12rpx;
}

.group_10 {
  width: 66rpx;
  height: 88rpx;
  margin-left: 68rpx;
}

.block_4 {
  height: 44rpx;
  background: url(@/static/image/wode/daishouhuo.png) 0rpx 0rpx no-repeat;
  background-size: 54rpx 44rpx;
  margin-left: 6rpx;
  width: 52rpx;
}

.text_13 {
  width: 66rpx;
  height: 32rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 32rpx;
  margin-top: 12rpx;
}

.image-text_3 {
  width: 66rpx;
  height: 88rpx;
  margin-left: 72rpx;
}

.label_2 {
  width: 44rpx;
  height: 44rpx;
  background: url(@/static/image/wode/yiwancheng.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 10rpx;
}

.text_14 {
  width: 66rpx;
  height: 32rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 32rpx;
  margin-top: 12rpx;
}

.image-text_4 {
  width: 66rpx;
  height: 88rpx;
  margin-left: 78rpx;
}

.block_5 {
  width: 42rpx;
  height: 44rpx;
  background: url(@/static/image/wode/yiquxiao.png) 0rpx 0rpx no-repeat;
  background-size: 44rpx 44rpx;
  margin-left: 10rpx;
}

.text_15 {
  width: 66rpx;
  height: 32rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 32rpx;
  margin-top: 12rpx;
}

.section_10 {
  position: absolute;
  left: -2rpx;
  top: 92rpx;
  width: 714rpx;
  height: 2rpx;
}

.section_7 {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  height: 410rpx;
  width: 712rpx;
  margin: 20rpx 0 0 18rpx;
}

.group_11 {
  width: 640rpx;
  height: 42rpx;
  margin: 38rpx 0 0 38rpx;
}

.image-text_5 {
  width: 180rpx;
  height: 42rpx;
}

.image-wrapper_1 {
  width: 32rpx;
  height: 30rpx;
  background: url(@/static/image/wode/xianshang.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 6rpx;
}

.text_18 {
  width: 120rpx;
  height: 42rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 30rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 42rpx;
}

.thumbnail_3 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 12rpx;
}

.group_12 {
  width: 638rpx;
  height: 42rpx;
  margin: 34rpx 0 0 40rpx;
}

.image-text_6 {
  width: 178rpx;
  height: 42rpx;
}

.thumbnail_4 {
  width: 30rpx;
  height: 30rpx;
  background: url(@/static/image/wode/xianxia.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 6rpx;
}

.text_19 {
  width: 120rpx;
  height: 42rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 30rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 42rpx;
}

.thumbnail_5 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 12rpx;
}

.group_13 {
  width: 636rpx;
  height: 42rpx;
  margin: 34rpx 0 0 42rpx;
}

.image-text_7 {
  width: 176rpx;
  height: 42rpx;
}

.thumbnail_6 {
  width: 28rpx;
  height: 32rpx;
  background: url(@/static/image/wode/jiesuan.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 6rpx;
}

.text_20 {
  width: 120rpx;
  height: 42rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 30rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 42rpx;
}

.thumbnail_7 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 12rpx;
}

.group_14 {
  width: 636rpx;
  height: 42rpx;
  margin: 34rpx 0 0 42rpx;
}

.image-text_8 {
  width: 176rpx;
  height: 42rpx;
}

.thumbnail_8 {
  width: 28rpx;
  height: 30rpx;
  background: url(@/static/image/wode/chongzhi.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 6rpx;
}

.text_21 {
  width: 120rpx;
  height: 42rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 30rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 42rpx;
}

.thumbnail_9 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 12rpx;
}

.group_15 {
  width: 638rpx;
  height: 42rpx;
  margin: 34rpx 0 50rpx 40rpx;
}

.image-text_9 {
  width: 178rpx;
  height: 42rpx;
}

.thumbnail_10 {
  width: 32rpx;
  height: 30rpx;
  background: url(@/static/image/wode/shezhi.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 6rpx;
}

.text_22 {
  width: 120rpx;
  height: 42rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 30rpx;
  text-align: left;
  white-space: nowrap;
  line-height: 42rpx;
}

.thumbnail_11 {
  width: 12rpx;
  height: 20rpx;
  background: url(@/static/image/wode/youjiantou.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 12rpx;
}

.section_8 {
  box-shadow: 0px -3px 8px 0px rgba(230, 230, 230, 0.84);
  background-color: rgba(255, 255, 255, 1);
  width: 750rpx;
  height: 110rpx;
  position: fixed;
  bottom: 0;
}

.tab-bar-item_1 {
  width: 40rpx;
  height: 72rpx;
  margin: 20rpx 0 0 74rpx;
}

.thumbnail_12 {
  width: 34rpx;
  height: 38rpx;
  background: url(@/static/image/wode/shouye.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 2rpx;
}

.text_23 {
  width: 40rpx;
  height: 28rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 20rpx;
  text-align: center;
  white-space: nowrap;
  line-height: 28rpx;
  margin-top: 6rpx;
}

.tab-bar-item_2 {
  width: 60rpx;
  height: 72rpx;
  margin: 20rpx 0 0 138rpx;
}

.thumbnail_13 {
  width: 36rpx;
  height: 38rpx;
  background: url(@/static/image/wode/xuanpinku.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 13rpx;
}

.text_24 {
  width: 60rpx;
  height: 28rpx;
  overflow-wrap: break-word;
  color: rgba(26, 27, 44, 1);
  font-size: 20rpx;
  text-align: center;
  white-space: nowrap;
  line-height: 28rpx;
  margin-top: 6rpx;
}

.tab-bar-item_3 {
  width: 40rpx;
  height: 72rpx;
  margin: 18rpx 0 0 136rpx;
}

.thumbnail_14 {
  width: 32rpx;
  height: 38rpx;
  background: url(@/static/image/wode/xiadan.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 6rpx;
}

.text_25 {
  width: 40rpx;
  height: 28rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 20rpx;
  text-align: center;
  white-space: nowrap;
  line-height: 28rpx;
  margin-top: 6rpx;
}

.tab-bar-item_4 {
  width: 42rpx;
  height: 72rpx;
  margin: 18rpx 72rpx 0 148rpx;
}

.image_2 {
  width: 42rpx;
  height: 38rpx;
  background: url(@/static/image/wode/wodeIcon.png) 100% no-repeat;
  background-size: 100% 100%;
}

.text_26 {
  width: 40rpx;
  height: 28rpx;
  overflow-wrap: break-word;
  color: rgba(224, 37, 27, 1);
  font-size: 20rpx;
  text-align: center;
  white-space: nowrap;
  line-height: 28rpx;
  margin-top: 6rpx;
}
</style>
