<template>
  <view class="page flex-col">
    <view class="section_1 flex-col">
      <view class="box_1 flex-col">
        <view class="block_1 flex-col">
          <view class="group_1 flex-col">
            <view class="block_2 flex-col justify-between">
              <view class="box_2 flex-row justify-between">
                <image
                  class="thumbnail_1"
                  referrerpolicy="no-referrer"
                  src="@/static/image/wode/fanhui.png"
				  @click="black"
                />
                <text class="text_1">线下充值</text>
              </view>
            </view>
          </view>
         <image
            class="image_2"
            referrerpolicy="no-referrer"
            src="@/static/image/wode/offline.png"
          />
          <view class="paragraph_1">使用遇到问题?<br>1.充值成功了，为什么账户里没有查到?<br>答:受银行处理时间影响，线下汇款到账会有延迟。若超过24小时仍未显示，请与客服联系</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
	black() {
		uni.navigateBack({
			url: '/pages/wode/wode'
		})
	},
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
  .section_1 {
    height: 1624rpx;
    background-color: rgba(248, 248, 248, 1);
    width: 750rpx;
    .box_1 {
      height: 1624rpx;
      background-color: rgba(255, 255, 255, 1);
      width: 750rpx;
      .block_1 {
        width: 750rpx;
        height: 1008rpx;
        .group_1 {
          height: 188rpx;
          background-color: rgba(255, 255, 255, 1);
          width: 750rpx;
          .block_2 {
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
        .image_2 {
          width: 496rpx;
          height: 666rpx;
          margin: 2rpx 0 0 6rpx;
        }
        .paragraph_1 {
          width: 686rpx;
          height: 144rpx;
          display: inline-block;
          overflow-wrap: break-word;
          color: rgba(153, 153, 153, 1);
          font-size: 24rpx;
          line-height: 36rpx;
          text-align: left;
          margin: 28rpx 0 0 32rpx;
        }
      }
    }
  }
}

</style>