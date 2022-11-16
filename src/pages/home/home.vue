<template>
  <view class="home-container">
    <!-- 头部 -->
    <view class="tab-container">
      <view @click="activeTabFn('allGoods')" :class="{activeTab: tabActiveText === 'allGoods'}">所有货源</view>
      <view @click="activeTabFn('searchBrand')" :class="{activeTab: tabActiveText === 'searchBrand'}">找品牌</view>
      <view @click="activeTabFn('searchOwner')" :class="{activeTab: tabActiveText === 'searchOwner'}">找货主</view>
    </view>

    <!-- 搜索 -->
    <view class="search-container">
      <u-search height="40px" shape="round" borderColor="#E0251B" bgColor="#fff" :clearabled="true" :actionStyle="searchText" :showAction="false" :focus="true" :disabled="true" @click="toSearch"></u-search>
    </view>

    <!-- 品牌标签 -->
    <view class="tag-container" v-if="searchSelectValue == 1 || searchSelectValue == 2">
      <view class="tagBox">
        <view class="tagHeader">
          <!-- 品牌 -->
          <view class="tag-text" v-if="searchSelectValue == 1">
            <view class="tagHeader-item" :class="{activeHeadTag: headBrandTagActive === 'oneBrandTag'}" @click="headBrandTagClick('oneBrandTag', tagList[0])">{{tagList[0].brandName}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headBrandTagActive === 'twoBrandTag'}" @click="headBrandTagClick('twoBrandTag', tagList[1])">{{tagList[1].brandName}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headBrandTagActive === 'threeBrandTag'}" @click="headBrandTagClick('threeBrandTag', tagList[2])">{{tagList[2].brandName}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headBrandTagActive === 'fourBrandTag'}" @click="headBrandTagClick('fourBrandTag', tagList[3])">{{tagList[3].brandName}}</view>
          </view>
          <!-- 货主 -->
          <view class="tag-text" v-else>
            <view class="tagHeader-item" :class="{activeHeadTag: headMemberTagActive === 'oneMemberTag'}" @click="headMemberTagClick('oneMemberTag', memberList[0].memberCcode)">{{memberList[0].memberCname}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headMemberTagActive === 'twoMemberTag'}" @click="headMemberTagClick('twoMemberTag', memberList[1].memberCcode)">{{memberList[1].memberCname}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headMemberTagActive === 'threeMemberTag'}" @click="headMemberTagClick('threeMemberTag', memberList[2].memberCcode)">{{memberList[2].memberCname}}</view>
            <view class="tagHeader-item" :class="{activeHeadTag: headMemberTagActive === 'fourMemberTag'}" @click="headMemberTagClick('fourMemberTag', memberList[3].memberCcode)">{{memberList[3].memberCname}}</view>
          </view>

          <!-- 品牌的更多按钮 -->
          <view class="moreIcon" @click="moreTagClick('brand')" v-if="searchSelectValue == 1 && tagList.length > 4">
            <uni-icons type="bars" size="16" color="rgba(168, 168, 168)"></uni-icons>
          </view>

          <!-- 货主的更多按钮 -->
          <view class="moreIcon" @click="moreTagClick('member')" v-if="searchSelectValue == 2 && memberList.length > 4">
            <uni-icons type="bars" size="16" color="rgba(168, 168, 168)"></uni-icons>
          </view>

        </view>

        <!-- 品牌 -->
        <view class="tagAll" :style="{'height': maskHeight + 'px'}" v-if="showMoreTag_brand && searchSelectValue == 1">
          <view class="tagAllBox">
            <view class="tagAllMain" v-if="searchSelectValue == 1">

              <view class="tagAll-item" :class="{activeTag: index === activeTagIndex}" v-for="(item, index) in tagList" :key="item.brandCode" @click="brandTabClick(item, index)">
                {{item.brandName}}
              </view>

            </view>
          </view>
        </view>

        <!-- 货主 -->
        <view class="tagAll" :style="{'height': maskHeight + 'px'}" v-if="showMoreTag_member && searchSelectValue == 2">
          <view class="tagAllBox">
            <!-- 货主 -->
            <view class="tagAllMain" v-if="searchSelectValue == 2">
              <view class="tagAll-item" :class="{activeTag: index === activeMemberTagIndex}" v-for="(item, index) in memberList" :key="item.memberCcode" @click="memberTabClick(item,index)">
                {{item.memberName}}
              </view>
            </view>
          </view>
        </view>

      </view>
    </view>

    <!-- 筛选条件 -->
    <view class="filtrate-container">
      <view class="filtrate-left">
        <view class="allBtn" @click="filtrateBtnFn('all')" :class="{activeFiltrate: filtrateActivde === 'all'}">综合</view>
        <view class="salesBtn" @click="filtrateBtnFn('sales')">
          <view :class="{activeFiltrate: filtrateActivde === 'sales'}">销量</view>
        </view>
        <view class="priceBtn" @click="filtrateBtnFn('price')">
          <view :class="{activeFiltrate: filtrateActivde === 'price'}">价格</view>
          <view class="arrowIcon">
            <u-icon name="arrow-up-fill" size="6" :color="priceUpBtn"></u-icon>
            <u-icon name="arrow-down-fill" size="6" :color="priceDownBtn"></u-icon>
          </view>
        </view>
      </view>
      <view class="filtrate-right">
        <view class="filtrateBtn" @click="filtrateClick">
          <view>筛选</view>
          <view class="filtrateIcon">
            <image class="img" src="../../static/img/filtrate@2x.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 列表部分 -->
    <view class="goods-container" v-if="goodsList.length > 0">
      <goods-item :good-item="item" v-for="(item, index) in goodsList" :key="index" @changeRadioStatus="changeRadio"></goods-item>
    </view>

    <!-- 结算部分 -->
    <view class="settle-container">
      <settle :all-goodslen="allGoodslen" @changeAllcheckedStatus="controlRadio"></settle>
    </view>

  </view>
