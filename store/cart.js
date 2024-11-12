export default{
	namespaced: true,
	
	state:()=>({
		//购物车数组，用于存储购物车中每个商品对象的信息
		//每个商品对象的信息包括以下6个属性
		//{goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart')|| '[]')
	}),
	//若要修改state中的数据，需要调用mutations中的方法才能修改
	mutations:{
		//加入购物车。若商品已经在购物车，则商品数量加一；若商品不在购物车，则添加商品到cart数组中
		addToCart(state, goods){
			//find函数返回满足条件的第一个元素
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// 若findResult为空则商品不在购物车,需将元素添加到数组中
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			//保存购物车数据到本地
			this.commit('moduleCart/saveToStorage')
		},
		//将购物车的信息保存到本地
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车中商品勾选状态
		updateGoodsState(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('moduleCart/saveToStorage')
			}
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state, goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('moduleCart/saveToStorage')
			}
		},
		// 删除购物车中的某个商品
		deleteGoodsById(state, goods){
			state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			this.commit('moduleCart/saveToStorage')
		},
		// 更改所有商品的选中状态
		updateAllGoodsState(state, newstate){
			state.cart.forEach(goods => goods.goods_state = newstate)
			this.commit('moduleCart/saveToStorage')
		}
	},
	//若要基于state数据生成新的数据，则需要写到getter中，类似于computed
	getters:{
		//所有商品数量
		total(state){
			// let num = 0
			// // 遍历所有商品的count并累加
			// state.cart.forEach(goods => {num+=goods.goods_count})
			// return num
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		//被选中的商品数量
		checkedCount(state){
			const findResult = state.cart.filter(x => x.goods_state)
			let num = 0
			findResult.forEach(goods => num += goods.goods_count)
			return num
		},
		// 被选中的商品的总价格
		checkedGoodsAmount(state){
			return state.cart.filter(x => x.goods_state)
								.reduce((total, item) => total += item.goods_price*item.goods_count, 0)
								.toFixed(2)
		}
	}
}