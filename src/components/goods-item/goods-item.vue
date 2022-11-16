<template>
	<view class="goodsItem-container">
    <view class="goods-item">
      <view class="imgBox">
        <image class="img" :src="goodItem.dataPic"></image>
      </view>
      <view class="goodName">
				<text class="text">{{ goodItem.goodsName }}</text>
			</view>
      <view class="bottom">
        <view class="price">
					<view class="nprice">
						<text>采购价：</text>
						<text class="num">¥{{ goodItem.pricesetNprice }}</text>
					</view>
					<view class="makeprice">
						<text>指导零售价：</text>
						<text>¥{{ goodItem.pricesetMakeprice }}</text>
					</view>
					<view class="gross">
						<text>毛利率：</text>
						<text>{{ grossPrice | formatPrice }}</text>
					</view>
				</view>
        <view class="radio-box">
          <radio
						:checked="goodItem.goodsChecked"
						class="radio"
						color="#e22519"
						@click="changeRadio(goodItem)"
					></radio>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		props: {
			goodItem: {
				type: Object
			}
		},
		data() {
			return {

			}
		},

		computed: {
			// 毛利率
			grossPrice(){
				return  (this.goodItem.pricesetMakeprice - this.goodItem.pricesetNprice) / this.goodItem.pricesetMakeprice
			},
		},

		filters: {
			// 格式化价格
			formatPrice(val){
				return val.toFixed(2)
			}
		},

		methods: {
			// 切换单选框的选中状态
			changeRadio(goodItem){
				this.$emit('changeRadioStatus', goodItem)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsItem-container{
		.goods-item{
			width: 100%;
			height: 540rpx;
			border-radius: 24rpx;
			overflow: hidden;
			background-color: #FFF;
			padding-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			.imgBox{
				width: 100%;
				height: 346rpx;
				.img{
					width: 100%;
					height: 100%;
				}
			}
			.goodName{
				flex: 1;
				line-height: 60rpx;
				width: 326rpx; // 宽度写固定值，为了让文字显示在一行
				padding: 10rpx 10rpx 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 14px;
			}
			.bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 10rpx;
				.price{
					.nprice{
						// font-weight: bold;
						font-size: 14px;
						.num{
							color: #e22519;
						}
					}
					.makeprice, .gross{
						font-size: 12px;
						color: rgba(153, 153, 153, 1);
						font-weight: normal;
					}
					// .gross{
					// 	font-size: 12px;
					// 	color: rgba(153, 153, 153, 1);
					// }
				}
				.radio-box{
					.radio{
						transform:scale(0.8);
					}
				}
			}
		}
	}



</style>
