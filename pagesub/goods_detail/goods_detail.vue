<template>
	<view>
		goods_detail
		商品的id是：{{goodsId}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId:''
			};
		},
		onLoad(options){
			this.goodsId = options.goods_id
		}
	}
</script>

<style lang="scss">

</style>
