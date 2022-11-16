<template>
	<view class="page flex-col">
		<view class="section_1 flex-col">
			<view class="box_1 flex-col">
				<view class="section_2 flex-col">
					<view class="section_3 flex-col">
						<view class="group_1 flex-col justify-between">
							<view class="box_2 flex-row justify-between">
								<image class="thumbnail_1" referrerpolicy="no-referrer"
									src="@/static/image/wode/fanhui.png" @click="black" />
								<text class="text_1">基本信息</text>
							</view>
						</view>
					</view>
					<!-- 头像 -->
					<image class="image_2" referrerpolicy="no-referrer"
						:src="userInfo.userImgurl||'../../static/image/wode/touxiang.png'" />
					<view class="text-wrapper_1 flex-col">
						<text class="text_2" @click="upload">更换头像</text>
					</view>
					<view v-if="dataList.userinfoState==1">
						<view class="section_4 flex-col" v-if="dataList.userinfoType==1">
							<view class="group_2 flex-col">
								<view class="text-wrapper_2 flex-row justify-between">
									<text class="text_3">真实姓名</text>
									<text class="text_4">{{dataList.userinfoCorp}}</text>
								</view>
								<view class="box_3 flex-col"></view>
								<view class="text-wrapper_3 flex-row justify-between">
									<text class="text_5">身份证号码</text>
									<text class="text_6">{{dataList.userinfoCoid}}</text>
								</view>
								<view class="box_4 flex-col"></view>
								<view class="text-wrapper_4 flex-row justify-between">
									<text class="text_7">所在地区</text>
									<text
										class="text_8">{{dataList.provinceName}}&nbsp;{{dataList.cityName}}&nbsp;{{dataList.areaName}}</text>
								</view>
								<view class="box_5 flex-col"></view>
								<view class="box_6 flex-row justify-between">
									<text class="text_9">身份证照片</text>
									<image class="group_3 flex-col" :src="dataList.userinfoCertUrl"></image>
									<image class="group_3 flex-col" :src="dataList.userinfoCert1Url"></image>
								</view>
							</view>
						</view>
						<view class="section_4 flex-col" v-else-if="dataList.userinfoType==2">
							<view class="group_2 flex-col">
								<view class="text-wrapper_2 flex-row justify-between">
									<text class="text_3">企业名称</text>
									<text class="text_4">{{dataList.userinfoCorp}}</text>
								</view>
								<view class="box_3 flex-col"></view>
								<view class="text-wrapper_3 flex-row justify-between">
									<text class="text_5">品牌名称</text>
									<text class="text_6">{{dataList.companyShortname}}</text>
								</view>
								<view class="box_4 flex-col"></view>
								<view class="text-wrapper_4 flex-row justify-between">
									<text class="text_7">所在地区</text>
									<text
										class="text_8">{{dataList.provinceName}}&nbsp;{{dataList.cityName}}&nbsp;{{dataList.areaName}}</text>
								</view>
								<view class="box_5 flex-col"></view>
								<view class="box_6 flex-row justify-between">
									<text class="text_9">营业执照</text>
									<image class="group_3 flex-col" :src="dataList.userinfoCert2Url"></image>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<view style="text-align: center; margin-top: 100rpx; font-size:36rpx;">请先完成认证</view>
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
				dataList: {},
				userInfo: {},
				imgList: []
			};
		},
		mounted() {
			try {
      this.dataObj = JSON.parse(uni.getStorageSync('dataObj'));
    } catch (err) {

    };
			let {
				userId,
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
				url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userservice/getUserservice.json',
				method: 'GET',
				success: res => {
					console.log(res.data);
					this.userInfo = res.data;
				}
			})
		},
		methods: {
			black() {
				uni.navigateBack({
					url: '/pages/wode/wode'
				})
			},
			upload() {
				let {
					userId,
					ticketTokenid
				} = this.dataObj;
				uni.chooseImage({
					success: (res) => {
						console.log(res);
						uni.uploadFile({
							header: {
								'content-type': 'multipart/form-data',
								// 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
								'saas-proappcode': 'cs3',
								'saas-tenantcode': '00000000',
								'saas-token': ticketTokenid
							},
							name: 'file',
							filePath: res.tempFilePaths[0],
							file: res.tempFiles[0],
							url: 'https://csweapp.saas.qianjiangcloud.cn/web/rs/goodsFile/uploadGoodsFiles.json',
							method: 'POST',
							success: res => {
								console.log(JSON.parse(res.data).fileUrl);
								var img = JSON.parse(res.data).fileUrl;
								uni.request({
									header: {
										'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
										'saas-proappcode': 'cs3',
										'saas-tenantcode': '00000000',
										'saas-token': ticketTokenid
									},
									url: 'https://csweapp.saas.qianjiangcloud.cn/web/um/userservice/updateUserserviceByPcode.json',
									method: 'POST',
									data: {
										userId,
										userImgurl: 'https://csweapp.saas.qianjiangcloud.cn' +
											img
									},
									success: res => {
										console.log(res);
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
												this.userInfo = res.data;
											}
										})
									}
								})
							}
						})
					}
				});
			},
		}
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

				.section_2 {
					width: 750rpx;
					height: 1056rpx;

					.section_3 {
						height: 188rpx;
						background-color: rgba(255, 255, 255, 1);
						width: 750rpx;

						.group_1 {
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
						width: 156rpx;
						height: 156rpx;
						margin: 36rpx 0 0 294rpx;
						border-radius: 50%;
					}

					.text-wrapper_1 {
						height: 52rpx;
						border-radius: 13px;
						border: 0.5px solid rgba(227, 58, 49, 1);
						width: 152rpx;
						margin: 12rpx 0 0 298rpx;

						.text_2 {
							width: 102rpx;
							height: 32rpx;
							display: inline-block;
							overflow-wrap: break-word;
							color: rgba(227, 58, 49, 1);
							font-size: 24rpx;
							white-space: nowrap;
							line-height: 32rpx;
							text-align: center;
							margin: 12rpx 0 0 24rpx;
						}
					}

					.section_4 {
						height: 552rpx;
						overflow: hidden;
						background: url(@/static/image/wode/infoBg.png) 80% 100% no-repeat;
						margin-top: 60rpx;
						width: 750rpx;

						// position: relative;
						.group_2 {
							width: 720rpx;
							height: 466rpx;
							margin: 46rpx 0 0 30rpx;

							.text-wrapper_2 {
								width: 688rpx;
								height: 36rpx;

								.text_3 {
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

								.text_4 {
									width: 364rpx;
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

							.box_3 {
								width: 720rpx;
								height: 4rpx;
								// background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngac58b0a2f472ae37402936bad360c6bdfd72da39f8aff441b8aa2a72096f4078) -2rpx 2rpx no-repeat;
								background-size: 722rpx 2rpx;
								margin-top: 22rpx;
							}

							.text-wrapper_3 {
								width: 688rpx;
								height: 36rpx;
								margin-top: 24rpx;

								.text_5 {
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

								.text_6 {
									width: 364rpx;
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

							.box_4 {
								width: 720rpx;
								height: 4rpx;
								// background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngac58b0a2f472ae37402936bad360c6bdfd72da39f8aff441b8aa2a72096f4078) -2rpx 2rpx no-repeat;
								background-size: 722rpx 2rpx;
								margin-top: 22rpx;
							}

							.text-wrapper_4 {
								width: 688rpx;
								height: 36rpx;
								margin-top: 24rpx;

								.text_7 {
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

								.text_8 {
									width: 330rpx;
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

							.box_5 {
								width: 720rpx;
								height: 4rpx;
								// background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngac58b0a2f472ae37402936bad360c6bdfd72da39f8aff441b8aa2a72096f4078) -2rpx 2rpx no-repeat;
								background-size: 722rpx 2rpx;
								margin-top: 22rpx;
							}

							.box_6 {
								width: 688rpx;
								height: 208rpx;
								margin-top: 24rpx;

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
								}

								// 营业执照
								.group_3 {
									width: 260rpx;
									height: 208rpx;
									// background: url(@/static/image/wode/yingyezhizhao.png) -2rpx 0rpx no-repeat;
									// background-size: 294rpx 208rpx;
								}
							}
						}

						.image-wrapper_1 {
							height: 516rpx;
							//        background: url(@/static/image/wode/infoBg.png)
							//          100% no-repeat;
							// background-size: cover;
							width: 750rpx;
							position: absolute;
							left: 0;
							top: 36rpx;

							.image_3 {
								width: 750rpx;
								height: 516rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
