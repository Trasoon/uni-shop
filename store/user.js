export default{
	// 开启命名空间
	namespaced: true,
	
	// 数据
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token: uni.getStorageSync('token') || '',
		// 用户的信息对象
		userinfo: JSON.parse(uni.getStorageSync('userinfo')||'{}'),
		// 重定向的object对象
		redirectInfo: null,
	}),
	
	// 方法
	mutations:{
		//更新收货地址
		updateAddress(state, address){
			state.address = address
			this.commit('moduleUser/saveAddressToStorage')
		},
		// 持久化存储地址信息
		saveAddressToStorage(state){
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 更新用户信息
		updateUserInfo(state, userinfo){
			state.userinfo = userinfo
			
			this.commit('moduleUser/saveUserInfoToStorage')
		},
		// 持久化存储用户信息
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		
		// 更新token字符串
		updateToken(state, token){
			state.token = token
			
			this.commit('moduleUser/saveTokenToStorage')
		},
		// 持久化存储token字符串
		saveTokenToStorage(state){
			uni.setStorageSync('token', state.token)
		},
		// 更新重定向的对象
		updateRedirectInfo(state, redirectInfo){
			state.redirectInfo = redirectInfo
		}
	},
	
	getters:{
		addstr(state){
			if(!state.address.provinceName)return ''
			const tmp = state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
			return tmp
		}
	}
}