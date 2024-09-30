<template>
	<view>
		goods_list
		传过来的参数是：{{goodsName}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsName:''
			};
		},
		onLoad(options){
			this.goodsName = options.query
		}
	}
</script>

<style lang="scss">

</style>
