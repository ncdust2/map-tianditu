// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import instance from './utils/intercept'
import qs from 'qs'
import md5 from 'js-md5'
import VueResource from 'vue-resource'
import * as echarts from "echarts"
var HOSTURL = 'http://106.75.237.144'

Vue.prototype.$http = instance
Vue.prototype.$axios = instance
Vue.prototype.$md5 = md5 
Vue.prototype.$message = ElementUI.message
Vue.prototype.qs = qs
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: function(){
    return{
HOST: HOSTURL,
    }
  },

  components: { App },
  template: '<App/>'
})
