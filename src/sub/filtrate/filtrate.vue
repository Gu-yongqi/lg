<template>

  <view class="appUpdateMask">
    <!-- 占位 -->
    <view class="solidBox" @click="closePopop"></view>
    <view
      class="popopBox"
      :style="{'padding-top': menuBtnBottom + 'px'}"
    >
      <view class="filtrate-container">

        <view class="filtrateBox">

          <view class="filtrate-item">
            <view class="filtrate-title">供应渠道</view>
            <view class="filtrate-classify">
              <view
                class="filtrate-text"
                v-for="(item, index) in memberList"
                :key="item.memberCcode"
                @click="memberFiltrate(item, index)"
                :class="{'activeText': activeMember === index }"
              >{{item.memberCname}}</view>
            </view>
          </view>

          <view class="filtrate-item">
            <view class="filtrate-title">分类</view>
            <view class="filtrate-classify">
              <view
                v-for="(item, index) in classtreeList"
                :key="item.classtreeCode"
                class="filtrate-text"
               @click="classifyFiltrate(item, index)"
               :class="{'activeText': activeClassify === index }"
              >{{ item. classtreeName}}</view>
            </view>
          </view>

          <view class="filtrate-item">
            <view class="filtrate-title brandTitle">
              <view class="mainTitle">品牌</view>

              <!-- <view class="more" @click="allBrand">
                <text>{{moreBrandActive ? '收起' : '全部'}}</text>
                <uni-icons
                  type="bottom"
                  size="16"
                  color="rgba(153, 153, 153, 1)"
                  v-if="!moreBrandActive"
                ></uni-icons>
                <uni-icons
                  type="top"
                  size="16"
                  color="rgba(153, 153, 153, 1)"
                  v-else
                ></uni-icons>
              </view> -->

            </view>
            <view class="filtrate-classify">
              <view
                class="filtrate-text"
                v-for="(item, index) in brandList"
                :key="item.brandCode"
                :class="{'activeText': activeBrand === index }"
                @click="brandFiltrate(item, index)"
              >{{item.brandName}}</view>
            </view>
          </view>

          <view class="filtrate-item">
            <view class="filtrate-title">价格区间</view>
            <view class="priceFiltrate">
              <view class="priceInput">
                <input
                  type="number"
                  placeholder="最低价"
                  v-model.number="params.minPrice"
                  @blur="minPriceBlur"
                >
              </view>
              <view class="cutLine">-</view>
              <view class="priceInput">
                <input
                  type="number"
                  placeholder="最高价"
                  v-model.number="params.maxPrice"
                  @blur="maxPriceBlur"
                >
              </view>
            </view>
          </view>

        </view>


        <view class="footer-container">
          <button class="reset bottom-btn" @click="reset">重置</button>
          <button class="submit bottom-btn" @click="submit">确定</button>
        </view>

      </view>

    </view>
	</view>

</template>

