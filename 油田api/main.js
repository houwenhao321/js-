import Vue from 'vue'
import App from './App.vue'
import {
  router
} from './router';
import store from './store'

// 插件导入 注册
import http from './utils/http'
Vue.use(http, {
  baseURL: 'http://36.112.48.53:88', //基路径
  // baseURL: '', //基路径
  timeout: 50000, //请求超时时间
  //请求拦截器
  inRequest: (inRequest) => {
    // console.log('inRequest', inRequest.headers)
    // inRequest.headers['Authorization'] = "Bearer b9d7a3a2-200e-48f9-816c-da0255eea361"
    return inRequest;
  }
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')