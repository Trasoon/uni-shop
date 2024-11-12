import {mapGetters} from 'vuex'

export default {
	computed:{
		...mapGetters('moduleCart',['total'])
	},
	watch:{
	 total(){
		 //total更改时，更新购物车徽标
		 this.setBadge()
	 }	
	},
	onShow(){
		//当页面首次展示时，更新购物车徽标
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	}
}