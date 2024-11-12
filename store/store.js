// 1.导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
//导入自身创建的模块
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'
// 使用vuex模块
Vue.use(Vuex)
//创建store实例
const store = new Vuex.Store({
	modules:{
		moduleCart,
		moduleUser
	}
})

export default store