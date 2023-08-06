<template>
	<div class="car-modal">
		<div class="car-modal-container">
			<div class="car-title">Edit Car</div>
			<img src="@/assets/img/close.svg" class="close-btn" @click="closeModal">
			<div class="car-modal-content">
				<el-form v-model="curCar">
					<el-form-item label="Car Plate">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.carPlate==false" @click="edit('carPlate')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('carPlate')">
						<el-input v-model="curCar.carPlate" :disabled="canEdit.carPlate==false"/>
					</el-form-item>
					
					<el-form-item label="Colour">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.colour==false" @click="edit('colour')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('colour')">
						<el-select v-model="curCar.colourId" filterable :append-to-body="false" :disabled="canEdit.colour==false" allow-create>
							<el-option
								v-for="item in colorList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Propellant">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.propellant==false" @click="edit('propellant')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('propellant')">
						<el-select v-model="curCar.propellantId" filterable :append-to-body="false" :disabled="canEdit.propellant==false" allow-create>
							<el-option
								v-for="item in propellantList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Seats">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.seats==false" @click="edit('seats')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('seats')">
						<el-input v-model="curCar.seats" type="number" :disabled="canEdit.seats==false"/>
					</el-form-item>
					<el-form-item label="Expiry Date">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.expiryDate==false" @click="edit('expiryDate')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('expiryDate')">
						<el-date-picker
							v-model="curCar.expiryDate"
							type="date"
							placeholder="Expiry Date"
							:size="'default'"
							:append-to-body="false"
							:disabled="canEdit.expiryDate==false"
						/>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">Submit</el-button>
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
		const canEdit=reactive({
			carPlate:false,
			colour:false,
			propellant:false,
			seats:false,
			expiryDate:false
		});

		function edit(field){
			canEdit[field]=true;
		}

		function save(field){
			canEdit[field]=false;
		}

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
			closeModal();
		}
		
		function closeModal(){
			emit('closeModal');
		}
		return {
			curCar,
			colorList,
			propellantList,
			canEdit,

			edit,
			save,
			onSubmit,
			closeModal,
		}
	}
}
</script>

<style lang="scss" >
@import '@/styles/carModal.scss';
</style>