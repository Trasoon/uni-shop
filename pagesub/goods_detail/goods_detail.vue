<template>
	<view class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
				<img :src="item.pics_big" alt="" @click="preview(index)"/>
			</swiper-item>
		</swiper> 
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 商品主体信息 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">免运费</view>
		</view>
		<!-- 商品介绍区域 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 底部导航栏区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId:'',
				goodsInfo:{},
				// 导航栏配置项
				options: [ {
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2,
					infoBackgroundColor:"#038c77"
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#038c77',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}
				]
			};
		},
		onLoad(options){
			this.goodsId = options.goods_id
			this.getGoodsDetail()
		},
		methods:{
			//获取商品详情数据
			async getGoodsDetail(){
				const {data: rep} = await uni.$http.get('/api/public/v1/goods/detail?goods_id='+this.goodsId)
				if(rep.meta.status !== 200)return uni.$showMsg()
				rep.message.goods_introduce = rep.message.goods_introduce.replace(/<img /g, '<img style="display: block;" ')
				this.goodsInfo = rep.message
				},
			//点击图片预览轮播图
			preview(index){
				uni.previewImage({
					current: index,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			// 点击导航栏出发函数
			//店铺和购物车
			onClick (e) {
				console.log(e)
			},
			//加入购物车和立即购买
			buttonClick (e) {
				console.log(e)
				this.options[1].info++
			  }
		}
	}
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	img {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 10px;
	padding-right: 0px;
	.price{
		color: #04a38d;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
			margin-right: 10px;
		}
		.favi{
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.yf{
		font-size: 13px;
		color: gray;
		margin: 10px 0;
	}
}
.goods-nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.goods-detail-container{
	padding-bottom: 50px;
}
</style>
