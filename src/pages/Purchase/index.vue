<template>
  <view class="Purchase">
    <view class="content">
      <view class="navBarBox">
        <view
          class="statusBar"
          :style="{ paddingTop: statusBarHeight + 'px' }"
        ></view>
        <!-- 真正的导航栏内容 -->
        <view class="navBar">
          <text>进货单</text>
        </view>
      </view>
    </view>
    <view
      :style="{ paddingTop: statusBarHeight + 'px' }"
      style="margin-top: 110rpx"
    ></view>
    <u-checkbox-group placement="column" v-model="checkboxValue1">
      <view class="purch_list" v-for="(item, index) in purchlist" :key="index">
        <view class="purch_addres">
          <view class="purch-labal">
            <u-checkbox
              style="padding-top: 35px"
              activeColor="#e0251b"
              shape="circle"
              @change="purchchecked(item,index)"
              :checked="item.checked"
            ></u-checkbox>
          </view>
          <view class="addres-li adr">
            <u-icon name="map" size="13"></u-icon>
            <text style="padding-right: 10px">{{
              item.umAddressReDomain.addressMember
            }}</text>
            <text>{{ item.umAddressReDomain.addressPhone }}</text>
          </view>
          <view class="addres-li" style="padding-top: 5px; color: #999999">
            <text
              >地址：{{ item.umAddressReDomain.provinceName
              }}{{ item.umAddressReDomain.areaName
              }}{{ item.umAddressReDomain.cityName
              }}{{ item.umAddressReDomain.addressDetail }}
            </text>
          </view>
        </view>
        <view
          class="purch-item"
          v-for="(item1, index1) in item.shoppingpackageList[0]
            .shoppingGoodsList"
          :key="index1"
        >
          <image
            :src="item1.dataPic"
            mode=""
            style="width: 80px; height: 80px; border-radius: 5px"
          />
          <view class="item-ner">
            <text class="item-title">{{item1.goodsName}}</text>
            <view class="item-kucun">
              <text>库存：{{ item1.goodsNum }}</text>
              <text>运费：￥6</text>
            </view>
            <view class="money">
              <text>￥{{ item1.pricesetAsprice }}</text>
            </view>
            <view
              class="numberbox"
              style="width: 40%; float: right; margin-top: 13px;margin-right: 10%;"
            >
              <uni-number-box @change="goodsnum($event, index, index1)" :max="item1.goodsNum" v-model="item1.goodsCamount" />
              <view class="delet" @click="delet(index,index1)">
                <view
                  class="icon_dele"
                  style="width: 16px; margin-top: 3px;float: right;margin-right: 1.5px;"
                >
                  <u-icon name="trash" color="#fff" size="16px"></u-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-checkbox-group>
    <view class="settlement">
      <view class="settle-labal">
        <u-checkbox-group>
          <u-checkbox
            @change="Allpurch"
            activeColor="#e0251b"
            shape="circle"
            :checked="allnumber"
          ></u-checkbox
          >全选
        </u-checkbox-group>
      </view>
      <view class="settle-price">
        <text style="font-size: 12px"
          >总合计:<text style="color: #e0251b; font-size: 18px"
            >￥{{ Allprice }}</text
          ></text
        >
        <view class="yunfei">
          <text>商品合计:￥900</text>
          <text>运费合计:￥100</text>
        </view>
      </view>

      <view class="order">立即订购</view>
      <view class="order" @click="addOrder">加入进货单</view>
    </view>
    <u-popup :show="priceshow" mode="center" customStyle="width:340px;height:250px;border-radius:10px;" @close="close">
        <view class="pop" v-if="priceshowA== 1">
            <view class="pop-top">
              <text>结算明细</text>
              <u-icon @click="priceshow = false" name="close-circle" size="20"></u-icon>
            </view>
            <view class="pop-price">
              <text class="pop-title">商品金额合计：</text>
              <text class="pop-pce">￥{{Allprice}}</text>
            </view>
            <view class="pop-price">
              <text class="pop-title">运费金额合计：</text>
              <text class="pop-pce">￥{{freight}}</text>
            </view>
            <view class="pop-price">
              <text class="pop-title">结算扣款合计：</text>
              <text class="pop-pce pop-pcered">￥{{Allprices}}</text>
            </view>
            <view class="pop-aniu">
              <button class="mini-btn" plain="true" type="warn" @click="priceshow = false" size="mini">取消</button>
              <button class="mini-btn" type="warn" size="mini" @click="InConfirm">确定</button>
            </view>
        </view>
        <view class="pop-A" v-else-if="priceshowA==2">
            <view class="popa-img">
              <image
                src="../../static/编组.png"
                style="width:38px;height:38px;"
                mode="scaleToFill"
              />
            </view>
            <view class="popa-title">
              <text>结算失败，您的余额不足已存入您的进货单</text>
            </view>
            <view class="pop-aniu">
              <button class="mini-btn" plain="true" type="warn" @click="priceshow = false" size="mini">继续订购</button>
              <button class="mini-btn" type="warn" size="mini" @click="navTo()">去充值</button>
            </view>
        </view>
        <view class="pop-A" v-else-if="priceshowA==3">
            <view class="popa-img">
              <image
                src="../../static/编组.png"
                style="width:38px;height:38px;"
                mode="scaleToFill"
              />
            </view>
            <view class="popa-title">
              <text>您还为未实名认证，认证后可下单</text>
            </view>
            <view class="pop-aniu">
              <button class="mini-btn" plain="true" type="warn" @click="priceshow = false" size="mini">取消</button>
              <button class="mini-btn" type="warn" size="mini" @click="navTo()">去认证</button>
            </view>
        </view>
		</u-popup>
  </view>
