<template>
	<view class="goods-item">
		<!-- 每个商品左边是图片 -->
		<view class="goods-item-left">
			<img class="goods-pic" :src="goods.goods_small_logo || defImg"/>
		</view>
		<!-- 每个商品右边是商品名和信息 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defImg:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props:{
			goods: {
				type: Object,
				default: {}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	padding: 10px 5px;
	border-color: 1px solid #f0f0f0;
	display: flex;
	.goods-item-left {
		margin-right: 5px;
		.goods-pic {
			width: 100px;
			height: 100px;
			
		}
	}
	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
		}
		.goods-price {
			color: #04a38d;
			font-size: 16px;
		}
	}
}
</style>