
const state = {
  filtrateParams: {}, // 筛选的参数
  redirectParams: {}, // 重定向信息
  beforeFiltrateParams: {} // 关闭筛选之前的参数--用于关闭筛选时还原页面
}
const mutations = {
  // 存储筛选参数
  setFiltrateParams(state, payload){
    state.filtrateParams = payload
    // console.log('state.filtrateParams', state.filtrateParams);
  },

  // 存储重定向信息
  setFiltrateRedirect(state, payload){
    state.redirectParams = payload
    // console.log('state.redirectParams', state.redirectParams);
  },

  // 存储筛选之前，搜索页面的参数
  setBeforeFiltrateParams(state, payload){
    state.beforeFiltrateParams = payload
    console.log('state.beforeFiltrateParams', state.beforeFiltrateParams);
  },

}
const getters = {
  filtrateParams: state => state.filtrateParams,
  redirectParams: state => state.redirectParams,
  beforeFiltrateParams: state => state.beforeFiltrateParams
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}