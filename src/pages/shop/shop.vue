<template>
  <view class="shop">
    <!-- 内容 -->
    <view class="content">
      <view class="navBarBox">
        <view class="statusBar" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
        <!-- 真正的导航栏内容 -->
        <view class="navBar">
          <text>选品库</text>
        </view>
      </view>
      <view class="fenlei">
        <view class="name1">
          <view class="saa">
            <text>商品名称</text>
            <input @input="onName" style="font-size: 12px" class="ins" type="text" />
          </view>
          <view class="saa">
            <text>商品编号</text>
            <input class="ins" style="font-size: 12px" @input="onCode" type="text" />
          </view>
        </view>
        <view class="name1" style="padding-top: 35px">
          <view class="saa">
            <text>商品分类</text>

            <view class="ins" type="text">
              <picker class="pickerList" mode="multiSelector" :range="newCategotyDataList" :value="multiIndex" range-key="classtreeName" @change="bindPickerChange" @columnchange="pickerColumnchange">
                <view class="" style="
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  ">
                  {{ select
                  }}<text v-if="select == ''" style="width: 80%; text-align: right; height: 20px"></text>
                </view>
              </picker>
              <view class="" style="float: right" v-if="select == ''">
                <u-icon name="arrow-down" color="#e3dcdc"></u-icon>
              </view>
              <view class="dele" style="float: right" v-else @click="fenleidele">
                <u-icon name="close-circle" color="#e3dcdc"></u-icon>
              </view>
            </view>
          </view>
          <view class="saa">
            <text>供货渠道</text>
            <view class="ins ina">
              <text style="width: 80%; height: 20px" @click="ssw = true">{{
                qudao
              }}</text>
              <view class="" style="float: right" v-if="qudao == ''">
                <u-icon name="arrow-down" color="#e3dcdc"></u-icon>
              </view>
              <view class="dele" style="float: right" v-else @click="this.qudao = ''">
                <u-icon name="close-circle" color="#e3dcdc"></u-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="height: 240rpx" :style="{ paddingTop: statusBarHeight + 'px' }"></view>
    <view class="shaixuan">
      <view class="shai-item" @click="zonghe">
        <text :class="[num == 1 ? 'red' : '']">综合</text>
      </view>
      <view class="shai-item" @click="xiaoliang">
        <text :class="[num == 2 || num == 3 ? 'red' : '']">销量</text>
        <view class="sx">
          <u-icon name="arrow-up-fill" :color="[num == 2 ? '#E0251B' : '#D6D6D6']" size="6"></u-icon>
          <u-icon name="arrow-down-fill" :color="[num == 3 ? '#E0251B' : '#D6D6D6']" size="6"></u-icon>
        </view>
      </view>
      <view class="shai-item" @click="jiage">
        <text :class="[num == 4 || num == 5 ? 'red' : '']">价格</text>
        <view class="sx">
          <u-icon name="arrow-up-fill" :color="[num == 4 ? '#E0251B' : '#D6D6D6']" size="6"></u-icon>
          <u-icon name="arrow-down-fill" :color="[num == 5 ? '#E0251B' : '#D6D6D6']" size="6"></u-icon>
        </view>
      </view>
    </view>
    <view class="xuanpin">
      <view class="xuan-item" v-for="(item, index) in shoplist" :key="index">
        <image :src="item.dataPic" style="width: 100px; height: 100px; border-radius: 5px" mode=""></image>
        <view class="xuan-ner">
          <text class="xuan-title">{{ item.goodsName }}</text>
          <view class="xuan-lei">
            <text>编号：{{ item.goodsNo }}</text>
            <text>分类：{{ item.classtreeName }}</text>
          </view>
          <view class="xuan-lei">
            <text>品牌：小熊</text>
            <text>货主：京东</text>
          </view>
          <view class="money">
            <text
              ><text style="color: #333; display: inline-block">采购价：</text
              >￥{{ item.pricesetAsprice }}</text
            >
            <text>指导零售价：￥{{ item.pricesetMakeprice }}</text>
            <text>毛利率：{{ item.Gross | formatPrice }}</text>
          </view>
        </view>
        <view class="delet" @click="delet(index)">
          <view class="icon_dele" style="width: 16px; margin: auto; margin-top: 3px">
            <u-icon name="trash" color="#fff" size="16px"></u-icon>
          </view>
        </view>
      </view>
      <view class="dixian">
        {{ jiazai }}
      </view>
    </view>

    <u-picker :show="ssw" :columns="gongying" @confirm="abb"></u-picker>
  </view>
</template>

