<template>
  <view class="cart">
    <!-- 内容 -->
    <view class="content">
      <view class="navBarBox">
        <view
          class="statusBar"
          style="background: #fff"
          :style="{ paddingTop: statusBarHeight + 'px' }"
        ></view>
        <!-- 真正的导航栏内容 -->
        <view class="navBar">
          <text>进货单</text>
          <text>下单</text>
          <text @click="navTo">进货单</text>
        </view>
      </view>
    </view>
    <view :style="{ paddingTop: statusBarHeight + 'px' }" style="margin-top:140rpx;">
      <view class="adress">
        <view class="adress-item">
          <text>收货人</text>
          <view class="adress-input" >
            <input type="text"  placeholder="请输入收货人" v-model="addressname" class="input" />
          </view>
        </view>
        <view class="adress-item">
          <text>手机号码</text>
          <view class="adress-input" >
            <input type="number" maxlength="11" placeholder="请输入手机号码" v-model="addressnumber" class="input" />
          </view>
        </view>
        <view class="adress-item">
          <text>所在地区</text>
          <view class="adress-input" @click="regionVisible = true"
            ><text v-if="result.result == ''" style="font-size: 13px;width: 80%;color: #ccc;margin-left: 10px;margin-top: 6px;">请选择市区</text>
            <text v-else style="font-size: 13px;width: 80%;margin-left: 10px;margin-top: 6px;">{{ result.result }}</text>
            <view
              class=""
              style="float: right; padding-right: 5px; padding-top: 5px"
              v-if="result.result == ''"
            >
              <u-icon name="arrow-down" size="14px" color="#BBBBBB"></u-icon>
            </view>
          </view>
        </view>
        <view class="adress-item">
          <text>详细地址</text>
          <u--textarea
          @blur="address"
          v-model="addressxi"
            border="none"
            height="30px"
            placeholder="请输入详情地址"
            size="12px"
          ></u--textarea>
        </view>
      </view>

      <view class="fenlei">
        <view class="name1">
					<view class="saa">
						<text class="saa-text">商品名称</text>
						<input @input="onName" style="font-size:12px" class="ins" type="text">
					</view>
					<view class="saa">
						<text class="saa-text">商品编号</text>
						<input class="ins" style="font-size:12px" @input="onCode" type="text">
					</view>
				</view>
        <view class="name1" style="padding-top: 35px">
          <view class="saa">
            <text class="saa-text">商品分类</text>

            <view class="ins" type="text">
              <picker
                class="pickerList"
                mode="multiSelector"
                :range="newCategotyDataList"
                :value="multiIndex"
                range-key="classtreeName"
                @change="bindPickerChange"
                @columnchange="pickerColumnchange"
              >
                <view
                  class=""
                  style="
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  "
                >
                  {{ select
                  }}<text
                    v-if="select == ''"
                    style="width: 80%; text-align: right; height: 20px"
                  ></text>
                </view>
              </picker>
              <view class="" style="float: right;" v-if="select == ''">
								<u-icon name="arrow-down" color="#e3dcdc"></u-icon>
							</view>
							<view class="dele" style="float: right;" v-else  @click="fenleidele">
								<u-icon name="close-circle" color="#e3dcdc"></u-icon>
							</view>
            </view>
          </view>
          <view class="saa">
            <text class="saa-text">供货渠道</text>
            <view class="ins ina">
              <text style="width: 80%; height: 20px" @click="ssw = true">{{
                qudao
              }}</text>
              <view class="" style="float: right" v-if="qudao == ''">
                <u-icon name="arrow-down" color="#e3dcdc"></u-icon>
              </view>
              <view
                class="dele"
                style="float: right"
                v-else
                @click="this.qudao = ''"
              >
                <u-icon name="close-circle" color="#e3dcdc"></u-icon>
              </view>
            </view>
          </view>
        </view>
    </view>

      <view class="shaixuan">
        <view class="shai-item" @click="zonghe">
          <text :class="[num == 1 ? 'red' : '']">综合</text>
        </view>
        <view class="shai-item" @click="xiaoliang">
          <text :class="[num == 2 || num == 3 ? 'red' : '']">销量</text>
          <view class="sx">
            <u-icon
              name="arrow-up-fill"
              :color="[num == 2 ? '#E0251B' : '#D6D6D6']"
              size="6"
            ></u-icon>
            <u-icon
              name="arrow-down-fill"
              :color="[num == 3 ? '#E0251B' : '#D6D6D6']"
              size="6"
            ></u-icon>
          </view>
        </view>
        <view class="shai-item" @click="jiage">
          <text :class="[num == 4 || num == 5 ? 'red' : '']">价格</text>
          <view class="sx">
            <u-icon
              name="arrow-up-fill"
              :color="[num == 4 ? '#E0251B' : '#D6D6D6']"
              size="6"
            ></u-icon>
            <u-icon
              name="arrow-down-fill"
              :color="[num == 5 ? '#E0251B' : '#D6D6D6']"
              size="6"
            ></u-icon>
          </view>
        </view>
      </view>
    </view>
	<view class="cart_list">
    <u-checkbox-group placement="column" v-model="checkboxValue1">
		<view class="cart-item" v-for="(item,index) in cartlist" :key="index">
			<view class="cart-labal">
        <!-- <label class="radio" @click="cartCheck(index)"><radio style="transform:scale(0.7)" value="r1" :checked="item.checked" color="#e0251b"/></label> -->
          <u-checkbox @change="cartchecked(index)" :disabled="item.disabled" :checked="item.checked" activeColor="#e0251b" shape="circle"></u-checkbox>

      </view>
			<image
				:src="item.dataPic"
				mode=""
				style="width:80px;height:80px;border-radius: 5px;"
			/>
			<view class="item-ner">
				<text class="item-title">{{item.goodsName}}</text>
				<view class="item-kucun">
					<text>库存：{{item.goodsNum}}</text>
					<text>运费：￥6</text>
				</view>
				<view class="money">
					<text>￥{{item.pricesetAsprice}}</text>
				</view>
				<view class="numberbox" style="width:50%;float:left;margin-top: 13px;">
					<uni-number-box @change="goodsnum(index)" :max="item.goodsNum" v-model="item.goodsnums" />
				</view>
			</view>
		</view>
  </u-checkbox-group>
      <view class="dixian">
        {{ jiazai }}
      </view>
	</view>

	<view class="settlement">
		<view class="settle-labal" >
      <u-checkbox-group>
          <u-checkbox @change="Allcart" :disabled="alldis"  :checked="allnumber" activeColor="#e0251b" shape="circle"></u-checkbox>全选
      </u-checkbox-group>
    </view>
		<view class="settle-price">
			<text style="font-size:12px;">总合计:<text style="color:#e0251b;font-size: 18px;">￥{{Allprice}}</text></text>
			<view class="yunfei">
				<text>商品合计:￥900</text>
				<text>运费合计:￥100</text>
			</view>
		</view>

		<view class="order" @click="buynow">立即订购</view>
		<view class="order" @click="addOrder">加入进货单</view>
	</view>

    <w-picker
      :visible.sync="regionVisible"
      mode="region"
      :value="defaultRegion"
      default-type="value"
      :hide-area="false"
      @confirm="onConfirm($event, 'region')"
      @cancel="onCancel"
      ref="region"
    ></w-picker>
    <u-picker :show="ssw" :columns="gongying" @confirm="abb"></u-picker>
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
              <button class="mini-btn" type="warn" size="mini" @click="navTo('/subPages/wode/online')">去充值</button>
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
              <button class="mini-btn" type="warn" size="mini" @click="navTo('/subPages/wode/realNameAuthentication')">去认证</button>
            </view>
        </view>
		</u-popup>
  </view>