<script>
import { queryBrandPageForC, queryClasstree, searchengine } from '@/api/interface'
import { mapMutations, mapGetters } from 'vuex'
export default {

  onLoad(){
    /* 获取系统信息 */
    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息
    let custom = wx.getMenuButtonBoundingClientRect()
    this.menuBtnBottom = custom.bottom + 10

    // 获取所有的供应去渠道、品牌、货主数据
    this.getFiltrateList()

    // 查询品牌-接口返回数据不对
    // this.queryBrandPageForCFn()
    // 查询分类-接口返回数据不对
    // this.queryClasstreeFn()
  },

  data(){
    return {
      /* 分类 */
      classtreeList: [],
      classtreeTotal: 0, 
      /* 供应渠道 */
      memberList: [],

      /* 点击项筛选 */
      activeMember: '', // 点击供应渠道
      activeClassify: '', // 点击分类
      activeBrand: '', // 点击品牌

      /* 筛选分类数据 */
      brandList: [], // 品牌数据
      total: 0, // 所有品牌长度
      brandParams: { // 获取品牌需要的参数
        rows: '15',
        page: '1'
      },
      moreBrandActive: false, // 是否点击了更多品牌的按钮

      /* 筛选参数 */
      params:{
        sortField: '',
        order: 'desc', // 价格：升序asc，降序desc
        page: 1,
        searchType: 'match_phrase',
        searchParam: '',
        groupList: 'brandName,brandCode,memberCcode,memberCname,classtreeCode,classtreeName',
        groupNum: 'pricesetNprice',
        minPrice: '', //  最低价
        maxPrice: '', // 最高价
        goodsClass: 'plat',
        // memberCcode: '', // 供应渠道
        // classtreeCode: '', // 分类
      },
      showPopop: true, // 弹出层的显示与隐藏

      /* 获取系统信息 */
      menuBtnBottom: 0, //胶囊按钮底部到顶部距离
      screenHeight: 0, // 屏幕高度
    }
  },

  computed: {
    ...mapGetters('filtrate', ['redirectParams'])
  },

  methods: {
    ...mapMutations('filtrate', ['setFiltrateParams']),

    /* 获取所有的供应去渠道、品牌、货主数据 */
    async getFiltrateList(){
      const res = await uni.$request({
        url: searchengine,
        data: {
          sortField: '',
          order: 'desc', // 价格：升序asc，降序desc
          page: 1,
          searchType: 'match_phrase',
          searchParam: '',
          groupList: 'brandName,brandCode,memberCcode,memberCname,classtreeCode,classtreeName',
          groupNum: 'pricesetNprice',
          // minPrice: '',
          // maxPrice: '',
          goodsClass: 'plat'
        }
      })
      const totalObj = res.pageTools.sumMap

      // 供应渠道
      const memberList = []
      totalObj.memberCname.buckets.forEach((name, nindex) => {
        totalObj.memberCcode.buckets.forEach((code, cindex) => {
          if(nindex === cindex){
            memberList.push({
              memberCname: name.key,
              memberCcode: code.key,
            })
          }
        })
      })
      this.memberList = memberList
      // 分类
      const classtreeList = []
      totalObj.classtreeName.buckets.forEach((name, nindex) => {
        totalObj.classtreeCode.buckets.forEach((code, cindex) => {
          if(nindex === cindex){
            classtreeList.push({
              classtreeName: name.key,
              classtreeCode: code.key,
            })
          }
        })
      })
      this.classtreeList = classtreeList
      // 品牌
      const brandList = []
      totalObj.brandName.buckets.forEach((name, nindex) => {
        totalObj.brandCode.buckets.forEach((code, cindex) => {
          if(nindex === cindex){
            brandList.push({
              brandName: name.key,
              brandCode: code.key,
            })
          }
        })
      })
      this.brandList = brandList.filter(item => item.brandName)

    },

    /* 关闭 */
    closePopop(){
      const params = {
        sortField: '',
        order: 'desc', // 价格：升序asc，降序desc
        page: 1,
        searchType: 'match_phrase',
        searchParam: '',
        groupList: 'brandName,brandCode,memberCcode,memberCname,classtreeCode,classtreeName',
        groupNum: 'pricesetNprice',
        minPrice: '',
        maxPrice: '',
        goodsClass: 'plat'
      }
      this.setFiltrateParams(params)

      if(this.redirectParams.openType === 'switchTab'){
        uni.switchTab({
          url: this.redirectParams.url // 跳转首页
        })
      }else if(this.redirectParams.openType === 'navigateTo'){
        // const filtrateParams = JSON.stringify(this.params)
        uni.navigateTo({
          // url: `${this.redirectParams.url}?type=filtrate&filtrateParams=${filtrateParams}` // 跳转搜索结果页
          url: `${this.redirectParams.url}?type=filtrateClose` // 跳转搜索结果页
        })
      }
    },

    /* 提交 */
    submit(){

      // 清空参数的空字符串字段
      if(this.params.classtreeCode === ''){
        delete this.params.classtreeCode
      }else if(this.params.memberCcode === ''){
        delete this.params.memberCcode
      }else if(this.params.minPrice === ''){
        delete this.params.minPrice
      }else if(this.params.maxPrice === ''){
        delete this.params.maxPrice
      }else if(this.params.brandCode === ''){
        delete this.params.brandCode
      }

      this.setFiltrateParams(this.params)

      if(this.redirectParams.openType === 'switchTab'){
        uni.switchTab({
          url: this.redirectParams.url // 跳转首页
        })
      }else if(this.redirectParams.openType === 'navigateTo'){
        const filtrateParams = JSON.stringify(this.params)
        uni.navigateTo({
          url: `${this.redirectParams.url}?type=filtrate&filtrateParams=${filtrateParams}` // 跳转搜索结果页
        })
      }

    },

    /* 重置 */
    reset(){
      this.activeMember = '' // 点击供应渠道
      this.activeClassify = '' // 点击分类
      this.activeBrand = '' // 点击品牌(品牌功能参数未定)

      this.params = {
        sortField: '',
        order: 'desc', // 价格：升序asc，降序desc
        page: 1,
        searchType: 'match_phrase',
        searchParam: '',
        groupList: 'brandName,brandCode,memberCcode,memberCname,classtreeCode,classtreeName',
        groupNum: 'pricesetNprice',
        minPrice: '', //  最低价
        maxPrice: '', // 最高价
        goodsClass: 'plat',
        // memberCcode: '', // 供应渠道
        // classtreeCode: '', // 分类
      }

      // console.log('重置this.params', this.params);

      this.setFiltrateParams(this.params)
    },

    /* 点击筛选供应商渠道 */
    memberFiltrate(item, index){
      if(this.activeMember === '' || this.activeMember != index){
        this.activeMember = index
      }else{
        this.activeMember = ''
      }
      if(this.activeMember !== ''){
        this.params.memberCcode = item.memberCcode
      }else{
        delete this.params.memberCcode
      }

    },
    /* 点击筛选分类 */
    classifyFiltrate(item, index){
      if(this.activeClassify === '' || this.activeClassify != index){
        this.activeClassify = index
      }else{
        this.activeClassify = ''
      }
      if(this.activeClassify !== ''){
        this.params.classtreeCode = item.classtreeCode
      }else{
        delete this.params.classtreeCode
      }
    },
    /* 点击筛选品牌 */
    brandFiltrate(brandItem, brandIndex){
      if(this.activeBrand === '' || this.activeBrand != brandIndex){
        this.activeBrand = brandIndex
      }else{
        this.activeBrand = ''
      }
      if(this.activeBrand !== ''){
        this.params.brandCode = brandItem.brandCode
      }else{
        delete this.params.brandCode
      }
    },
    /* 输入价格 */
    minPriceBlur(e){
      const minPriceNum = parseFloat(e.detail.value) // 转化数值
      if(e.detail.value !== ''){
        if(!Number.isInteger(minPriceNum)){
          uni.showToast({
            title: '请输入正确的数值',
            icon: 'none',
            duration: 1000
          })
        }
      }else{
        this.params.minPrice = ''
      }
    },
    maxPriceBlur(e){
      const maxPriceNum = parseFloat(e.detail.value) // 转化数值
      if(e.detail.value !== ''){
        if(!Number.isInteger(maxPriceNum)){
          uni.showToast({
            title: '请输入正确的数值',
            icon: 'none',
            duration: 1000
          })
        }
      }else{
        this.params.maxPrice = ''
      }
    },

    /*  查询品牌 */
    async queryBrandPageForCFn(showLoad){
      const res = await uni.$request({
        url: queryBrandPageForC,
        data: this.brandParams,
        showLoad: showLoad // 关闭loading
      })
      this.brandList = res.list
      this.total = res.total
    },
    // 切换全部品牌
    allBrand(){
      this.moreBrandActive = !this.moreBrandActive
      if(this.moreBrandActive){
        this.brandParams.rows = this.total
      }else {
        this.brandParams.rows = '15'
      }
      this.queryBrandPageForCFn(false)
    },

    /*  查询分类 */
    async queryClasstreeFn(){
      const res = await uni.$request({
        url: queryClasstree
      })
      this.classtreeList = res
      this.classtreeTotal = res.total
      // console.log('查询分类res', res);
    }
  }
}
</script>

