
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 自己的包
import store from '@/store/store.js'

//导入网络请求的包
import {$http} from '@escook/request-miniprogram'
uni.$http = $http
//请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//配置请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
	// 若请求的接口需要权限，那么就在header中添加Authorization
	if(options.url.indexOf('/my/') !== -1){
		options.header = {
			Authorization : store.state.moduleUser.token,
		}
	}
}
//配置请求响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}
//封装弹窗方法
uni.$showMsg = function(title = '数据请求失败', duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif