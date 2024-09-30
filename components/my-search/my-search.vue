<template>
	<view class="my-search-container" @click="searchBoxHandler">
		<view class="my-search-box" >
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				//跳转到搜索页面
				uni.navigateTo({
					url:'/pagesub/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	background-color: #04a38d;
	display: flex;
	align-items: center;
	padding-left: 0 10px;
	.my-search-box{
		height: 36px;
		background-color: #FFFFFF;
		border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;//横向居中
		align-items: center;//纵向居中
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>