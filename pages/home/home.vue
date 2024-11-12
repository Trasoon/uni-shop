<template>
	<view>
		<!-- 搜索框区域 -->
		<view class="search-box">
			<my-search></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/pagesub/goods_detail/goods_detail?goods_id=` + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<img :src="item.image_src" class="nav-img"/>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 每一层楼层 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层标题区域 -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左边大图片区域 -->
					<navigator class="left-image-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width+'rpx'}" mode="widthFix"/>
					</navigator>
					<!-- 右边4个小图片区域 -->
					<view class="right-image-box">
						<navigator class="right-image-item" v-for="(item2, index2) in item.product_list" :key="index2" v-if="index2!==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixin/tabbar_badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				//轮播图的数据列表
				swiperList: [],
				//分类导航列表
				navList:[],
				//楼层数据
				floorList:[]
			};
		},
		mounted(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			//获取转播图数据
			async getSwiperList(){
				const {data: requests} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(requests.meta.status !== 200){
					return uni.$showMsg()
				}
				this.swiperList = requests.message
			},
			//获取导航数据
			async getNavList(){
				const {data: responses} = await uni.$http.get('/api/public/v1/home/catitems')
				if(responses.meta.status !== 200){
					return uni.$showMsg()
				}
				this.navList = responses.message
			},
			// 通过导航栏进行跳转
			navClickHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFloorList(){
				const {data: responses} = await uni.$http.get('/api/public/v1/home/floordata')
				if(responses.meta.status !== 200){
					return uni.$showMsg()
				}
				//对请求的数据进行处理
				responses.message.forEach(floor =>{
					floor.product_list.forEach(item => {
						item.url = '/pagesub/goods_list/goods_list?' + item.navigator_url.split('?')[1]
					})
				})
				this.floorList = responses.message
			},
		}
	}
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,
	image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img{
		width: 120rpx;
		height: 140rpx;
	}
}
.floor-title{
	width: 100%;
	height: 60rpx;
}

.right-image-box{
	display: flex;
	flex-wrap: wrap;
}
.floor-img-box{
	display: flex;
	padding-left: 10rpx;
}
.right-image-item{
	margin: 10rpx;
}
//搜索框组件置顶且不会被覆盖
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
