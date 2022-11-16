<template>
	<view class="page flex-col">
		<view class="box_1 flex-col">
			<view class="box_2 flex-col">
				<view class="section_1 flex-col">
					<view class="group_1 flex-col">
						<view class="group_2 flex-col justify-between">
							<view class="box_3 flex-row justify-between">
								<image class="thumbnail_1" referrerpolicy="no-referrer"
									src="@/static/image/wode/fanhui.png" @click="black" />
								<text class="text_1">充值明细</text>
							</view>
						</view>
					</view>
					<view class="group_3 flex-row">
						<text class="text_2">充值时间：</text>
						<text style="position: absolute;top:222rpx;left:204rpx;color:#D8D8D8;font-size: 28rpx;"
							v-if="text==''">开始日期-结束日期</text>
						<text style="position: absolute;top:222rpx;left:204rpx;font-size: 28rpx;" v-else>{{text}}</text>
						<image v-if="text==''" src="../../static/image/wode/rili.png" mode=""
							style="width: 32rpx;height: 32rpx;position: absolute;top:226rpx;left:504rpx;">
						</image>
						<u-calendar minDate="2022-09-01" maxDate="2023-01-01" color="#E0251B" :show="show" :mode="mode" @confirm="confirm" @close="show=false">
						</u-calendar>
						<view class="text-wrapper_1 flex-col" @click="init()">
							<text class="text_4">筛选</text>
						</view>
					</view>
					<view class="list_1 flex-col" v-if="count!=0">
						<view class="list-items_1 flex-col" v-for="(item, index) in list" :key="index">
							<view class="section_2 flex-col">
								<view class="text-wrapper_2 flex-col">
									<text class="text_5" v-if="item.rechargeState==0">支付状态：已成功</text>
								</view>
								<view class="text-wrapper_3 flex-row justify-between">
									<text class="text_6">{{item.userName}}</text>
									<text class="text_7">+{{item.rechargeMoney}}</text>
								</view>
								<text
									class="text_8">{{new Date(item.gmtCreate).getFullYear()+'-'+((new Date(item.gmtCreate).getMonth()+1)<10?('0'+(new Date(item.gmtCreate).getMonth()+1)):(new Date(item.gmtCreate).getMonth()+1))+'-'+((new Date(item.gmtCreate).getDate())<10?('0'+(new Date(item.gmtCreate).getDate())):(new Date(item.gmtCreate).getDate()))+' '+((new Date(item.gmtCreate).getHours())<10?('0'+(new Date(item.gmtCreate).getHours())):(new Date(item.gmtCreate).getHours()))+':'+((new Date(item.gmtCreate).getMinutes())<10?('0'+(new Date(item.gmtCreate).getMinutes())):(new Date(item.gmtCreate).getMinutes()))+':'+((new Date(item.gmtCreate).getSeconds())<10?('0'+(new Date(item.gmtCreate).getSeconds())):(new Date(item.gmtCreate).getSeconds()))}}</text>
							</view>
						</view>
					<view v-if="flag" style="text-align: center;font-size: 24rpx; color: #999999;padding-bottom: 20rpx;">
						拼命加载中...
					</view>
					<view v-else style="text-align: center;font-size: 24rpx; color: #999999;padding-bottom: 20rpx;">
						没有更多数据了
					</view>
					</view>
					<view v-else-if="count==0&&loading==false" style="text-align: center;margin-top: 300rpx;">
						<image style="width: 716rpx;height: 216rpx;" src="@/static/image/wode/chongzhijilu.png" mode="">
						</image>
						<view style="margin-top: 50rpx;font-size: 24rpx; color: #999999;">暂无充值记录</view>
					</view>
					<view style="position: fixed;top:320rpx;left:320rpx;">
						<u-loading-icon :show="loading" color="#E0251B" text="加载中..." vertical textColor="#E0251B"></u-loading-icon>
					</view>
				</view>
				<view class="section_3 flex-col" @click="show=true"></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				dataObj: {},
				loading:true,
				show: false,
				mode: 'range',
				text: '',
				limit: 10,
				count: 0,
				flag: true,
				list: [],
				startDate:'',
				endDate:''
			};
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
		mounted() {
			this.init();
		},
		methods: {
			black() {
				uni.navigateBack({
					url: '/pages/wode/wode'
				})
			},
			confirm(e) {
				this.show = false;
				this.text = e[0] + '~' + e[e.length - 1];
				this.startDate=e[0];
				this.endDate=e[e.length-1];
			},
			init() {
				try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
				let {
					ticketTokenid
				} = this.dataObj;
				let {
					limit
				} = this;
				uni.request({
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
						'saas-proappcode': 'cs3',
						'saas-tenantcode': '00000000',
						'saas-token': ticketTokenid
					},
					url: 'https://csweapp.saas.qianjiangcloud.cn/web/cp/recharge/queryRechargePageForAtByMem.json',
					method: 'POST',
					data: {
						rows: limit,
						page: 1,
						dataState: 5,
						startDate:this.startDate,
						endDate:this.endDate
					},
					success: res => {
						console.log(res.data);
						this.list = res.data.list;
						this.count = res.data.total;
						this.loading=false;
						if(this.limit>=this.count){
							this.flag=false;
						}else{
							this.flag=true;
						}
					}
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
		// flex-direction: row;
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
				height: 1624rpx;
				background-color: rgba(255, 255, 255, 1);
				width: 750rpx;
				position: relative;

				.section_1 {
					width: 750rpx;
					height: 1150rpx;

					.group_1 {
						height: 188rpx;
						background-color: rgba(255, 255, 255, 1);
						width: 750rpx;

						.group_2 {
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
						width: 690rpx;
						height: 68rpx;
						margin: 20rpx 0 0 30rpx;

						.text_2 {
							width: 144rpx;
							height: 40rpx;
							display: inline-block;
							overflow-wrap: break-word;
							color: rgba(51, 51, 51, 1);
							font-size: 28rpx;
							white-space: nowrap;
							line-height: 40rpx;
							text-align: right;
							margin-top: 14rpx;
						}

						.text_3 {
							width: 242rpx;
							height: 40rpx;
							display: inline-block;
							overflow-wrap: break-word;
							color: rgba(153, 153, 153, 1);
							font-size: 28rpx;
							white-space: nowrap;
							line-height: 40rpx;
							text-align: left;
							margin: 14rpx 0 0 30rpx;
						}

						.thumbnail_2 {
							width: 32rpx;
							height: 32rpx;
							margin: 18rpx 0 0 58rpx;
						}

						.text-wrapper_1 {
							position: absolute;
							top: 208rpx;
							left: 576rpx;
							height: 68rpx;
							border-radius: 2px;
							background-color: rgba(224, 37, 27, 1);
							width: 144rpx;

							.text_4 {
								width: 48rpx;
								height: 34rpx;
								display: inline-block;
								overflow-wrap: break-word;
								color: rgba(255, 255, 255, 1);
								font-size: 24rpx;
								white-space: nowrap;
								line-height: 34rpx;
								text-align: center;
								margin: 18rpx 0 0 48rpx;
							}
						}
					}

					.list_1 {
						width: 750rpx;
						height: 1310rpx;
						// justify-content: space-between;
						margin: 38rpx 0 0 30rpx;
						overflow-y: scroll;

						.list-items_1 {
							height: 194rpx;
							border-radius: 4px;
							background-color: rgba(255, 255, 255, 1);
							box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
							margin-bottom: 20rpx;
							width: 692rpx;

							.section_2 {
								width: 692rpx;
								height: 164rpx;

								.text-wrapper_2 {
									height: 56rpx;
									// background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng63482d5c9bb2b2163ba32a55fa6c80939b0a2390288b50ecbcd34c7b1b0b4214)
									//   100% no-repeat;
									background-color: #fadedc;
									width: 692rpx;

									.text_5 {
										width: 330rpx;
										height: 34rpx;
										display: inline-block;
										overflow-wrap: break-word;
										color: rgba(224, 37, 27, 1);
										font-size: 24rpx;
										white-space: nowrap;
										line-height: 34rpx;
										text-align: left;
										margin: 12rpx 0 0 16rpx;
									}
								}

								.text-wrapper_3 {
									width: 640rpx;
									height: 50rpx;
									margin: 18rpx 0 0 24rpx;

									.text_6 {
										width: 196rpx;
										height: 40rpx;
										display: inline-block;
										overflow-wrap: break-word;
										color: rgba(51, 51, 51, 1);
										font-size: 28rpx;
										white-space: nowrap;
										line-height: 40rpx;
										text-align: left;
										margin-top: 4rpx;
									}

									.text_7 {
										width: 118rpx;
										height: 50rpx;
										display: inline-block;
										overflow-wrap: break-word;
										color: rgba(224, 37, 27, 1);
										font-size: 36rpx;
										white-space: nowrap;
										line-height: 50rpx;
										text-align: right;
									}
								}

								.text_8 {
									width: 8rpx;
									height: 34rpx;
									display: inline-block;
									overflow-wrap: break-word;
									color: rgba(153, 153, 153, 1);
									font-size: 24rpx;
									white-space: nowrap;
									line-height: 34rpx;
									text-align: right;
									margin: 6rpx 0 0 24rpx;
								}
							}
						}
					}
				}

				.section_3 {
					position: absolute;
					left: 174rpx;
					top: 208rpx;
					width: 382rpx;
					height: 68rpx;
					border: 1px solid rgba(216, 216, 216, 1);
				}
			}
		}
	}
</style>
