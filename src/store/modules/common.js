
const state = {
  searchRedirectParams: {}, // 跳转到搜索页的重定向信息
  tabActiveIndex: 0 // 首页到搜索页面激活的tab
}
const mutations = {
  // 存储重定向信息
  setSearchRedirect(state, payload){
    state.searchRedirectParams = payload
    // console.log('state.searchRedirectParams', state.searchRedirectParams);
  },
  // 存储首页到搜索页面激活的tab
  setTabActiveIndex(state, payload){
    state.tabActiveIndex = payload
    // console.log('state.tabActiveIndex', state.tabActiveIndex);
  },

}
const getters = {
  searchRedirectParams: state => state.searchRedirectParams,
  tabActiveIndex: state => state.tabActiveIndex,
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}