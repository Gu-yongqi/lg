
const state = {
  checkedGoodsList: uni.getStorageSync('checkedGoodsList') || [] // 所有选中的商品数据
}
const mutations = {
  // 实时存储选中的商品对象
  setCheckedGoods(state, payload){
    state.checkedGoodsList = payload
    uni.setStorageSync('checkedGoodsList', state.checkedGoodsList)
  }
}
const getters = {
  checkedGoodsObjLen: state => state.checkedGoodsList.length, // 选中商品数组的长度
  checkedGoodsList: state => state.checkedGoodsList // 所有选中的商品组成的数组
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}