<script>
import { queryscopelist } from "@/api/interface";
import qs from "qs";
export default {
  data() {
    return {
      multiIndex: [0, 0, 0],
      newCategotyDataList: [[], [], []],
      saastoken: "", //登录后的token
      categoryArr: [],
      select: "",
      selectObj: {},
      classtreeName: "", //商品分类id
      dgoodsScopelistDes: "", //商品编号
      qucode: "", //供货渠道
      goodsName: "", //商品名称

      num: 1,
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      closeOnClickOverlay: true,
      ssw: false,
      show: false,
      everyone: [],
      gongying: [["京东开普勒"]],

      fenlei: "",
      qudao: "",

      shoplist: [],
      total: 0,
      page: 1,
      jiazai: "",
    };
  },
  //第一次加载时调用
  onLoad() {
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()["statusBarHeight"];
    let userId = uni.getStorageSync("dataObj");
    this.saastoken = userId.ticketTokenid;
    console.log(this.saastoken);
  },
  //上拉刷新
  onReachBottom() {
    if (this.shoplist.length >= this.total) {
      this.jiazai = "我是有底线的";
      console.log("刷新完毕");
      return;
    } else {
      this.page++;
      this.scopelist();
      this.jiazai = "加载中";
      uni.showLoading({
        title: "加载中",
      });
      setTimeout(function () {
        uni.hideLoading();
      }, 1000);
    }
  },
  onShow() {
    this.shoplist = [];
    this.queryClass();
    this.page = 1;
    this.scopelist();
  },
  onTabItemTap(e) {
    if (!uni.getStorageSync('uInfo') && !uni.getStorageSync('dataObj')) {
      uni.switchTab({
        url: '/pages/wode/wode'
      })
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
    }
  },
		filters: {
			// 格式化价格
			formatPrice(val){
				return val.toFixed(2)
			}
		},
  methods: {
    //删除商品
    delet(index) {
      let dgoodsScopelistId = this.shoplist[index].dgoodsScopelistId;
      uni.request({
        url: "https://csweapp.saas.qianjiangcloud.cn/web/dis/dgoods/deleteDgoodsScopelist.json",
        method: "GET",
        header: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",
          // Referer:
          //   "https://cscommercial.saas.qianjiangcloud.cn/paas/cs-cli-pc/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          // "User-Agent":
          // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
          "saas-proappcode": "cs3",
          "saas-tenantcode": "00000000",
          "saas-token": this.saastoken,
          "sec-ch-ua":
            '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "Accept-Encoding": "deflate, gzip",
        },
        data: {
          dgoodsScopelistId,
        },
        success: (res) => {
          console.log(res);
          if (res.data.success) {
            uni.showToast({
              title: "删除成功",
            });
            this.shoplist.splice(index, 1);
          }
        },
      });
    },
    //价格排序
    Priceup() {
      this.bubblesSort(this.shoplist);
    },
    Pricedown() {
      this.bubbleSort(this.shoplist);
    },
    bubbleSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        //代表第几轮比较
        for (let j = 0; j < arr.length - 1 - i; j++) {
          //每一轮的两两相邻元素比较
          if (arr[j].pricesetAsprice > arr[j + 1].pricesetAsprice) {
            //相邻元素比较
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; //满足条件，交换位置
          }
        }
      }
      return arr;
    },
    bubblesSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {
        //代表第几轮比较
        for (let j = 0; j < arr.length - 1 - i; j++) {
          //每一轮的两两相邻元素比较
          if (arr[j].pricesetAsprice < arr[j + 1].pricesetAsprice) {
            //相邻元素比较
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; //满足条件，交换位置
          }
        }
      }
      return arr;
    },
    fenleidele() {
      this.select = "";
      this.classtreeName = "";
      this.scopelist();
    },
    //搜索名称
    onName(event) {
      this.goodsName = event.target.value;
      this.shoplist = [];
      this.page = 1;
      this.scopelist();
    },
    //搜索编号
    onCode(event) {
      this.dgoodsScopelistDes = event.target.value;
      this.page = 1;
      this.shoplist = [];
      this.scopelist();
    },
    //综合按钮
    zonghe() {
      this.num = 1;
      this.shoplist = [];
      this.page = 1;
      this.scopelist();
    },
    //销量排序
    xiaoliang() {
      if (this.num == 2) {
        this.num = 3;
      } else {
        this.num = 2;
      }
    },
    jiage() {
      if (this.num == 4) {
        this.num = 5;
        this.Pricedown();
      } else {
        this.num = 4;
        this.Priceup();
      }
    },
    add() {
      this.show = true;
    },
    acc() {
      this.ssw = true;
    },

    abb(e) {
      console.log(e);
      this.ssw = false;
      this.qudao = e.value[0];
    },
    //商品请求
    scopelist() {
      let userId = uni.getStorageSync("dataObj");
      this.saastoken = userId.ticketTokenid;
      uni
        .$request({
          url: queryscopelist,
          method: "POST",
          header: {
            'Accept': "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            'Connection': "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Saas-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 qj wemini",
            "saas-proappcode": "cs3",
            "saas-tenantcode": "00000000",
            "saas-token": this.saastoken,
            "sec-ch-ua":
              '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
          },
          data: qs.stringify({
            rows: 10,
            page: this.page,
            classtreeName: this.classtreeName,
            dgoodsScopelistDes: this.dgoodsScopelistDes,
            qucode: this.qucode,
            goodsName: this.goodsName,
          }),
        })
        .then((res) => {
          console.log(res);
          uni.showLoading({
            title: "加载中",
          });
          setTimeout(function () {
            uni.hideLoading();
          }, 100);
          this.total = res.total;
          this.shoplist = [...this.shoplist, ...res.list];
          this.shoplist.forEach(item =>{
              item.Gross = (item.pricesetMakeprice - item.pricesetNprice) / item.pricesetMakeprice
          })
          console.log(this.shoplist);
        });
    },
    //商品分类请求
    queryClass() {
      // https://cscommercial.saas.qianjiangcloud.cn/web/rs/classtree/queryClasstree.json
      uni.request({
        url: "https://csweapp.saas.qianjiangcloud.cn/web/rs/classtree/queryClasstree.json",
        method: "GET",
        header: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9",
          Connection: "keep-alive",

          // 'Origin': 'https://csweapp.saas.qianjiangcloud.cn',
          // 'Referer': 'https://cscommercial.saas.qianjiangcloud.cn/paas/cs-cli-pc/',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          // "User-Agent":
          // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
          "saas-proappcode": "cs3",
          "saas-tenantcode": "00000000",
          "saas-token": this.saastoken,
          "sec-ch-ua":
            '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "Accept-Encoding": "deflate, gzip",
        },
        success: (res) => {
          console.log(res);
          this.categoryArr = res.data;

          for (let i = 0; i < this.categoryArr.length; i++) {
            // console.log(this.categoryArr[i].name);
            this.newCategotyDataList[0].push(this.categoryArr[i]);
          }
          for (let i = 0; i < this.categoryArr[0].childList.length; i++) {
            // console.log(this.categoryArr[0].city[i].name)
            this.newCategotyDataList[1].push(this.categoryArr[0].childList[i]);
          }
          for (
            let i = 0;
            i < this.categoryArr[0].childList[0].childList.length;
            i++
          ) {
            // console.log(this.categoryArr[0].city[0].area)
            this.newCategotyDataList[2].push(
              this.categoryArr[0].childList[0].childList[i]
            );
          }
        },
      });
    },
    pickerColumnchange(e) {
      // 第几列滑动
      // console.log(e.detail.column);
      // 第几列滑动的下标
      // console.log(e.detail.value)
      // 第一列滑动
      if (e.detail.column === 0) {
        this.multiIndex[0] = e.detail.value;
        // console.log('第一列滑动');
        // this.newCategotyDataList[1] = [];
        this.newCategotyDataList[1] = this.categoryArr[
          this.multiIndex[0]
        ].childList.map((item, index) => {
          // console.log(item)
          return item;
        });
        // console.log(this.multiIndex)
        if (this.categoryArr[this.multiIndex[0]].childList.length === 1) {
          this.newCategotyDataList[2] = this.categoryArr[
            this.multiIndex[0]
          ].childList[0].childList.map((item, index) => {
            // console.log(item)
            return item;
          });
        } else {
          this.newCategotyDataList[2] = this.categoryArr[
            this.multiIndex[0]
          ].childList[this.multiIndex[1]].childList.map((item, index) => {
            // console.log(item)
            return item;
          });
        }
        // 第一列滑动  第二列 和第三列 都变为第一个
        this.multiIndex.splice(1, 1, 0);
        this.multiIndex.splice(2, 1, 0);
      }
      // 第二列滑动
      if (e.detail.column === 1) {
        this.multiIndex[1] = e.detail.value;
        // console.log('第二列滑动');
        // console.log(this.multiIndex)
        this.newCategotyDataList[2] = this.categoryArr[
          this.multiIndex[0]
        ].childList[this.multiIndex[1]].childList.map((item, index) => {
          // console.log(item)
          return item;
        });
        // 第二列 滑动 第三列 变成第一个
        this.multiIndex.splice(2, 1, 0);
      }
      // 第三列滑动
      if (e.detail.column === 2) {
        this.multiIndex[2] = e.detail.value;
        // console.log('第三列滑动')
        // console.log(this.multiIndex)
      }
    },
    bindPickerChange(e) {
      this.multiIndex = e.detail.value;
      // 数组内的下标
      // console.log(this.multiIndex);
      // 获取一级类目
      // console.log(this.newCategotyDataList[0][this.multiIndex[0]])
      // 获取二级类目
      // console.log(this.newCategotyDataList[1][this.multiIndex[1]])
      // 获取三级类目
      // console.log(this.newCategotyDataList[2][this.multiIndex[2]])
      this.select = `${this.newCategotyDataList[2][this.multiIndex[2]].classtreeName
        }`;
      this.classtreeName = `${this.newCategotyDataList[2][this.multiIndex[2]].classtreeCode
        }`;
      console.log(this.classtreeName);
      this.shoplist = [];
      this.scopelist();
      this.selectObj = this.newCategotyDataList[2][this.multiIndex[2]];
    },
    chaifen() { },
  },
};
</script>

