<template>
	<div class="modal">
		<div class="modal-container">
			<div class="modal-title">{{ title }}</div>
			<img src="@/assets/img/close.svg" class="close-btn" @click="closeModal">
			<div class="modal-body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"Modal",
	props:['title'],
	setup (props,{emit}) {
		
		function closeModal(){
			emit('closeModal');
		}
		return {
			closeModal
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/modal.scss';
</style>