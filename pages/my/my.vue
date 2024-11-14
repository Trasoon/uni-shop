<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixin/tabbar_badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('moduleUser',['token'])
		}
	}
</script>

<style lang="scss">
page, .my-container{
	height: 100%;
}
</style>
