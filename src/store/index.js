import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import goods from  './modules/goods'
import filtrate from  './modules/filtrate'
import user from  './modules/user'
import common from  './modules/common'

const store = new Vuex.Store({
  modules: {
    goods,
    filtrate,
    common,
    user
  }
})

export default store