
const state = {
  dataObj: uni.getStorageSync('dataObj') || {}
}
const mutations = {
  // 存储用户信息
  setUserInfo(state, payload){
    state.dataObj = payload
    uni.setStorageSync('dataObj', state.dataObj)
    console.log('state.dataObj', state.dataObj);
  }
}
const actions = {
  logout(context){
    context.commit('setUserInfo', {})
  }
}
const getters = {
  dataObj: state => state.dataObj
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
