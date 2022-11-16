<template>
	<view class="page flex-col">
		<view class="group_1 flex-col">
			<view class="block_1 flex-col">
				<view class="block_3 flex-col">
					<view class="image_1 flex-col"></view>
					<view class="nav-bar_1 flex-row">
						<image class="thumbnail_1" referrerpolicy="no-referrer" src="@/static/image/wode/fanhui.png"
							@click="black" />
						<text class="text_1">结算明细</text>
					</view>
				</view>
				<view class="group_2 flex-col">
					<view class="text-group_1 flex-col justify-between">
						<text class="text_2">账户余额（元）</text>
						<text class="text_3">{{gold}}</text>
					</view>
					<view class="group_3 flex-row">
						<text class="text_4">充值时间：</text>
						<text style="position: absolute;top:292rpx;left:204rpx;color:#D8D8D8;font-size: 28rpx;"
							v-if="text==''">选择年月日</text>
						<text style="position: absolute;top:302rpx;left:204rpx;font-size: 28rpx;" v-else>{{text}}</text>
						<image v-if="text==''" src="../../static/image/wode/rili.png" mode=""
							style="width: 32rpx;height: 32rpx;position: absolute;top:296rpx;left:504rpx;">
						</image>
						<u-calendar minDate="2022-09-01" maxDate="2023-01-01" color="#E0251B" :show="show" :mode="mode"
							@confirm="confirm" @close="show=false">
						</u-calendar>
						<view class="text-wrapper_1 flex-col" @click="init()">
							<text class="text_6">筛选</text>
						</view>
					</view>
					<view class="tabs">
						<u-tabs :list="tabs" :current="current" lineWidth="30" lineColor="#fff"
							:activeStyle="{color:'#E0251B',fontWeight:'700'}" @click="emit"
							:inactiveStyle="{fontWeight:'700'}"></u-tabs>
						<view style="position: relative; top: -10rpx; left: 160rpx; width: 56rpx;
height: 4rpx;
background: #E0251B;
border-radius: 2rpx;" v-if="current==0"></view>
						<view style="position: relative; top: -10rpx; left: 538rpx; width: 56rpx;
height: 4rpx;
background: #E0251B;
border-radius: 2rpx;" v-else></view>
					</view>
					<view class="list_3 flex-col" v-if="count!=0">
						<view class="list-items_1 flex-col" v-for="(item, index) in list" :key="index">
							<view class="text-wrapper_2 flex-col">
								<text class="text_7">订单ID：{{item.paymentOrderMemo}}</text>
							</view>
							<view class="box_4 flex-row justify-between">
								<view class="text-group_2 flex-col justify-between">
									<text class="text_8">结算金额</text>
									<text
										class="text_10">{{new Date(item.gmtCreate).getFullYear()+'-'+((new Date(item.gmtCreate).getMonth()+1)<10?('0'+(new Date(item.gmtCreate).getMonth()+1)):(new Date(item.gmtCreate).getMonth()+1))+'-'+((new Date(item.gmtCreate).getDate())<10?('0'+(new Date(item.gmtCreate).getDate())):(new Date(item.gmtCreate).getDate()))+' '+((new Date(item.gmtCreate).getHours())<10?('0'+(new Date(item.gmtCreate).getHours())):(new Date(item.gmtCreate).getHours()))+':'+((new Date(item.gmtCreate).getMinutes())<10?('0'+(new Date(item.gmtCreate).getMinutes())):(new Date(item.gmtCreate).getMinutes()))+':'+((new Date(item.gmtCreate).getSeconds())<10?('0'+(new Date(item.gmtCreate).getSeconds())):(new Date(item.gmtCreate).getSeconds()))}}</text>
								</view>
								<text class="text_9">+{{item.orderAmount}}</text>
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
					<view class="block_5 flex-col" @click="show=true"></view>
					<view style="position: fixed;top:680rpx;left:320rpx;">
						<u-loading-icon :show="loading" color="#E0251B" text="加载中..." vertical textColor="#E0251B"></u-loading-icon>
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
				loading:true,
				gold: 0, //金额
				current: 0,
				show: false,
				mode: 'single',
				text: '',
				rq:'',
				limit: 10,
				count: 0,
				flag: true,
				tabs: [{
					name: '收入',
				}, {
					name: '支出',
				}],
				list: []
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
			try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
			let {
				ticketTokenid
			} = this.dataObj;
			this.init();
			uni.request({
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
					// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
					'saas-proappcode': 'cs3',
					'saas-tenantcode': '00000000',
					'saas-token': ticketTokenid
				},
				url: 'https://csweapp.saas.qianjiangcloud.cn/web/vd/vdfaccountouter/queryAccountOuterByUser.json?fundType=01',
				method: 'POST',
				success: res => {
					console.log(res.data);
					this.gold = res.data.dataObj.faccountAmount
				}
			})
		},
		methods: {
			black() {
				uni.navigateBack({
					url: '/pages/wode/wode'
				})
			},
			emit(e) {
				this.current = e.index;
				this.init();
			},
			confirm(e) {
				this.show = false;
				this.text = e[0];
				this.rq=e[0].split('-').join('');
			},
			init() {
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
					url: 'https://csweapp.saas.qianjiangcloud.cn/web/vd/vdfaccountouter/queryAccountOuterDtForUser.json',
					method: 'POST',
					data: {
						rows: limit,
						page: 1,
						orderDc: this.current + 1,
						faccountingDate: this.rq
					},
					success: res => {
						console.log(res.data);
						this.list = res.data.list;
						this.count = res.data.total;
						this.loading=false;
						if (this.limit >= this.count) {
							this.flag = false;
						} else {
							this.flag = true;
						}
					}
				})
			},
		},
	};
