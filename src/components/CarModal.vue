<template>
	<div class="car-modal">
		<div class="car-modal-container">
			<div class="car-title">Edit Car</div>
			<img src="@/assets/img/close.svg" class="close-btn" @click="closeModal">
			<div class="car-modal-content">
				<el-form v-model="curCar">
					<el-form-item label="Car Plate">
						<el-input v-model="curCar.carPlate" />
					</el-form-item>
					
					<el-form-item label="Colour">
						<el-select v-model="curCar.colourId" filterable :append-to-body="false" >
							<el-option
								v-for="item in colorList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Propellant">
						<el-select v-model="curCar.propellantId" filterable :append-to-body="false">
							<el-option
								v-for="item in propellantList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Seats">
						<el-input v-model="curCar.seats" type="number"/>
					</el-form-item>
					<el-form-item label="Seats">
						<el-date-picker
							v-model="curCar.expiryDate"
							type="date"
							placeholder="Expiry Date"
							:size="'default'"
							:append-to-body="false"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">Edit</el-button>
						<el-button @click="closeModal">Cancel</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
	name:"CarModal",
	setup (props,{emit}) {
		
		const colorList=ref([{id:1,label:'black'},{id:2,label:'silver'},{id:3,label:'blue'}]);
		const propellantList=ref([{id:1,label:'hybrid'},{id:2,label:'petrol'},{id:3,label:'electric'}]);
		
		// function getColor(){

		// }

		// function getPropellant(){

		// }

		// onMounted(() => {
		// 	getColor();
		// 	getPropellant();
		// });

		const curCar=reactive({
			carPlate:"SRH9547K",
			colourId:1,
			colourLabel:'black',
			propellantId:1,
			propellantLabel:"hybrid",
			seats:5,
			expiryDate:'16-Jul-24',
			companyId:1,
			companyName:'Forever Blue Pte Ltd'
		});

		function onSubmit(){
			console.log('onsubmit')
		}
		
		function closeModal(){
			emit('closeModal');
		}
		return {
			curCar,
			colorList,
			propellantList,

			onSubmit,
			closeModal
		}
	}
}
</script>

<style lang="scss" >
@import '@/styles/carModal.scss';
</style>