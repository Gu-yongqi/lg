<template>

    <view class="settleBox">
      <view class="left">
        <view class="radio-box">
          <radio
            :checked="checkedAllRadioStatus"
            class="radio"
            color="#e22519"
            @click="checkedAllRadio"
          ></radio>
        </view>
        <view class="selectAll">全选</view>
        <view class="countBox">(已选择<text class="count"> {{ checkedGoodsObjLen }} </text>件商品)</view>
      </view>
      <view class="right">
        <button class="addToStockBtn" @click="addToStock">加入选品库</button>
      </view>
    </view>

</template>

<script>
import { mapGetters } from 'vuex'
import { saveOrUpdateDgoodsScopelistBatch } from '@/api/interface'
	export default {
    props: {
      allGoodslen: Number
    },

		data() {
			return {

			}
		},

    computed: {
      ...mapGetters('goods', ['checkedGoodsObjLen', 'checkedGoodsList']),
      ...mapGetters('user', ['dataObj']),


      // 全选按钮的选中状态
      checkedAllRadioStatus(){
        // console.log('子组件this.checkedGoodsObjLen', this.checkedGoodsObjLen);
        // console.log('子组件this.allGoodslen', this.allGoodslen);
        if(this.allGoodslen === 0){
          return false
        }else {

          return this.checkedGoodsObjLen === this.allGoodslen
        }
      }
    },

		methods: {
      // 加入选品库
      async addToStock(){
        // console.log('this.checkedGoodsList', this.checkedGoodsList);
        const goodsIdArr = []
        this.checkedGoodsList.forEach(item => {
          goodsIdArr.push(item.goodsId) // 将从vuex获取的商品的id作为参数
        })
        // console.log('商品id组成的数组goodsIdArr', goodsIdArr);

        const res = await uni.$request({
					url: saveOrUpdateDgoodsScopelistBatch,
          header: {
            'saas-token': this.dataObj.ticketTokenid,
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Referer': 'https://cscommercial.saas.qianjiangcloud.cn/paas/cs-cli-pc/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Saas-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 qj wemini',
            'saas-proappcode': 'cs3',
            'saas-tenantcode': '00000000',
            'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Accept-Encoding': 'deflate, gzip',
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
					data: {
            paramJson: goodsIdArr
          }
				})
        if(res.success){
          uni.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 1000
          })
        }else {
          uni.showToast({
            title: `${res.msg}`,
            icon: 'none',
            duration: 1000
          })
        }
      },
      // 点击全选按钮
      checkedAllRadio(){
        this.$emit('changeAllcheckedStatus', !this.checkedAllRadioStatus)
      }
		}
	}
</script>

<style lang="scss" scoped>

  .settleBox{
    background-color: #fff;
    padding: 0 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    .left{
      display: flex;
      align-items: center;
      .radio-box{
        .radio{
          transform:scale(0.8)
        }
      }
      .selectAll{
        font-size: 14px;
        margin-right: 8rpx;
      }
      .countBox{
        font-size: 12px;
        .count{
          color: #e22519;
        }
      }
    }
    .right{
      .addToStockBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 108px;
        height: 34px;
        background-color: rgb(224, 37, 27);
        color: #fff;
        border-radius: 40rpx;
        font-size: 14px;
      }
    }
  }

</style>