<style lang="scss" scoped>

.appUpdateMask {
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
	background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  .solidBox{
    width: 20%;
  }

    .popopBox{
      box-sizing: border-box;
      height: 100%;
      width: 80%;
      // margin-left: 20%;
      background-color: rgb(255, 255, 255);
      .filtrate-container{
        box-sizing: border-box;
        position: relative;
        height: 100%;

        // 筛选分类部分
        .filtrateBox{
          box-sizing: border-box;
          height: 100%;
          overflow-y: auto;
          padding-bottom: 400px;
          padding-left: 10px;

          .filtrate-item{
            .filtrate-title{
              font-size: 14px;
              font-weight: bold;
            }
            .brandTitle{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .more{
                display: flex;
                align-items: center;
                margin-right: 10px;
                color: rgba(153, 153, 153, 1);
                font-weight: normal;
              }
            }
            .filtrate-classify{
              display: flex;
              flex-wrap: wrap;
              padding: 10px 0;
              .filtrate-text{
                font-size: 12px;
                border-radius: 20px;
                padding: 6px 30px;
                background-color:  rgba(247, 247, 247, 1);
                margin-right: 10px;
                margin-bottom: 8px;
                border: 1px solid rgba(247, 247, 247, 1);
              }
              .activeText{
                border: 1px solid rgba(224, 37, 27, 1);
                background-color: rgba(224, 37, 27, 0.1);
              }
            }
            .priceFiltrate{
                padding: 10px 10px 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .cutLine{
                  margin: 0 10px;
                  color: rgba(153, 153, 153, 1) !important;
                }
                .priceInput{
                  width: 100%;
                }
              }
          }
        }

        // 底部按钮
        .footer-container{
            height: 50px;
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            .bottom-btn{
              width: 100%;
              border-radius: none;
              font-size: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .reset{
            }
            .submit{
              background-color: rgb(224, 37, 27);
              color: #fff;
            }
        }

      }
    }

}

// 去除底部按钮圆角
/deep/button::after{
  border-radius: none !important;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
/deep/button {
  border-radius:0 !important;
}

// 修改input样式
.priceFiltrate{
  /deep/input{
    background-color: rgba(247, 247, 247, 1);
    font-size: 12px;
    border-radius: 20px;
    text-align: center;
    padding: 4px 0;
    width: 100%;
  }
}

</style>