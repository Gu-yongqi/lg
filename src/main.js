import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)

import './api/http' // 接口
import './static/style/uview.scss' // 修改uview组件库的样式
import store from './store/index'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()