</template>

<script>
import { queryReplenishOrder,deleteShopping,updateShopping } from "@/api/interface";
import qs from "qs";
export default {
  name: "Purchase",
  components: {},
  props: {},
  onLoad() {},
  data() {
    return {
      statusBarHeight: 0,
      saastoken: "",
      purchlist: [],
      allnumber:false,
      Allprice:0,
      priceshow:false,
      paramStr:[],
      memberBcode:[]
    };
  },
  computed: {},
  methods: {
    goodsnum(val, index, index1){
      
      let skuCode = this.purchlist[index].shoppingpackageList[0].shoppingGoodsList[index1].skuCode
      let goodWeight = this.purchlist[index].shoppingpackageList[0].shoppingGoodsList[index1].goodsNum
      let memberBcode = this.purchlist[index].memberBcode
      let amount = val
      uni.$request({
          url:updateShopping,
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
          method:"POST",
          data: { skuCode,amount,
            goodWeight,
            memberBcode
          }
        }).then(res=>{
          console.log(res);
          this.allprices()
        })
    },
    //下单
    async InConfirm(){
      let userId = uni.getStorageSync("dataObj");
      let userInfoCode = userId.userInfoCode
      const sum = await uni.$request({
          url:queryAccountOuterByUser,
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
          method:"POST",
          data: { fundType:'01' }
        })
      if(sum.success){
        console.log(sum.dataObj);
        if(Number(sum.dataObj.faccountAmount) < Number(this.Allprices)){
          uni.showToast({
          icon:'error',
          title:'余额不足，请充值'
        })
        return
        }else{
          this.orderDomainStr[0].packageList[0].shoppingGoodsIdList = this.shoppingGoodsIdList
          for(var i=0;i<this.shoplist.shoppingGoodsList.length;i++){
            this.orderDomainStr[0].packageList[0].contractGoodsList.push(this.shoplist.shoppingGoodsList[i])
          }
          this.orderDomainStr[0].ocContractSettlList[0].contractSettlPmoney = this.Allprices
          this.orderDomainStr[0].ocContractSettlList[0].contractSettlGmoney = this.Allprices
          this.orderDomainStr[0].contractInmoney = this.Allprices
          this.orderDomainStr[0].contractMoney = this.Allprices
          this.orderDomainStr[0].goodsReceiptMem = this.addressname
          this.orderDomainStr[0].goodsReceiptArrdess = this.result.result + this.addressxi
          this.orderDomainStr[0].goodsReceiptPhone = this.addressnumber
          this.orderDomainStr[0].areaCode = this.defaultRegion[1]
        }
      }else{
        uni.showToast({
          icon:'error',
          title:'失败'
        })
      }
      console.log(this.orderDomainStr);
      const res = await uni.$request({
          url:saveContract,
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
          method:"POST",
          data: qs.stringify({ memberBcode:userInfoCode, orderDomainStr: JSON.stringify(this.orderDomainStr) })
        })
        if(res.success){
          this.priceshow = false
          
        }
        
    },
    //调取运费
    buynow(){
      this.purchlist = []
      if(this.Allprice == 0){
        uni.showToast({
          icon:'error',
          title:'请选择商品'
        })
      }else{
        for(var i = 0;i<this.shoplist.shoppingGoodsList.length;i++){
            this.shoppingGoodsIdList.push(this.shoplist.shoppingGoodsList[i].shoppingGoodsId)
            let str = { shoppingGoodsIdStr:''}
            str.shoppingGoodsIdStr = `[${this.shoplist.shoppingGoodsList[i].shoppingGoodsId}]`;
            this.purchlist.push(str)
          }
          this.priceshow = true
          uni.$request({
          url:calculateFreight,
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
          method:"POST",
          data: qs.stringify({ memberBcode:this.memberBcode, paramStr: JSON.stringify(this.purchlist) })
        }).then(res=>{
          console.log(res);
          this.freight = res.dataObj
        })
        this.Allprices = this.Allprice + this.freight
      }
    },
    navTo(item){
      uni.navigateTo({
        url:item
      })
    },
    close(){
      this.priceshow = false
    },
    //删除单个商品
    delet(index,index1){
      console.log(index,index1);
      let skuCode =  this.purchlist[index].shoppingpackageList[0].shoppingGoodsList[index1].skuCode
      let memberBcode =  this.purchlist[index].memberBcode
      uni.$request({
          url:deleteShopping,
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
          method:"POST",
          data: qs.stringify({ memberBcode,skuCode })
        }).then(res=>{
          console.log(res);
          this.ReplenishOrder()
          this.allprices()
        })
    },
    allprices(){
      var sum = 0
				this.purchlist.forEach(el => {
					if (el.checked == true) {
            let num = 0
            for(var i = 0;i<el.shoppingpackageList[0].shoppingGoodsList.length;i++){
               num +=el.shoppingpackageList[0].shoppingGoodsList[i].pricesetAsprice * el.shoppingpackageList[0].shoppingGoodsList[i].goodsCamount
            }
						sum += num
					}
				})
        this.Allprice = sum
    },
    purchchecked(item,index){
      this.purchlist[index].checked
      this.purchlist[index].checked = !this.purchlist[index].checked
      console.log(this.purchlist[index].checked);
      if(item.checked){
        for(var i = 0;i<this.purchlist[index].shoppingpackageList[0].shoppingGoodsList.length;i++){
            let str = { shoppingGoodsIdStr:''}
            str.shoppingGoodsIdStr = `[${this.purchlist[index].shoppingpackageList[0].shoppingGoodsList[i].shoppingGoodsId}]`;
            this.paramStr.push(str)
          }
          this.memberBcode.push(item.memberBcode)
          console.log(this.memberBcode);
          console.log(this.paramStr);
      }else{
        this.memberBcode = this.memberBcode.splice(index,1)
        console.log(this.memberBcode);
      }
      this.allprices()
				// 是否全部选中
				let allSelected = this.purchlist.every(item => item.checked === true);
				if (allSelected)
					this.allnumber = true;
				else
					this.allnumber = false;
    },
    Allpurch(val){
      this.allnumber = !this.allnumber
      
      if(val){
        this.purchlist.map(item => item.checked = this.allnumber);
        this.allprices()
      }else{
        this.purchlist.map(item => item.checked = this.allnumber);
        this.allprices()
      }
    },
    ReplenishOrder() {
      uni
        .$request({
          url: queryReplenishOrder,
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
          method: "POST",
        })
        .then((res) => {
          console.log(res);
          this.purchlist = res.dataObj.list
        });
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()["statusBarHeight"];
    let userId = uni.getStorageSync("dataObj");
    this.saastoken = userId.ticketTokenid;
    this.ReplenishOrder();
    console.log(scc);
    this.purchlist.forEach(el=>{
      return el.checked = false
    })
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
};
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}
.Purchase {
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
  }
  .purch_list {
    background: #fff;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    width: 100%;
    .purch_addres {
      width: 95%;
      background: #f8f8f8;
      margin: 10px auto;
      border-radius: 10px;
      height: 60px;

      .purch-labal {
        float: left;
        width: 7%;
        margin-left: 10px;
        line-height: 90px;
        .u-checkbox {
          padding-top: 20px;
        }
      }
      .addres-li {
        width: 90%;
        // background: #e0251b;
        margin: auto;
        font-size: 12px;
        .u-icon {
          width: 5%;
          float: left;
          padding-top: 3px;
        }
      }
      .adr {
        padding-top: 12px;
        text {
          font-size: 13px;
        }
      }
    }
    .purch-item {
      height: 90px;
      width: 95%;
      margin: auto;
      // background: #cccccc;
      position: relative;
      image {
        margin-top: 5px;
        float: left;
      }
      .item-ner {
        margin: 5px 0 5px 10px;
        width: 70%;
        float: left;
        .item-title {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
          width: 50%;
        }
        .item-kucun {
          // float: left;
          display: block;
          text {
            color: #999999;
            width: 30%;
            height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            float: left;
            font-size: 12px;
          }
        }
        .money {
          margin-top: 20px;
          color: #e0251b;
          float: left;
          width: 50%;
        }
        .numberbox{
          .delet {
            position: absolute;
            bottom: 10px;
            right: 7px;
            width: 20px;
            height: 20px;
            display: inline-block;
            float: right;
            background: #e0251b;
            border-radius: 100%;
            line-height: 20px;
            text-align: center;
          }
        }
      }
    }
  }

  .settlement {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
    width: 100%;
    background: #fff;
    height: 50px;
    position: fixed;
    bottom: 0;
    z-index: 777;
    .settle-labal {
      width: 17%;
      margin-left: 10px;
      margin-top: 15px;
      float: left;
    }
    .settle-price {
      margin-top: 5px;
      text-align: right;
      width: 36%;
      float: left;
      height: 45px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .yunfei {
        width: 100%;
        text {
          font-size: 9px;
          padding-left: 5px;
          color: #999999;
        }
      }
    }
    .order:last-child {
      background: #fff;
      border: 1px solid #e0251b;
      color: #e0251b;
    }
    .order {
      width: 20%;
      height: 35px;
      border-radius: 20px;
      background: #e0251b;
      float: right;
      font-size: 14px;
      line-height: 35px;
      text-align: center;
      margin-top: 7.5px;
      margin-right: 1.5%;
      color: #fff;
    }
  }
}
</style>