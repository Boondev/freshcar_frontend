<template>
  <div class="home">
    <div class="title">Vehicle Management System</div>
    <div class="filter">
      <el-date-picker
        v-model="date.startDate"
        type="date"
        placeholder="Start Date"
        :size="size"
        :append-to-body="false"
      />
      <el-date-picker
        v-model="date.endDate"
        type="date"
        placeholder="End Date"
        :size="size"
        :append-to-body="false"
      />
      <el-button @click="search">
        Search
      </el-button>
      <el-button @click="resetForm">
        Reset
      </el-button>
      <el-button @click="openAddModal">
        Add New Car
      </el-button>
    </div>
    <div class="car-list">
      <el-table :data="carList" style="width: 100%">
        <el-table-column prop="car_plate" label="Car Plate">
          <template #default="scope">
              <mark v-if="isTwoWeeksLeft(scope.row.expiry_date)">{{ scope.row.car_plate }}</mark>
              <span v-else>{{ scope.row.car_plate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="colour.label" label="Colour" />
        <el-table-column prop="propellant.label" label="Propellant" />
        <el-table-column prop="seats" label="Seats" />
        <el-table-column prop="company.name" label="Company Name" />
        <el-table-column prop="expiry_date" :formatter= "dateFormat" label="Expiry Date" />
        <el-table-column label="Action">
            <template #default="scope">
              <div class="action-btn-group">
                <el-button @click="openEditModal(scope.row)" type="primary">Edit</el-button>
                <el-button @click="openDeleteModal(scope.row)">Delete</el-button>
              </div>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <Modal @close-modal="closeDeleteModal" v-if="isDeleteModal" :title="'Delete Car'">
      <div class="delete-modal">
        <div class="delete-text" v-if="selectedDeleteCar">Are you sure you want to delete {{ selectedDeleteCar.car_plate }}??</div>
        <div class="delete-btn-group">
          <el-button @click="deleteSelectedCar"  type="primary">Delete</el-button>
          <el-button @click="closeDeleteModal">Cancel</el-button>
        </div>
      </div>
    </Modal>
    <CarModal @close-modal="closeEditModal" v-if="isEditModal" :selectedCar="curCar"/>
    <AddCarModal @close-modal="closeAddModal" v-if="isAddModal"/>
  </div>
</template>

<script>
import store from '@/store';
import { ref,reactive, onMounted } from 'vue'
import Modal from '@/components/Modal';
import CarModal from '@/components/CarModal';
import AddCarModal from '@/components/AddCarModal';
import {getCarList,deleteCar} from '@/api/index';
import {successMsg,errorMsg, converDate} from '@/utils/index';


export default {
  name:'Home',
  components:{
    CarModal,
    AddCarModal,
    Modal
  },
  setup () {
    const size = ref('default')
    const color=store.state.color;

    // const startDate=ref();
    // const endDate=ref();
    const date=reactive({
      startDate:null,
      endDate:null,
    });

    const carList=ref([
    ]);

    function search(){
			let params={
				start_date:date.startDate,
        end_date:date.endDate
			}

			getCarList(params).then((data)=>{
				if(data.status==true){
          let temp=data.data;
          carList.value=temp.car_list;
				}else{
					errorMsg(data.message??'get car list error');
				}
			}).catch((e)=>{
				errorMsg(e??'get car list error');
			});
    }

    function resetForm(){
      date.endDate=null;
      date.startDate=null;
      search();
    }

    onMounted(() => {
      search();
    });

    const isEditModal=ref(false);
    const curCar=ref({});
    function openEditModal(data){
      isEditModal.value=true;
      curCar.value=data;
      console.log(curCar)
    }

    function closeEditModal(){
      isEditModal.value=false;
      search();
    }

    const isAddModal=ref(false);
    function openAddModal(){
      isAddModal.value=true;
    }
    function closeAddModal(){
      isAddModal.value=false;
      search();
    }

    const isDeleteModal=ref(false);
    const selectedDeleteCar=ref({});
    function openDeleteModal(data){
      selectedDeleteCar.value=data;
      isDeleteModal.value=true;
    }

    function closeDeleteModal(){
      isDeleteModal.value=false;
      search();
    }

    function deleteSelectedCar(){
      let params={
        car_plate:selectedDeleteCar.value.car_plate
      }

      deleteCar(params).then((data)=>{
				if(data.status==true){
					successMsg(selectedDeleteCar.value.carPlate+' has been deleted');
					closeDeleteModal();
				}else{

					errorMsg(data.message??'get general data error');
				}
			}).catch((e)=>{
				console.log('error'+e);
				// errorMsg(e.message??'get general data error');
			});
    }

    function dateFormat(row, column){
			var date = row[column.property];

			return converDate(date);
		}

    function isTwoWeeksLeft(date){
      const expiry_date=new Date(date);
      const twoWeeksAfterTdy=new Date();
      twoWeeksAfterTdy.setDate(twoWeeksAfterTdy.getDate() + 14);

      return expiry_date<=twoWeeksAfterTdy;
    }

    
    return{
      color,
      size,
      date,
      carList,
      isEditModal,
      isAddModal,
      isDeleteModal,
      curCar,
      selectedDeleteCar,

      search,
      openEditModal,
      closeEditModal,
      openAddModal,
      closeAddModal,
      openDeleteModal,
      closeDeleteModal,
      dateFormat,
      isTwoWeeksLeft,
      deleteSelectedCar,
      resetForm
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/home.scss';
</style>