<style lang="scss">
.pickerList {
  height: 20px;
}

.red {
  color: #e0251b;
}

page {
  background-color: #f8f8f8;
}

.shop {
  .navBar {
    height: 80rpx;
    background: #fff;

    text {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .navBarBox .navBar {
    padding: 3rpx 50rpx;
    padding-bottom: 8rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .navBarBox .navBar .logo {
    width: 82rpx;
    height: 82rpx;
    margin-right: 10rpx;
  }

  .content {
    width: 100%;
    background: #fff;
    padding-bottom: 10px;
    position: fixed;
    top: 0;
    z-index: 998999;

    .fenlei {
      width: 95%;
      margin: auto;
      background: #fff;
      // height: 50px;

      .name1 {
        .saa {
          display: inline-block;
          width: 48%;
          height: 26px;
          margin-left: 2%;
          float: left;
          text {
            float: left;
            font-size: 14px;
            line-height: 26px;
            // font-family: PingFangSC-Regular;
          }

          .ins {
            box-sizing: border-box;
            width: 62%;

            height: 24px;
            margin-left: 5px;

            display: inline-block;
            border: 1px solid #e3dcdc;
            .pickerList {
              display: inline-block;

              width: 80%;
            }

            .u-icon {
              padding-top: 5px;
              padding-right: 4px;
            }
          }

          .ina {
            .u-icon {
              padding-top: 5px;
            }
          }
        }
      }
    }
  }

  .shaixuan {
    width: 90%;
    height: 30px;
    margin: auto;
    margin-top: 10px;

    .shai-item:first-child {
      width: 10%;
    }

    .shai-item {
      width: 13%;
      margin-right: 5%;
      display: inline-block;

      text {
        font-size: 12px;
      }

      .sx {
        padding-right: 10%;
        padding-top: 7px;
        float: right;
      }
    }
  }

  .xuanpin {
    width: 90%;
    margin: auto;

    .xuan-item:first-child {
      margin-top: 0px;
    }

    .xuan-item {
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
      height: 150px;
      margin-top: 12px;
      border-radius: 10px;
      background: #fff;
      position: relative;

      image {
        margin: 10px 10px 0 10px;
        float: left;
      }

      .delet {
        position: absolute;
        bottom: 10px;
        right: 20px;
        width: 20px;
        height: 20px;
        display: inline-block;
        float: right;
        background: #e0251b;
        border-radius: 100%;
        line-height: 20px;
        text-align: center;
      }

      .xuan-ner {
        width: 50%;
        margin-top: 10px;
        float: left;
        .xuan-title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          width: 80%;
        }
        .xuan-lei {
          margin-top: 10px;

          text {
            color: #999999;
            width: 50%;
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            float: left;
            font-size: 13px;
          }
        }

        .money {
          height: 21px;
          margin-top: 60px;
          text {
            margin-top: 3px;
          }
          text:first-child {
            color: #e0251b;
            display: block;
            font-size: 14px;
          }
          text:nth-child(2) {
            color: #999999;
            font-size: 10px;
            display: block;
          }
          text:nth-child(3) {
            color: #999999;
            font-size: 10px;
            display: block;
          }
        }
      }
    }
    .dixian {
      width: 100%;
      height: 50px;
      background: #f8f8f8;
      text-align: center;
      line-height: 50px;
      color: #999999;
    }
  }
}
</style>
