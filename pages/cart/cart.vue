<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址区域 -->
		<my-address></my-address>
		<!-- 商品列表的标题区域-->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表的详情区域 -->
		<uni-swipe-action>
			<!-- 循环渲染每个商品 -->
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swiperActionClickHandler(item)">
					<my-goods :goods="item" :show-radio="true" :show-num="true" @radio-change='radioChangeHandler' @num-change='numChangeHandler'></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 自定义结算组件 -->
		<my-settle></my-settle>
		
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	//用于购物车右上角的商品数量
	import badgeMix from '@/mixin/tabbar_badge.js'
	
	export default {
		mixins:[badgeMix],
		data() {
			return {
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:'#C00000'
						},
					}
				]
			};
		},
		computed:{
			...mapState('moduleCart',['cart'])
		},
		methods:{
			//跳转到商品详情页面
			toDetail(goods){
				uni.navigateTo({
					url:'/pagesub/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			},
			//更新goods勾选状态
			...mapMutations('moduleCart',['updateGoodsState','updateGoodsCount','deleteGoodsById']),
			//调用更新商品状态函数
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			//更改商品数量
			numChangeHandler(e){
				this.updateGoodsCount(e)
				console.log(e)
			},
			// 滑动删除按钮
			swiperActionClickHandler(goods){
				console.log('滑动删除')
				this.deleteGoodsById(goods)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.tip-text{
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
</style>
