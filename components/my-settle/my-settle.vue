<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio :checked="isFullCheck" color="#04a38d" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3,
				timer: null,//保存定时器，用于销毁定时器
			};
		},
		computed:{
			...mapGetters('moduleCart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('moduleUser',['addstr']),
			...mapState('moduleUser',['token']),
			...mapState('moduleCart',['cart']),
			isFullCheck(){
				return this.checkedCount===this.total
			}
		},
		methods:{
			...mapMutations('moduleCart',['updateAllGoodsState']),
			...mapMutations('moduleUser',['updateRedirectInfo']),
			//全选或全不选
			changeAllState(){
				console.log(this.isFullCheck)
				this.updateAllGoodsState(!this.isFullCheck)
			},
			//点击结算按钮
			settlement(){
				// 第一判断是否有选中的商品
				if(!this.checkedCount)return uni.$showMsg("请选择要结算的商品！")
				// 第二判断用户是否选择了收货地址
				if(!this.addstr)return uni.$showMsg("请选择收货地址！")
				// 第三判断用户是否登录,没有登录就跳转到登录页面
				// if(!this.token) return uni.$showMsg("请先登录！")
				if(!this.token) return this.delayNavigate()
				
				// 用户登录之后，进行微信支付
				this.payOrder()
				
			},
			// 显示倒计时的提示消息
			showTips(n){
				uni.showToast({
					// 不显示任何图标
					icon: 'none',
					// 提示的消息
					title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
					// 防止点击穿透
					mask: true,
					// 1.5秒后自动消失,设置成1.5秒是为了让该消息一直显示，1.5>1
					duration: 1500
				})
			},
			// 延迟导航到my界面
			delayNavigate(){
				// 展示提示信息
				this.showTips(this.seconds)
				
				// 创建定时器,每1秒执行一次
				this.timer = setInterval(()=>{
					this.seconds--
					
					// 定时器到时间后
					if(this.seconds <= 0){
						// 清除定时器
						clearInterval(this.timer)
						this.seconds = 3
						//跳转到my页面
						uni.switchTab({
							url: '/pages/my/my',
							// 页面跳转成功后的回调函数
							success:() => {
								// 利用vuex将跳转信息保存到store中
								this.updateRedirectInfo({
									// 跳转方式
									openType:'switchTab',
									// 从哪个页面跳转过去的
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			// 微信支付
			async payOrder(){
				// 1 创建订单
				// 1.1 订单价格、收货地址、商品详情
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id : x.goods_id,
						goods_number : x.goods_count,
						goods_price : x.goods_price
					}))
				}
				// 1.2 发起请求创建订单
				const {data: res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败!')
				// 1.3 获取服务器订单号
				const orderNumber = res.message.order_number
				
				// 2 订单预支付
				// 2.1 将订单编号发送到服务器
				const {data: res1} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number: orderNumber})
				if(res1.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
				// 2.2 服务器响应,返回订单支付的相关必要参数
				const payInfo = res1.message.pay
				
				console.log(payInfo)
				// 3 发起微信支付
				// 3.1 使用微信接口 将支付相关的参数传到微信接口
				const [err, succ] = await uni.requestPayment({
					payInfo
				})
				if(err) return uni.$showMsg('订单未支付！')
				// 查看后端是否记录了该笔订单
				const {data: res2} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {order_number: orderNumber})
				if(res2.meta.status !== 200) return uni.$showMsg('订单未支付！')
				// 3.2 监听回调函数
				uni.showToast({
					title: '订单支付已完成！',
					icon: 'success'
				})
			},
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position:fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #04a38d;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #04a38d;
		height: 50px;
		color: white;
		line-height: 50px;
		padding:0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>