</template>
<script>
import {
  commercialFind
  , saveAddress,
  addShopping,
  deleteShopping,
  queryShopping,
  addReplenishOrder,
  updateShopping,
  calculateFreight,
  queryAccountOuterByUser,
  saveContract} from '@/api/interface'
import wPicker from "../../components/w-picker/w-picker.vue";
import Fly from 'flyio/dist/npm/wx';
import qs from 'qs';
import list from '../../uni_modules/uview-ui/libs/config/props/list';
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
      qucode: "", //供货渠道
      jiazai:'加载中',

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

      total: 0,
      page: 1,
      searchParam:'',//商品名称
      skuNo:'',//商品编号

      regionVisible: false,
      //所在地区
      result: {
        result: "",
      },
      defaultRegion: [],
      //选品库数据
      cartlist: [],
      addressname: '',//收货人
      addressnumber: '',//手机号码
      addressxi: '',//详细地址
      dataObj: '',
      allnumber: false,//全选
      alldis:true,
      Allprice:0,//商品总价
      freight:0,//运费
      Allprices:0,//综合价格

      //结算
      priceshow:false,
      //支付toset
      priceshowA:1,
      shoplist:[],
      purchlist:[],


      //结算传参
      orderDomainStr: [
      {
        contractProperty: '0',
        contractTypepro: '0',
        contractBlance: '0',
        contractPmode: '0',
        contractPumode: '0',
        goodsSupplierName: '',
        goodsSupplierCode: '',
        packageList: [
          {
            contractGoodsList: [],
            packageRemark: null,
            contractPumode: null,
            shoppingGoodsIdList: []
          }
        ],
        packageMode: '',
        ocContractSettlList: [
          {
            contractSettlType: '0',
            contractSettlBlance: 'VD',
            contractPmode: '0',
            contractSettlOpno: '01',
            contractSettlPmoney: '0',
            contractSettlGmoney: '0'
          }
        ],
        contractType: '00',
        contractInmoney: '',
        contractMoney: '',
        goodsReceiptMem: '',
        goodsReceiptArrdess: '',
        goodsReceiptPhone: '',
        areaCode: '',
        contractNbillcode: null
      }
    ],
    shoppingGoodsIdList:[]
    };
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
  //上拉刷新
  onReachBottom() {
				if(this.cartlist.length>=this.total){
          return
        }else{
          this.page++
          this.commercialFind()
          let allSelected = this.cartlist.every(item => item.checked === true);
          if (allSelected){
            this.allnumber = true;
          }else{
            this.allnumber = false;
          }

        //   uni.showLoading({
				// 	title: '加载中'
				// });
				// setTimeout(function () {
				// 	uni.hideLoading();
				// }, 1000)
        }
		},
  components: {
    wPicker,
  },
  //第一次加载时调用
  onLoad() {
    //获取手机状态栏高度
    this.statusBarHeight = uni.getSystemInfoSync()["statusBarHeight"];
    let userId = uni.getStorageSync("dataObj");
    this.saastoken = userId.ticketTokenid;
    console.log(this.saastoken);
    this.queryClass();
  },
  onShow() {
    this.cartlist = []
    this.result.result = ''
    this.defaultRegion = [],
    this.addressname='',//收货人
    this.addressnumber='',//手机号码
    this.addressxi='',//详细地址
    this.dataObj='',
    this.page = 1,
    this.commercialFind()
    this.allnumber = false
    for (let i = 0; i < this.cartlist.length; i++) {
      this.cartlist[i].disabled = false
    }
  },
  methods: {
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

          uni.showToast({
            title:'下单成功'
          })

          uni.redirectTo({
            url: '/pages/cart/cart'
          });

        }

    },
    //调取运费
    buynow(){
      this.purchlist = []
      if(this.dataObj == ''){
        uni.showToast({
          icon:'error',
          title:'收货地址异常'
        })
      }else if(this.Allprice == 0){
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
          data: qs.stringify({ memberBcode:this.dataObj, paramStr: JSON.stringify(this.purchlist) })
        }).then(res=>{
          console.log(res);
          this.freight = res.dataObj
        })
        this.Allprices = this.Allprice + this.freight
      }
    },
    close() {
      this.priceshow = false
    },
    navTo(item){
      uni.navigateTo({ url: item })
    },
    //加入进货单
    addOrder() {
      let memberBcode = this.dataObj
      if (memberBcode) {
        uni.$request({
          url:addReplenishOrder,
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
          data: {memberBcode}
        }).then(res=>{
          console.log(res);
        })
      } else {
        uni.showToast({
          icon: 'error',
          title: '收货地址异常'
        })
      }
    },
    //总价
    Totalprice() {
      var sum = 0
      this.cartlist.forEach(el => {
        if (el.checked == true) {
          sum += el.pricesetAsprice * el.goodsnums
        }
      })
      this.Allprice = sum
    },
    //添加地址
    address() {
      let userId = uni.getStorageSync("dataObj");
      let userCode = userId.userCode
      let userInfoCode = userId.userInfoCode
      uni.$request({
          url:saveAddress,
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
          data: { userCode,
        addressMember:this.addressname,
        addressPhone:this.addressnumber,
        provinceCode:this.defaultRegion[0],
        provinceName:this.result.obj.province.label,
        areaCode:this.defaultRegion[1],
        areaName:this.result.obj.city.label,
        cityCode:this.defaultRegion[2],
        cityName:this.result.obj.area.label,
        addressDetail:this.addressxi,
        addressDefault:0,
        memberBcode:userInfoCode
          }
        }).then(res=>{
          console.log(res);
          this.dataObj = res.dataObj
          console.log(this.dataObj);
          this.page = 1
          this.cartlist = []
          this.orderDomainStr = [
      {
        contractProperty: '0',
        contractTypepro: '0',
        contractBlance: '0',
        contractPmode: '0',
        contractPumode: '0',
        goodsSupplierName: '',
        goodsSupplierCode: '',
        packageList: [
          {
            contractGoodsList: [],
            packageRemark: null,
            contractPumode: null,
            shoppingGoodsIdList: []
          }
        ],
        packageMode: '',
        ocContractSettlList: [
          {
            contractSettlType: '0',
            contractSettlBlance: 'VD',
            contractPmode: '0',
            contractSettlOpno: '01',
            contractSettlPmoney: '0',
            contractSettlGmoney: '0'
          }
        ],
        contractType: '00',
        contractInmoney: '',
        contractMoney: '',
        goodsReceiptMem: '',
        goodsReceiptArrdess: '',
        goodsReceiptPhone: '',
        areaCode: '',
        contractNbillcode: null
      }
    ],
          this.commercialFind()
          this.alldis = false
        })
    },
    //添加数量
    goodsnum(index) {
      console.log(index);
      let memberBcode = this.dataObj
      if(this.cartlist[index].checked == true){
      let skuCode = this.cartlist[index].skuCode
      console.log(this.cartlist[index].goodsnums);
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
          data: { skuCode,amount:this.cartlist[index].goodsnums,goodWeight:this.cartlist[index].goodsNum,
            memberBcode
          }
        }).then(res => {
          console.log(res);
          this.Totalprice()
        })
      } else if (memberBcode == '') {
        uni.showToast({
          icon: 'error',
          title: '收货地址异常'
        })
      } else {
        uni.showToast({
          icon: 'error',
          title: '请勾选该商品'
        })
      }
    },
    //单选商品
    cartchecked(index) {
      let memberBcode = this.dataObj
      let goodsBeanStr = []
      let goodsku = {}
      let skuId = this.cartlist[index].skuId
      let skuCode = this.cartlist[index].skuCode
      let goodsNum = this.cartlist[index].goodsnums
      goodsku.skuId = skuId
      goodsku.goodsNum = goodsNum
      goodsBeanStr.push(goodsku)
      if (this.cartlist[index].checked == false && memberBcode != '') {
        console.log(this.cartlist[index].checked);
        uni.$request({
          url:addShopping,
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
          data: qs.stringify({ memberBcode, goodsBeanStr: JSON.stringify(goodsBeanStr) })
        }).then(res => {
          console.log(res);
          this.cartlist[index].checked = !this.cartlist[index].checked
          this.queryshop()
          this.Totalprice()
          // let allSelected = this.cartlist.every(item => item.checked === true);
          // if (allSelected){
          //   this.allnumber = true;
          // }else{
          //   this.allnumber = false;
          // }
        })
      } else if (this.cartlist[index].checked == true && memberBcode != '') {

        console.log(this.cartlist[index].checked);
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
          data: qs.stringify({ memberBcode, skuCode })
        }).then(res => {
          console.log(res);
          this.cartlist[index].checked = !this.cartlist[index].checked
          console.log(res);
          this.queryshop()
          this.Totalprice()
          // let allSelected = this.cartlist.every(item => item.checked === true);
          // if (allSelected){
          //   this.allnumber = true;
          // }else{
          //   this.allnumber = false;
          // }
        })
      } else {
        this.cartlist[index].checked = false
        uni.showToast({
          icon: 'error',
          title: '收货地址异常'
        })
      }
    },
    queryshop() {
      let memberBcode = this.dataObj
      uni.$request({
          url:queryShopping,
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
          data:{memberBcode}
        }).then(res=>{
          console.log(res);
          this.shoplist = res.list[0].shoppingpackageList[0]
          this.Totalprice()
        })
    },
    //全选商品
    Allcart(val) {
      this.allnumber = !this.allnumber
      let memberBcode = this.dataObj

      console.log(val);
      if(val && memberBcode != ''){
        for(var i=0;i<this.cartlist.length;i++){
        let goodsBeanStr =[]
        let goodsku = {}
        let skuId = this.cartlist[i].skuId
        let skuCode = this.cartlist[i].skuCode
        let goodsNum = this.cartlist[i].goodsnums
        goodsku.skuId = skuId
        goodsku.goodsNum = goodsNum
        goodsBeanStr.push(goodsku)
          uni.$request({
          url:addShopping,
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
          data: qs.stringify({ memberBcode, goodsBeanStr: JSON.stringify(goodsBeanStr) })
        }).then(res=>{
          console.log(res);
          this.queryshop()
        })
        }
        this.cartlist.map(item => item.checked = this.allnumber);
      }else if(!val && memberBcode != ''){
        for(var i=0;i<this.cartlist.length;i++){
          let goodsBeanStr =[]
          let goodsku = {}
          let skuId = this.cartlist[i].skuId
          let skuCode = this.cartlist[i].skuCode
          let goodsNum = this.cartlist[i].goodsnums
          goodsku.skuId = skuId
          goodsku.goodsNum = goodsNum
          goodsBeanStr.push(goodsku)
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
          data: qs.stringify({ memberBcode, skuCode })
        }).then(res=>{
          console.log(res);
          this.cartlist[i].checked = !this.cartlist[i].checked
          console.log(res);
          this.queryshop()
        })
        }
        this.cartlist.map(item => item.checked = this.allnumber);

      } else {
        uni.showToast({
          icon: 'error',
          title: '收货地址异常'
        })
      }
    },
    //商品列表
	commercialFind(){
		uni.$request({
          url:commercialFind,
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
          data: qs.stringify({ page:this.page, rows:15,searchParam:this.searchParam,skuNo:this.skuNo })
		}).then(res=>{
			this.cartlist = [...this.cartlist , ...res.list]
      this.cartlist.forEach(item =>{
        item.goodsnums = 1
        item.checked = false
      })
      if(this.dataObj){
        for (let i = 0; i < this.cartlist.length; i++) {
            this.cartlist[i].disabled = false
          }
        } else {
          for (let i = 0; i < this.cartlist.length; i++) {
            this.cartlist[i].disabled = true
          }
      }
      console.log(res);
      this.total = res.total
		})

	},
	//选择地址
    onConfirm(res) {
      this.result = res;
      console.log(this.result.obj.area.label);
      this.defaultRegion = res.value
    },
    onCancel() { },
    //价格排序
    Priceup(){
    	this.bubblesSort(this.cartlist)
    },
    Pricedown(){
    	this.bubbleSort(this.cartlist)
    },
    bubbleSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {//代表第几轮比较
        for (let j = 0; j < arr.length - 1 - i; j++) {//每一轮的两两相邻元素比较
          if (arr[j].pricesetAsprice > arr[j + 1].pricesetAsprice) {//相邻元素比较
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]//满足条件，交换位置
          }
        }
      }
      return arr
    },
    bubblesSort(arr) {
      for (let i = 0; i < arr.length - 1; i++) {//代表第几轮比较
        for (let j = 0; j < arr.length - 1 - i; j++) {//每一轮的两两相邻元素比较
          if (arr[j].pricesetAsprice < arr[j + 1].pricesetAsprice) {//相邻元素比较
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]//满足条件，交换位置
          }
        }
      }
      return arr
    },
    fenleidele() {
      this.select = "";
      this.classtreeName = "";
    },
    //搜索名称
    onName(event) {
      this.searchParam = event.target.value;
      this.cartlist = []
      this.page = 1
      this.commercialFind();
    },
    //搜索编号
    onCode(event) {
      this.skuNo = event.target.value;
      this.cartlist = []
      this.page = 1
      this.commercialFind();
    },
    //综合按钮
    zonghe() {
      this.num = 1;
      this.cartlist = []
      this.page = 1
      this.commercialFind();
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
    		this.num = 5
    		this.Pricedown()

    	} else {
    		this.num = 4
    		this.Priceup()
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
    //商品分类请求
    queryClass() {
      // https://cscommercial.saas.qianjiangcloud.cn/web/rs/classtree/queryClasstree.json
      uni.request({
        url: "https://csweapp.saas.qianjiangcloud.cn/web/rs/classtree/queryClasstree.json",
        method: "GET",
        header: {
          'Accept': "application/json, text/plain, */*" /**/,
          "Accept-Language": "zh-CN,zh;q=0.9",
          'Connection': "keep-alive",
          // 'Referer':
          //   "https://cscommercial.saas.qianjiangcloud.cn/paas/cs-cli-pc/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          // "User-Agent":
          //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
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

.cart {
  .navBar {
    height: 110rpx;
    background: #fff;

    text:first-child {
      font-size: 12px;
      color: #fff;
    }
    text:nth-child(2) {
      font-size: 18px;
      font-weight: 600;
    }
    text:last-child {
      font-size: 12px;
      color: #e0251b;
    }
  }

  .navBarBox .navBar {
    padding: 3rpx 50rpx;
    padding-bottom: 20rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .navBarBox .navBar .logo {
    width: 82rpx;
    height: 82rpx;
    margin-right: 10rpx;
  }

  .content {
    width: 100%;
    background: #f8f8f8;
    // padding-bottom: 10px;
    position: fixed;
    top: 0;
    z-index: 777;



  }
  .adress {
      height: 210px;
      width: 95%;
      border-radius: 10px;
      background: #fff;
      margin: auto;
      margin-top: 10px;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
      .adress-item {
        height: 40px;
        width: 90%;
        margin: auto;
        justify-content: left;
        box-sizing: border-box;
        margin-top: 5px;
        padding-top: 10px;
        .u-textarea {
          background-color: #f8f8f8;
        }
        text {
          width: 30%;
          display: inline-block;
          float: left;
          margin-top: 3px;
          font-size: 14px;
        }
        .adress-input {
          height: 30px;
          background-color: #f8f8f8;
          border-radius: 5px;
          width: 70%;
          display: inline-block;
          .input{
            height: 20px;
            width: 90%;
            margin-top: 4px;
            font-size: 13px;
            margin-left: 10px;
          }
        }
      }
    }

    .fenlei {
      width: 95%;
      margin: auto;
      margin-top: 10px;
      height: 56px;
      // background: #fff;
      // height: 50px;

      .name1 {
        .saa {
						display: inline-block;
						width: 48%;
						height: 26px;
						margin-left: 2%;
						float:left;
						.saa-text {
							float: left;
							font-size: 14px;
							line-height: 26px;
							font-family: PingFangSC-Regular;
						}

						.ins {
							box-sizing: border-box;
							width: 62%;
              background: #fff;
							height: 24px;
							margin-left: 5px;

							display: inline-block;
							border: 1px solid #DFDFDF;
            // position: relative;W
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
  .cart_list{
	background: #fff;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
	border-radius: 10px;
  width: 100%;
		.cart-item:first-child{
			padding-top: 12px;
		}
		.cart-item{
			height: 90px;
			width: 95%;
			margin: auto;
			// background: #cccccc;
			.cart-labal{
				float: left;
				height: 90px;
				width: 10%;
				line-height: 90px;
				.u-checkbox{
          padding-top: 35px;
        }
			}

			image{
				margin-top: 5px;
				float: left;
			}
			.item-ner{
				margin: 5px 0 5px 10px;
				width: 60%;
				float: left;
				.item-title{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						display: block;
						width: 50%;
					}
				.item-kucun{
					// float: left;
					display: block;
					text{
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
				.money{
					margin-top: 20px;
					color: #e0251b;
					float: left;
					width: 50%;
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
	.settlement{
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.05);
		width: 100%;
		background: #fff;
		height: 50px;
		position: fixed;
		bottom: 0;
		z-index: 777;
		.settle-labal{
			width: 17%;
			margin-left: 10px;
			margin-top: 15px;
			float: left;
		}
		.settle-price{
			margin-top: 5px;
			text-align: right;
			width: 36%;
			float: left;
			height: 45px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.yunfei{
				width: 100%;
				text{
					font-size: 9px;
					padding-left: 5px;
					color: #999999;
				}
			}
		}
		.order:last-child{
			background: #fff;
			border: 1px solid #e0251b;
			color: #e0251b;
		}
		.order{
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
  .u-picker {
    z-index: 777;
  }

  .pop{
    .pop-top{
      padding-top: 20px;
      width: 300px;
      margin: auto;
      text{
        font-size: 16px;
        color: #3F3F3F;
        font-weight: 600;
      }
      .u-icon{
        width: 20px;
        float: right;
      }
    }
    .pop-price{
      width: 80%;
      margin: auto;
      margin-top: 20px;
      .pop-title{
        color: #606266;
        font-size: 14px;
      }
      .pop-pce{
        float: right;
        font-size: 10px;
        color: #333333;
      }
      .pop-pcered{
        color: #e0251b;

      }
    }
    .pop-aniu{
      padding-top: 20px;
      width: 80%;
      margin: auto;
      .mini-btn{
        width: 45%;
        // height: 40px;
        display: inline-block;
        border-radius: 20px;
      }
      .mini-btn:last-child{
        float: right;

      }
    }
  }
  .pop-A{
    .popa-img{
      width: 100%;
      height: 50px;
      margin-top: 38px;
      text-align: center;
    }
    .popa-title{
      width: 50%;
      margin: auto;
      margin-top: 23px;
      display: flex;
      text{
        font-size: 15px;
        text-align: center;
      }
    }
    .pop-aniu{
      padding-top: 20px;
      width: 80%;
      margin: auto;
      .mini-btn{
        width: 45%;
        // height: 40px;
        display: inline-block;
        border-radius: 20px;
      }
      .mini-btn:last-child{
        float: right;

      }
    }
  }
}
</style>