</template>

<script>
import { searchengine, queryBrandPageForC } from '@/api/interface'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      memberList: [],
      windowHeight: 0, //系统设备高

      menuBtnBottom: 0, // 胶囊按钮到顶部距离

      showLoadBoolead: true, // 控制获取数据时是否显示showLoading
      /* 展示品牌和货主的标签数据 */
      showMoreTag_brand: false, // 找品牌-更多
      showMoreTag_member: false, // 找货主-更多
      tagList: [], // 标签数据
      tagTotal: 0, // 所有标签长度
      // 品牌
      brandParams: { // 获取品牌需要的参数
        rows: '15',
        page: '1'
      },
      moreActive: false, // 是否点击了更多按钮
      activeTagIndex: '', // 激活时的品牌index
      headBrandTagActive: '', // 激活头部的品牌标签
      activeMemberTagIndex: '', // 激活时的货主index
      headMemberTagActive: '', // 激活头部的货主标签

      // 搜索框的下拉选择值
      searchSelectValue: 0,

      // 结算
      allGoodslen: 0, // 所有商品的长度

      // 所有商品
      goodsList: [], //所有商品数据
      params: {
        sortField: '',
        order: 'desc', // 价格：升序asc，降序desc
        page: 1,
        searchType: 'match_phrase',
        searchParam: '',
        groupList: 'brandName,brandCode,memberCcode,memberCname,classtreeCode,classtreeName',
        groupNum: 'pricesetNprice',
        // minPrice: '',
        // maxPrice: '',
        goodsClass: 'plat',
      },
      total: 0,
      loading: false, // 节流阀

      tabActiveText: '', // tab栏激活时的标识
      filtrateActivde: '', // 筛选按钮文字激活时候的颜色
      // 筛选图标
      filtrateColor: '#D6D6D6', // 筛选按钮的颜色-未选中
      filtrateActiveColor: '#E0251B', // 筛选按钮的颜色-选中
      // 按钮-销量
      salesUpBtn: '#D6D6D6',
      salesDownBtn: '#D6D6D6',
      // 按钮-价格
      priceUpBtn: '#D6D6D6', // 筛选按钮的颜色-未选中
      priceDownBtn: '#D6D6D6', // 筛选按钮的颜色-选中
    };
  },
  onLoad(options) {
    // console.log('首页 onLoad options', options);

    // 还原参数
    // 清空所有选中的商品
    this.setCheckedGoods([])
    this.goodsList = []
    this.total = 0
    this.isLoading = false
    this.getGoodsList()

    // 首页加载时：
    this.tabActiveText = 'allGoods' // 所有货源tab高亮
    this.filtrateActivde = 'all' //综合按钮高亮

    /* 获取系统信息 */
    this.windowHeight = uni.getSystemInfoSync().windowHeight

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
  onShow() {
    // console.log('首页onShow');
    // 重置tab栏
    this.searchSelectValue = 0
    this.tabActiveText = 'allGoods'
    this.filtrateActivde = 'all' //综合按钮高亮
    this.setTabActiveIndex(this.searchSelectValue) // 存储激活的tab

    // console.log('首页this.filtrateParams', this.filtrateParams);
    // 渲染筛选结果
    if (this.filtrateParams.classtreeCode || this.filtrateParams.memberCcode || this.filtrateParams.minPrice || this.filtrateParams.maxPrice || this.filtrateParams.brandCode) {
      // 清空所有选中的商品
      this.setCheckedGoods([])
      // 重新定义参数
      this.params = this.filtrateParams
      this.goodsList = []
      this.total = 0
      this.params.page = 1
      this.getGoodsList()
    }
  },

  // 上拉触底
  onReachBottom() {
    if (this.goodsList.length >= this.total) {
      // uni.showToast({
      // 	title: '已加载完',
      // 	icon: 'none',
      // 	duration: 1000
      // })
      return
    };
    if (this.loading) return;
    this.params.page++
    this.getGoodsList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 还原参数
    this.params = {
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
    /* 筛选栏的按妞 */
    this.filtrateActivde = 'all' //综合按钮高亮
    if (this.filtrateActivde === 'all') {
      // 清空所有选中的商品
      this.setCheckedGoods([])
      // 获取数据
      this.goodsList = []
      this.total = 0
      this.params.page = 1
      // 价格的图标还原
      this.priceDownBtn = this.filtrateColor
      this.priceUpBtn = this.filtrateColor
    }

    /* 重置激活样式-品牌和货主 */
    this.headBrandTagActive = ''
    this.activeTagIndex = '' // 下拉的品牌标签激活取消
    this.activeMemberTagIndex = ''
    this.headMemberTagActive = '' // 头部的激活取消

    /* 下拉刷新 */
    this.isLoading = false
    this.getGoodsList(() => {
      uni.stopPullDownRefresh()
    })
  },

  computed: {
    ...mapGetters('goods', ['checkedGoodsList']),
    ...mapGetters('filtrate', ['filtrateParams']),

    // 蒙层高度
    maskHeight() {
      return this.windowHeight - 128
    }
  },

  methods: {
    ...mapMutations('goods', ['setCheckedGoods']),
    ...mapMutations('filtrate', ['setFiltrateParams', 'setFiltrateRedirect']),
    ...mapMutations('common', ['setSearchRedirect', 'setTabActiveIndex']),

    /* 点击标签 */
    // 点击头部的品牌标签
    headBrandTagClick(headTag, item) {
      this.headBrandTagActive = headTag
      this.activeTagIndex = '' // 下拉的品牌标签激活取消

      this.params.brandCode = item.brandCode // 模拟的数据
      // console.log('点击了头部的品牌标签item', item);

      // 清空所有选中的商品
      this.setCheckedGoods([])
      this.params.page = 1
      this.goodsList = []
      this.total = 0
      this.getGoodsList()

    },
    // 点击品牌标签
    brandTabClick(item, index) {
      this.activeTagIndex = index
      this.headBrandTagActive = '' // 头部的激活取消
      this.showMoreTag_brand = false
      // 渲染品牌标签得到的结果

      this.params.brandCode = item.brandCode // 模拟的数据
      // 清空所有选中的商品
      this.setCheckedGoods([])
      this.params.page = 1
      this.goodsList = []
      this.total = 0
      this.getGoodsList()

    },
    // 点击头部的货主标签
    headMemberTagClick(headTag, memberCcode) {
      this.headMemberTagActive = headTag
      this.activeMemberTagIndex = '' // 下拉的货主标签激活取消

      this.params.memberCcode = memberCcode // 模拟的数据

      // 清空所有选中的商品
      this.setCheckedGoods([])
      this.params.page = 1
      this.goodsList = []
      this.total = 0
      this.getGoodsList()
    },
    // 点击货主标签
    memberTabClick(item, index) {
      this.activeMemberTagIndex = index
      this.headMemberTagActive = '' // 头部的激活取消
      // 关闭显示更多货主的下拉框
      this.showMoreTag_member = false

      this.params.memberCcode = item.memberCcode // 模拟的数据

      // 清空所有选中的商品
      this.setCheckedGoods([])
      this.params.page = 1
      this.goodsList = []
      this.total = 0
      this.getGoodsList()
    },

    // 点击展示更多标签图标
    moreTagClick(flag) {
      if (flag === 'brand') {
        // 找品牌
        this.showMoreTag_brand = !this.showMoreTag_brand
        if (this.showMoreTag_brand && this.searchSelectValue == 1) {
          // 重置激活样式
          this.headBrandTagActive = ''
          this.activeTagIndex = '' // 下拉的品牌标签激活取消

          this.brandParams.rows = this.tagTotal
          this.showLoadBoolead = false
          this.queryBrandPageForCFn()
        } else {
          this.brandParams.rows = '15'
          this.showLoadBoolead = true
        }
      } else if (flag === 'member') {
        // 找货主
        this.showMoreTag_member = !this.showMoreTag_member
        // 重置激活样式
        this.activeMemberTagIndex = ''
        this.headMemberTagActive = '' // 头部的激活取消

      }
    },

    /* 加入选品库 */
    // 修改商品的选中状态
    changeRadio(goodsItem) {
      const findGoodObj = this.goodsList.find(item => item.goodsId === goodsItem.goodsId) // 找到对象
      const findGoodsIndex = this.goodsList.findIndex(item => item.goodsId === goodsItem.goodsId) // 找到对应的索引
      if (findGoodObj.goodsChecked) {
        this.$set(findGoodObj, 'goodsChecked', false) // 修改该对象选中状态
      } else {
        this.$set(findGoodObj, 'goodsChecked', true) // 修改该对象
      }
      this.$set(this.goodsList, findGoodsIndex, findGoodObj) // 修改原商品数组

      // 将选中的商品对象存储在vuex
      this.setcheckedGoodsStore(this.goodsList)
    },
    // 将选中的商品对象存储在vuex
    setcheckedGoodsStore(goodsList) {
      const goodsCheckedArr = goodsList.filter(item => item.goodsChecked) // 过滤出选中的商品
      this.setCheckedGoods(goodsCheckedArr) // 存储在vuex中
    },
    // 子组件点击全选按钮，接收事件。全选影响小选
    controlRadio(currentcheckedAllRadioStatus) {
      // 遍历，改变每一个小选按钮的选中状态
      this.goodsList.forEach((item, index) => {
        this.$set(item, 'goodsChecked', currentcheckedAllRadioStatus)
        this.$set(this.goodsList, index, item)
      })
      // 全选按钮为取消全选，清空vuex中选择的商品数量数据
      if (!currentcheckedAllRadioStatus) {
        this.setCheckedGoods([])
      } else {
        this.setCheckedGoods(this.goodsList)
      }
    },

    /* 筛选 */
    filtrateClick() {
      // console.log('筛选');
      // 存储本页信息-用于从筛选页重定向回来
      const currentPage = {
        openType: 'switchTab',
        url: '/pages/home/home'
      }
      this.setFiltrateRedirect(currentPage)

      uni.navigateTo({
        url: '/subPages/filtrate/filtrate'
      })
    },

    /* 搜索框 */
    // 跳转搜索页面
    toSearch() {
      // 存储本页信息-用于从搜索页重定向回来
      const currentPage = {
        openType: 'switchTab',
        url: '/pages/home/home'
      }
      this.setSearchRedirect(currentPage)
      this.setTabActiveIndex(this.searchSelectValue) // 存储激活的tab

      uni.navigateTo({
        url: '/subPages/search/search'
      })
    },

    /* tab栏 */
    // 点击tab栏触发事件
    activeTabFn(activeText) {
      this.tabActiveText = activeText

      /* 重置数据 */
      // 还原参数
      this.params = {
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
      // 清空所有选中的商品
      this.setCheckedGoods([])
      // this.params.page = 1
      this.goodsList = []
      this.total = 0
      this.isLoading = false
      this.getGoodsList()

      if (activeText === 'allGoods') {
        // console.log('所有货源');
        this.searchSelectValue = 0
      } else if (activeText === 'searchBrand') {
        // console.log('找品牌');
        this.searchSelectValue = 1
        this.showMoreTag_brand = false
        // 获取品牌数据
        this.queryBrandPageForCFn()
      } else if (activeText === 'searchOwner') {
        // console.log('找货主');
        this.searchSelectValue = 2
        this.showMoreTag_member = false
        // 获取货主数据
        this.queryMemberFn()
      }

      // 重置第二行tab栏的样式
      this.headBrandTagActive = ''
      this.activeTagIndex = '' // 下拉的品牌标签激活取消
      this.activeMemberTagIndex = ''
      this.headMemberTagActive = '' // 头部的激活取消

    },

    /*  查询品牌 */
    async queryBrandPageForCFn() {
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
          goodsClass: 'plat'
        }
      })
      const totalObj = res.pageTools.sumMap
      console.log('筛选分类数据', res.pageTools.sumMap);

      // 供应渠道
      // const memberList = []
      // totalObj.memberCname.buckets.forEach((name, nindex) => {
      // 	totalObj.memberCcode.buckets.forEach((code, cindex) => {
      // 		if(nindex === cindex){
      // 			memberList.push({
      // 				memberCname: name.key,
      // 				memberCcode: code.key,
      // 			})
      // 		}
      // 	})
      // })
      // this.memberList = memberList
      // console.log('memberList', memberList);
      // // 分类
      // const classtreeList = []
      // totalObj.classtreeName.buckets.forEach((name, nindex) => {
      // 	totalObj.classtreeCode.buckets.forEach((code, cindex) => {
      // 		if(nindex === cindex){
      // 			classtreeList.push({
      // 				classtreeName: name.key,
      // 				classtreeCode: code.key,
      // 			})
      // 		}
      // 	})
      // })
      // this.classtreeList = classtreeList
      // console.log('classtreeList', classtreeList);
      // 品牌
      const brandList = []
      totalObj.brandName.buckets.forEach((name, nindex) => {
        totalObj.brandCode.buckets.forEach((code, cindex) => {
          if (nindex === cindex) {
            brandList.push({
              brandName: name.key,
              brandCode: code.key,
            })
          }
        })
      })
      this.tagList = brandList.filter(item => item.brandName)
      console.log('this.tagList', this.tagList);
    },
    /*  查询货主 */
    async queryMemberFn() {
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
          goodsClass: 'plat'
        }
      })
      const totalObj = res.pageTools.sumMap
      console.log('筛选分类数据', res.pageTools.sumMap);

      // 供应渠道
      const memberList = []
      totalObj.memberCname.buckets.forEach((name, nindex) => {
        totalObj.memberCcode.buckets.forEach((code, cindex) => {
          if (nindex === cindex) {
            memberList.push({
              memberCname: name.key,
              memberCcode: code.key,
            })
          }
        })
      })
      this.memberList = memberList
      console.log('memberList', memberList);
      // // 分类
      // const classtreeList = []
      // totalObj.classtreeName.buckets.forEach((name, nindex) => {
      // 	totalObj.classtreeCode.buckets.forEach((code, cindex) => {
      // 		if(nindex === cindex){
      // 			classtreeList.push({
      // 				classtreeName: name.key,
      // 				classtreeCode: code.key,
      // 			})
      // 		}
      // 	})
      // })
      // this.classtreeList = classtreeList
      // console.log('classtreeList', classtreeList);
      // 品牌
      // const brandList = []
      // totalObj.brandName.buckets.forEach((name, nindex) => {
      // 	totalObj.brandCode.buckets.forEach((code, cindex) => {
      // 		if(nindex === cindex){
      // 			brandList.push({
      // 				brandName: name.key,
      // 				brandCode: code.key,
      // 			})
      // 		}
      // 	})
      // })
      // this.tagList = brandList.filter(item => item.brandName)
      // console.log('this.tagList', this.tagList);
    },

    /* 筛选按钮 */
    // 点击筛选按钮触发事件
    filtrateBtnFn(activeText) {
      this.filtrateActivde = activeText // 切换筛选按钮的选中状态

      // 点击综合按钮
      if (activeText === 'all') {
        // console.log('综合');
        // 清空所有选中的商品
        this.setCheckedGoods([])

        this.params.sortField = '' // 参数

        // 获取数据
        this.goodsList = []
        this.total = 0
        this.params.page = 1
        this.getGoodsList()
      }

      if (activeText === 'sales') {
        // console.log('销量');
        // 清空所有选中的商品
        this.setCheckedGoods([])

        // 切换销量 升序和降序 的选中状态
        if (this.salesDownBtn === this.filtrateColor) {
          this.salesDownBtn = this.filtrateActiveColor
          this.priceUpBtn = this.filtrateColor
        } else if (this.salesDownBtn === this.filtrateActiveColor) {
          this.salesDownBtn = this.filtrateColor
          this.priceUpBtn = this.filtrateActiveColor
        }

        this.params.sortField = 'goodsSalesvolume' // 参数

        // 获取数据
        this.goodsList = []
        this.total = 0
        this.params.page = 1
        this.getGoodsList()
      }

      // 切换价格 升序和降序 的选中状态
      if (activeText === 'price') {
        // console.log('价格');
        // 清空选中的商品
        this.setCheckedGoods([])

        if (this.priceDownBtn === this.filtrateColor) {
          this.priceDownBtn = this.filtrateActiveColor // 降序
          this.priceUpBtn = this.filtrateColor
          this.params.order = 'desc' // 参数

        } else if (this.priceDownBtn === this.filtrateActiveColor) {
          this.priceDownBtn = this.filtrateColor
          this.priceUpBtn = this.filtrateActiveColor // 升序
          this.params.order = 'asc' // 参数
        }

        this.params.sortField = 'pricesetNprice' // 参数

        // 获取数据
        this.goodsList = []
        this.total = 0
        this.params.page = 1
        this.getGoodsList()

      }
    },

    /* 获取商品数据 */
    async getGoodsList(cb) {
      // console.log('重新获取所有商品');

      this.loading = true

      const res = await uni.$request({
        url: searchengine,
        data: this.params,
        showLoad: this.showLoadBoolead
      })

      this.loading = false
      cb && cb()

      this.goodsList = [...this.goodsList, ...res.list]
      this.total = res.total
      this.goodsList.forEach(item => {
        item.goodsChecked = false // 用于做勾选状态,初始化为未选中
      })

      // 还原刷新之前商品的选中状态
      this.goodsCheckStatusBack(this.goodsList)

      // 存储所有商品数组的长度
      this.allGoodslen = this.goodsList.length

    },

    // 还原刷新之前商品的选中状态
    goodsCheckStatusBack(newGoodsList) {

      this.goodsList = newGoodsList.map(newItem => {
        this.checkedGoodsList.forEach(checkedItem => { // 存储在vuex中的选中的商品
          if (newItem.goodsId === checkedItem.goodsId) {
            newItem.goodsChecked = true
          }
        })
        return newItem
      })

    }

  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .tab-container {
    position: sticky;
    top: 0;
    z-index: 1999;

    display: flex;
    justify-content: space-around;
    font-size: 16px;
    line-height: 40px;
    background-color: #fff;
    .activeTab {
      font-size: 18px;
      font-weight: bold;
    }
  }

  .search-container {
    position: sticky;
    z-index: 1999;
    top: 40px;

    height: 40px;
    padding: 0 16rpx 8px;
    background-color: #fff;
  }

  .tag-container {
    position: sticky;
    top: 88px;
    z-index: 1000;
    .tagBox {
      line-height: 40px;
      padding: 0 16rpx;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      background-color: #fff;
      .tagHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        .tag-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          .tagHeader-item {
            font-size: 14px;
            /* 标签名过长时处理： */
            // width: 120rpx;
            // padding-right: 4px; // 防止文字被裁断
            // overflow: hidden;
            // text-overflow: clip;
            // white-space: nowrap;
          }
          .activeHeadTag {
            color: #e22519;
          }
        }
        .moreIcon {
          padding: 0 0 0 14px;
        }
      }

      .tagAll {
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.6);
        // height: ; // 计算得出：根据系统设备计算得出
        width: 100%;
        position: fixed;
        left: 0;
        z-index: 1000;
        // 滚动容器
        overflow-y: auto;

        // 内容部分
        .tagAllBox {
          border-top: 1px solid rgb(245, 245, 245);
          padding: 10px 6px; // 需要根据按钮边距做自适应
          background-color: #fff;
          border-radius: 0 0 4px 4px;

          .tagAllMain {
            display: flex;
            flex-wrap: wrap;
            // display: grid;
            // grid-gap: 8px;

            .tagAll-item {
              display: inline-block;
              padding: 0px 10px;
              background-color: rgba(242, 242, 242, 1);
              border-radius: 4px;
              font-size: 13px;
              margin: 4px;
              border: 1px solid rgba(242, 242, 242, 1);
            }
            .activeTag {
              border: 1px solid rgba(224, 37, 27, 1);
              background-color: rgba(224, 37, 27, 0.1);
            }
          }
        }
      }
    }
  }

  .filtrate-container {
    background-color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    padding: 0 16rpx;
    .filtrate-left {
      display: flex;
      justify-content: space-between;
      width: 60%;
      .activeFiltrate {
        color: #e22519;
      }
      .salesBtn,
      .priceBtn {
        display: flex;
        align-items: center;
        .arrowIcon {
          margin-left: 4rpx;
        }
      }
    }
    .filtrate-right {
      .filtrateBtn {
        display: flex;
        align-items: center;
        .filtrateIcon {
          width: 11px;
          margin-left: 8rpx;
          .img {
            width: 100%;
          }
        }
      }
    }
  }

  .goods-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20rpx;
    background-color: rgb(248, 248, 248); // 背景颜色
    padding: 10px 16rpx 64px;
    height: 100%;
  }

  .settle-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
}
</style>
