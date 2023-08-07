<template>
	<div class="car-modal">
		<div class="car-modal-container">
			<div class="car-title">Add New Car</div>
			<img src="@/assets/img/close.svg" class="close-btn" @click="closeModal">
			<div class="car-modal-content">
				<el-form v-model="curCar">
					<el-form-item label="Car Plate">
						<el-input v-model="curCar.carPlate" />
					</el-form-item>
					
					<el-form-item label="Colour">
						<el-select v-model="curCar.colourId" filterable :append-to-body="false" allow-create>
							<el-option
								v-for="item in coloursList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Propellant">
						<el-select v-model="curCar.propellantId" filterable :append-to-body="false" allow-create>
							<el-option
								v-for="item in propellantsList"
								:key="item.id"
								:label="item.label"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Seats">
						<el-input v-model="curCar.seats" type="number" />
					</el-form-item>
					<el-form-item label="Company">
						<el-select v-model="curCar.companyId" filterable :append-to-body="false" allow-create>
							<el-option
								v-for="item in companiesList"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="Expiry Date">
						<el-date-picker
							v-model="curCar.expiryDate"
							type="date"
							placeholder="Expiry Date"
							:size="'default'"
							:append-to-body="false"
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
import { reactive, ref, onMounted } from 'vue';
import {getGeneralData, addCar} from '@/api/index';
import {errorMsg,successMsg} from '@/utils/index';

export default {
	name:"AddCarModal",
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
		});

		const curCar=reactive({
			carPlate:"",
			colourId:null,
			propellantId:null,
			seats:null,
			expiryDate:'',
			companyId:1,
		});

		function onSubmit(){
			// console.log('onsubmit');
			let params={
				car_plate:curCar.carPlate,
				colour_id:curCar.colourId,
				company_id:curCar.companyId,
				propellant_id:curCar.propellantId,
				seats:curCar.seats,
				expiry_date:curCar.expiryDate,
			}
			addCar(params).then((data)=>{
				console.log(data);
				if(data.status==true){
					successMsg(curCar.carPlate+' has been added');
					closeModal();
				}else{

					let msg='';
					Object.values(data.message).forEach(val=>{
						msg+=val+"<br>";
					});
					// console.log(msg);
					errorMsg(data.message?msg:'get general data error');
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
			propellantsList,
			companiesList,

			onSubmit,
			closeModal,
		}
	}
}
</script>

<style lang="scss" >
@import '@/styles/carModal.scss';
</style>