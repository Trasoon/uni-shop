<template>
<view class="login-box">
	<view class="login-container">
		<!-- 用户图标 -->
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- 一键登录按钮-->
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">
			登录后尽享更多权益
		</view>
	</view>
</view>
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('moduleUser',['redirectInfo']),
		},
		methods:{
			...mapMutations('moduleUser',['updateUserInfo','updateToken','updateRedirectInfo']),
			// 用户授权之后，获取用户的基本信息
			getUserProfile(e){
				uni.getUserProfile({
					desc:'你的授权信息',
					// 用户授权成功
					success:(res)=>{
						// 将用户信息持久化存储
						this.updateUserInfo(res.userInfo)
						// 获取登录成功后的token字符串
						this.getToken(res)
						
					},
					// 用户授权失败
					fail:(res)=>{
						return uni.$showMsg("您取消了登录授权")
					}
				})
			},
			async getToken(info){
				const [err, res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok')return uni.$showMsg('登录失败！')
				console.log(res)
				// 准备请求参数
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				
				// 向后端获取token
				// const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// console.log(loginResult.message.token)
				// 固定token
				const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
				this.updateToken(token)
				// 若有原页面,则跳转回原页面
				this.navigateBack()
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						// 回调函数，将重定向数据清空
						success:() => {
							this.updateRedirectInfo(null)
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #04a38d;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}

</style>