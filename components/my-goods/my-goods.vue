<template>
	<view class="goods-item">
		<!-- 每个商品左边是图片 -->
		<view class="goods-item-left">
			<radio :checked='goods.goods_state' color="#04a38d" v-if="showRadio" @click="radioClickHandler"/>
			<img class="goods-pic" :src="goods.goods_small_logo || defImg"/>
		</view>
		<!-- 每个商品右边是商品名和信息 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numberBoxClickHandler"></uni-number-box>
			</view>
			
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
			},
			// 是否展示radio按钮
			showRadio:{
				type: Boolean,
				default: false
			},
			// 是否展示numbox组件
			showNum:{
				type: Boolean,
				default: false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			//更改商品数量
			numberBoxClickHandler(val){
				this.$emit('num-change',{
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
				console.log(val)
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex:1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price {
				color: #04a38d;
				font-size: 16px;
			}
		}
	}
}
</style>