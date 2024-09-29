<template>
	<view>
		<view class="scrool-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scrool-view" scroll-y="true" :style="{height: wh + 'px'}">
				<!-- <block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scrool-view-item', index === active ? 'active':'']">
						{{item.cat_name}}
					</view>
				</block> -->
				<view v-for="(item,index) in cateList" 
				:key="index" 
				:class="['left-scrool-view-item', index === active ? 'active':'']"
				@click="activeChanged(index)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scrool-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<!-- 二级分类区域 -->
				<view class="cate-v2" v-for="(item2, index2) in cateLevel2" :key="index2">
					<!-- 二级分类标题 -->
					<view class="cate-v2-title">/{{item2.cat_name}}/</view>
					<!-- 三级分类区域 -->
					<view class="cate-v3-list">
						<navigator class="cate-v3-item" v-for="(item3, index3) in item2.children" :key="index3" :url="'/pagesub/goods_list/goods_list?cid='+item3.cat_id">
							<!-- 三级分类图片 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 三级分类文本 -->
							<text>{{item3.cat_name}}</text>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0 ,//当前设备可用高度
				cateList:[],//保存后端传来的请求列表
				active: 0,//哪个分类被点击了，0表示第0个位置的分类名被点击了
				cateLevel2:[],//二级分类列表
				scrollTop:0,//切换一级分类时使滚动条置顶
			};
		},
		mounted(){
			const info = uni.getSystemInfoSync()
			this.wh = info.windowHeight
			this.getCateList()
		},
		methods:{
			//请求分类列表
			async getCateList(){
				const {data: rep} = await uni.$http.get('/api/public/v1/categories')
				this.cateList = rep.message//一级分类名，放在左侧滚动栏
				this.cateLevel2 = rep.message[0].children//将第一个的二级分类名（默认第一个位置）进行赋值；当更改一级分类名时通过activeChanged进行更改
				
			},
			//点击分类名后更改分类样式
			activeChanged(index){
				this.active = index
				//更改二级分类
				this.cateLevel2 = this.cateList[index].children
				//二级分类区域置顶
				this.scrollTop = this.scrollTop === 0 ? 1:0
			}
		}
	}
</script>

<style lang="scss">
.scrool-view-container{
	display: flex;
}
.left-scrool-view{
	width: 120px;
}
.left-scrool-view-item{
	background-color: #F7F7F7;
	line-height: 40px;
	text-align: center;
	font-size: 12px;
	&.active{
		background-color: #FFFFFF;
		position: relative;
		&::before{
			content: ' ';
			display: block;
			width: 3px;
			height: 20px;
			background-color: #04a38d;
			position: absolute;
			top: 25%;
			left: 0;
		}
	}
}
.cate-v2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}
.cate-v3-list{
	display: flex;
	flex-wrap: wrap;
	.cate-v3-item{
		width: 33.3%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		image{
			height: 60px;
			width: 60px;
		}
		text{
			font-size: 12px;
		}
	}
}
</style>
