<template>
	<div class="car-modal">
		<div class="car-modal-container">
			<div class="car-title">Edit Car</div>
			<img src="@/assets/img/close.svg" class="close-btn" @click="closeModal">
			<div class="car-modal-content">
				<el-form v-model="curCar">
					<el-form-item label="Car Plate">
						<!-- <img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.car_plate==false" @click="edit('car_plate')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('car_plate')"> -->
						<el-input v-model="curCar.car_plate" :disabled="canEdit.car_plate==false"/>
					</el-form-item>
					
					<el-form-item label="Colour">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.colour_id==false" @click="edit('colour_id')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('colour_id')">
						<el-select v-model="curCar.colour_id" filterable :append-to-body="false" :disabled="canEdit.colour_id==false" allow-create>
							<el-option
								v-for="item in coloursList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Propellant">
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.propellant_id==false" @click="edit('propellant_id')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('propellant_id')">
						<el-select v-model="curCar.propellant_id" filterable :append-to-body="false" :disabled="canEdit.propellant_id==false" allow-create>
							<el-option
								v-for="item in propellantsList
"
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
						<img src="@/assets/img/edit.svg" alt="" class="edit-btn" v-if="canEdit.expiry_date==false" @click="edit('expiry_date')">
						<img src="@/assets/img/save.svg" alt="" class="save-btn" v-else @click="save('expiry_date')">
						<el-date-picker
							v-model="curCar.expiry_date"
							type="date"
							placeholder="Expiry Date"
							:size="'default'"
							:append-to-body="false"
							:disabled="canEdit.expiry_date==false"
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
import { reactive, ref, onMounted} from 'vue';
import {getGeneralData, updateCar} from '@/api/index';
import {errorMsg ,successMsg} from '@/utils/index';

export default {
	name:"CarModal",
	props:['selectedCar'],
	setup (props,{emit}) {
		
		const coloursList=ref([]);
		const propellantsList=ref([]);
		const companiesList=ref([]);

		onMounted(() => {
			getGeneralData().then((data)=>{
				if(data.status==true){
					let temp=data.data;
					coloursList.value=temp.coloursList;
					propellantsList.value=temp.propellantsList;
					companiesList.value=temp.companiesList;
				}else{
					errorMsg(data.message??'get general data error');
				}
			}).catch((e)=>{
				errorMsg(e??'get general data error');
			});

			init()
		});

		function init(){
			curCar.car_plate=props.selectedCar.car_plate;
			curCar.colour_id=props.selectedCar.colour_id;
			curCar.propellant_id=props.selectedCar.propellant_id;
			curCar.seats=props.selectedCar.seats;
			curCar.expiry_date=props.selectedCar.expiry_date;
		}

		const canEdit=reactive({
			car_plate:false,
			colour_id:false,
			propellant_id:false,
			seats:false,
			expiry_date:false
		});

		const fieldChanges=ref([]);

		function edit(field){
			canEdit[field]=true;
			if(!fieldChanges.value.includes(field))
				fieldChanges.value.push(field);
			console.log(fieldChanges);
		}

		function save(field){
			canEdit[field]=false;
		}

		const curCar=reactive({
			car_plate:"",
			colour_id:null,
			propellant_id:null,
			seats:null,
			expiry_date:null,
			company_id:null,
		});

		function onSubmit(){
			let params={
				car_plate:curCar.car_plate,
			};

			if(fieldChanges.value.length>0){
				fieldChanges.value.forEach((val)=>{
					params[val]=curCar[val];
				});
				params['fields']=fieldChanges.value;
			}

			updateCar(params).then((data)=>{
				console.log(data);
				if(data.status==true){
					successMsg(curCar.car_plate+' has been added');
					closeModal();
				}else{
					errorMsg(data.message??'get general data error');
				}
			}).catch((e)=>{
				console.log('error'+e);
				// errorMsg(e.message??'get general data error');
			});
		}
		
		function closeModal(){
			emit('closeModal');
		}


		return {
			curCar,
			coloursList,
			propellantsList
,
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