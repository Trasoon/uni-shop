<!-- 可通过query（home页面中的分类名，查询页面的输入）和cid（分类页面的品类），调用商品列表页面 -->
<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" @click="toDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total: 0,
				//节流阀
				isLoading:false
			};
		},
		onLoad(options){
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// 通过query或者cid，请求后端数据
			this.getGoodsList()
		},
		//触底加载更多数据
		onReachBottom(){
			//当数据全部加载完成后，再次下拉不会触发触底函数
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)return uni.$showMsg('没有更多的商品了...')
			//当正在使用节流阀，则直接返回，不触发触底函数
			if(this.isLoading)return
			this.queryObj.pagenum+=1
			this.getGoodsList()
		},
		//下拉刷新
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum = 1
			this.goodsList = []
			this.total = 0
			this.isLoading = false
			//重新发送请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods:{
			//从后端请求数据
			async getGoodsList(gb){
				//使用节流阀
				this.isLoading = true
				const {data: rep} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				//请求完成后，不使用节流阀
				this.isLoading = false
				//请求完成后，若有下拉框，立即关闭
				gb && gb()
				console.log(rep.message)
				if(rep.meta.status !== 200){
					return uni.$showMsg()
				}
				this.goodsList = [...this.goodsList,...rep.message.goods]
				this.total = rep.message.total
			},
			//跳转到商品详情页面
			toDetail(goods){
				uni.navigateTo({
					url:'/pagesub/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
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
