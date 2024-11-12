<template>
	<view>
		<!-- 选择收货地址区域 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息区域 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="../../static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// 收货地址
				// address:{}
			};
		},
		
		computed:{
			...mapState('moduleUser', ['address']),
			...mapGetters('moduleUser',['addstr']),
			// addstr(){
			// 	if(!this.address.provinceName)return ''
			// 	const tmp = this.address.provinceName+this.address.cityName+this.address.countyName+this.address.detailInfo
			// 	return tmp
			// }
		},
		methods:{
			...mapMutations('moduleUser',['updateAddress']),
			async chooseAddress(){
				// uni自带的接口
				const [err, succ] = await uni.chooseAddress().catch(err=>err)
				
				if(err===null && succ.errMsg === 'chooseAddress:ok'){
					this.updateAddress(succ)
				}
				console.log(this.address)
			},
			
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right{
			display: flex;
			justify-content: space-between;
		}
	}
	.row2{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
	}
}
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
</style>