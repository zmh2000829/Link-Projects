// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueJsonp from 'vue-jsonp'
import App from './App'
import router from './router'
import store from '@/store'
import Vuetify from 'vuetify'
import WechatPlugin from './utils/WechatPlugin'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { sync } from 'vuex-router-sync'
//引入echarts
import echarts from 'echarts'
 
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

sync(store, router)
Vue.config.productionTip = false

// 全局注册微信jsdk
Vue.use(WechatPlugin)

Vue.use(vueJsonp)
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
export default new Vuetify({ })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
