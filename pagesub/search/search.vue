<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" radius='100' cancelButton="none" :focus="true" :placeholder='kw'>
			</uni-search-bar>
		</view>
		<!-- 搜索到的数据列表 -->
		<view class="search-list" v-if="searchList.length !== 0">
			<view class="search-item" v-for="(item,index) in searchList" :key="index" @click="toDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史区域 -->
		<view class="search-history" v-else-if="searchList.length === 0">
			<!-- 搜索历史标题 -->
			<view class="search-history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="20" @click="clearHistory"></uni-icons>
			</view>
			<!-- 搜索历史列表 -->
			<view class="search-history-list">
				<uni-tag v-for="(item, index) in histories" :key="index" :text="item" inverted @click="toGoodsList(item)">
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw:'',
				searchList:[],//接受从后端查询的列表
				historyList:[],//历史列表
			};
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		methods:{
			//搜索栏输入事件的事件函数
			input(e){
				//防抖处理
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			//从后端获取查询的商品列表
			async getSearchList(){
				if(this.kw === ''){
					this.searchList = []
					return
				}
				const {data: rep} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				console.log(rep)
				this.searchList = rep.message
				//保存搜索历史记录
				this.saveHistory()
				
			},
			//点击搜索到的商品跳转到商品详情页面
			toDetail(item){
				uni.navigateTo({
					url:'/pagesub/goods_detail/goods_detail?goods_id='+item.goods_id,
				})
			},
			//保存搜索历史记录
			saveHistory(){
				//防止搜索历史重复和倒序
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			//清空历史记录
			clearHistory(){
				this.historyList = []
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//点击搜索历史，跳转到商品列表界面
			toGoodsList(item){
				uni.navigateTo({
					url:'/pagesub/goods_list/goods_list?query='+item
				})
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw') || [])
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-list{
	padding: 0 5px;
	.search-item{
		display: flex;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		align-items: center;
		justify-content: space-between;
		.goods-name{
			//文字不允许换行
			white-space: nowrap;
			//超出部分隐藏
			overflow: hidden;
			//超出部分的文字用...代替
			text-overflow: ellipsis;
			margin-right: 5px;
		}
	}
}
.search-history{
	.search-history-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		padding: 0px 5px;
		border-bottom: 1px solid #efefef;
		height: 40px;
	}
	.search-history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