</script>
<style lang="scss">
	.tabs {
		margin-top: 20rpx;
		::v-deep .u-tabs__wrapper__nav {
			display: flex;
			justify-content: space-around;
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
			top: 278rpx;
			left: 546rpx;
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
		background-color: rgba(255, 255, 255, 1);
		height: 100vh;

		.group_1 {
			height: 1624rpx;
			background-color: rgba(248, 248, 248, 1);
			width: 750rpx;

			.block_1 {
				height: 1624rpx;
				background-color: rgba(255, 255, 255, 1);
				width: 750rpx;
				position: relative;

				.block_3 {
					background-color: rgba(255, 255, 255, 1);
					width: 750rpx;
					height: 188rpx;

					.image_1 {
						width: 674rpx;
						height: 24rpx;
						background-size: 100% 100%;
						margin: 34rpx 0 0 38rpx;
					}

					.nav-bar_1 {
						width: 750rpx;
						height: 92rpx;
						margin: 28rpx 0 10rpx 0;

						.thumbnail_1 {
							width: 18rpx;
							height: 32rpx;
							margin: 34rpx 0 0 38rpx;
						}

						.text_1 {
							width: 144rpx;
							height: 50rpx;
							overflow-wrap: break-word;
							color: rgba(51, 51, 51, 1);
							font-size: 36rpx;
							text-align: center;
							white-space: nowrap;
							line-height: 50rpx;
							margin: 24rpx 304rpx 0 246rpx;
						}
					}
				}

				.group_2 {
					position: relative;
					width: 750rpx;
					height: 1438rpx;
					margin-bottom: 2rpx;

					.text-group_1 {
						width: 360rpx;
						height: 180rpx;
						margin: 40rpx 0 0 196rpx;

						.text_2 {
							width: 280rpx;
							height: 58rpx;
							overflow-wrap: break-word;
							color: rgba(102, 102, 102, 1);
							font-size: 40rpx;
							font-family: PingFangSC-Medium;
							text-align: left;
							white-space: nowrap;
							line-height: 56rpx;
							margin-left: 40rpx;
						}

						.text_3 {
							width: 360rpx;
							height: 102rpx;
							overflow-wrap: break-word;
							color: rgba(51, 51, 51, 1);
							font-size: 84rpx;
							font-family: PingFangSC-Semibold;
							text-align: center;
							white-space: nowrap;
							line-height: 102rpx;
							margin-top: 20rpx;
							display:flex;
							justify-content: center;
							align-items: center;
						}
					}

					.group_3 {
						width: 690rpx;
						height: 68rpx;
						margin: 60rpx 0 0 30rpx;

						.text_4 {
							width: 144rpx;
							height: 40rpx;
							overflow-wrap: break-word;
							color: rgba(51, 51, 51, 1);
							font-size: 28rpx;
							text-align: right;
							white-space: nowrap;
							line-height: 40rpx;
							margin-top: 14rpx;
						}

						.text_5 {
							width: 186rpx;
							height: 40rpx;
							overflow-wrap: break-word;
							color: rgba(153, 153, 153, 1);
							font-size: 28rpx;
							text-align: left;
							white-space: nowrap;
							line-height: 40rpx;
							margin: 14rpx 0 0 30rpx;
						}

						.thumbnail_2 {
							width: 32rpx;
							height: 32rpx;
							background: url(@/static/image/wode/rili.png) 100% no-repeat;
							background-size: 100% 100%;
							margin: 18rpx 0 0 114rpx;
						}

						.text-wrapper_1 {
							background-color: rgba(224, 37, 27, 1);
							border-radius: 2px;
							height: 68rpx;
							margin-left: 40rpx;
							width: 144rpx;

							.text_6 {
								width: 48rpx;
								height: 34rpx;
								overflow-wrap: break-word;
								color: rgba(255, 255, 255, 1);
								font-size: 24rpx;
								text-align: center;
								white-space: nowrap;
								line-height: 34rpx;
								margin: 18rpx 0 0 48rpx;
							}
						}
					}

					.tabs_1 {
						height: 50rpx;
						width: 412rpx;
						margin: 40rpx 0 0 168rpx;

						.text-wrapper_6 {
							width: 412rpx;
							height: 40rpx;

							.text_11 {
								width: 56rpx;
								height: 40rpx;
								overflow-wrap: break-word;
								color: rgba(224, 37, 27, 1);
								font-size: 28rpx;
								font-family: PingFangSC-Semibold;
								text-align: left;
								white-space: nowrap;
								line-height: 40rpx;
							}

							.text_12 {
								width: 56rpx;
								height: 40rpx;
								overflow-wrap: break-word;
								color: rgba(63, 63, 63, 1);
								font-size: 28rpx;
								text-align: left;
								white-space: nowrap;
								line-height: 40rpx;
							}
						}

						.block_6 {
							width: 56rpx;
							height: 4rpx;
							margin-top: 6rpx;

							.box_2 {
								background-color: rgba(224, 37, 27, 1);
								border-radius: 1px;
								width: 56rpx;
								height: 4rpx;
							}
						}
					}

					.list_3 {
						width: 692rpx;
						margin: 38rpx 0 0 30rpx;
						justify-content: space-between;
						.list-items_1 {
							box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
							background-color: rgba(255, 255, 255, 1);
							border-radius: 4px;
							width: 692rpx;
							height: 194rpx;
							margin-bottom: 20rpx;

							.text-wrapper_2 {
								background-color: rgba(224, 37, 27, 0.15);
								height: 56rpx;
								width: 692rpx;

								.text_7 {
									width: 330rpx;
									height: 34rpx;
									overflow-wrap: break-word;
									color: rgba(224, 37, 27, 1);
									font-size: 24rpx;
									text-align: left;
									white-space: nowrap;
									line-height: 34rpx;
									margin: 12rpx 0 0 16rpx;
								}
							}

							.box_4 {
								width: 640rpx;
								height: 90rpx;
								margin: 18rpx 0 30rpx 24rpx;

								.text-group_2 {
									width: 248rpx;
									height: 86rpx;
									margin-top: 4rpx;

									.text_8 {
										width: 112rpx;
										height: 40rpx;
										overflow-wrap: break-word;
										color: rgba(51, 51, 51, 1);
										font-size: 28rpx;
										text-align: left;
										white-space: nowrap;
										line-height: 40rpx;
									}

									.text_10 {
										width: 248rpx;
										height: 34rpx;
										overflow-wrap: break-word;
										color: rgba(153, 153, 153, 1);
										font-size: 24rpx;
										text-align: left;
										white-space: nowrap;
										line-height: 34rpx;
										margin-top: 12rpx;
									}
								}

								.text_9 {
									width: 118rpx;
									height: 50rpx;
									overflow-wrap: break-word;
									color: rgba(224, 37, 27, 1);
									font-size: 36rpx;
									text-align: right;
									white-space: nowrap;
									line-height: 50rpx;
								}
							}
						}
					}

					.block_5 {
						position: absolute;
						left: 174rpx;
						top: 280rpx;
						width: 382rpx;
						height: 68rpx;
						border: 1px solid rgba(216, 216, 216, 1);
					}
				}
			}
		}
	}
</style>
