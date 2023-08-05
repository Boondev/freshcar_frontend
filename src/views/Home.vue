<template>
  <div class="home">
    <div class="title">Vehicle Management System</div>
    <div class="filter">
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="Start Date"
        :size="size"
        :append-to-body="false"
      />
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="End Date"
        :size="size"
        :append-to-body="false"
      />
      <el-button @click="search">
      Search
      </el-button>
    </div>
    <div class="car-list">
      <el-table :data="carList" style="width: 100%">
      <el-table-column prop="carPlate" label="Car Plate"/>
      <el-table-column prop="colourLabel" label="Colour" />
      <el-table-column prop="propellantLabel" label="Propellant" />
      <el-table-column prop="seats" label="Seats" />
      <el-table-column prop="companyName" label="Company Name" />
      <el-table-column prop="expiryDate" label="Expiry Date" />
      <el-table-column label="Action">
          <template #default="scope">
            <el-button @click="openEditModal(scope)">Edit</el-button>
          </template>
      </el-table-column>
    </el-table>
    </div>
    <CarModal @close-modal="closeEditModal" v-show="isEditModal"/>

  </div>
</template>

<script>
import store from '@/store';
import { ref } from 'vue'
import CarModal from '@/components/CarModal';

export default {
  name:'Home',
  components:{
    CarModal
  },
  setup () {
    const size = ref('default')
    const color=store.state.color;
    const today=new Date()
    const oneMonthEndDate=new Date();
    oneMonthEndDate.setMonth(oneMonthEndDate.getMonth()+1);

    const startDate=ref(today);
    const endDate=ref(oneMonthEndDate);

    const carList=ref([
      {
        carPlate:"SRH9547K",
        colourId:1,
        colourLabel:'black',
        propellantId:1,
        propellantLabel:"hybrid",
        seats:5,
        expiryDate:'16-Jul-24',
        companyId:1,
        companyName:'Forever Blue Pte Ltd'
      },
      {
        carPlate:"SWQ9077M",
        colourId:2,
        colourLabel:'silver',
        propellantId:2,
        propellantLabel:"petrol",
        seats:2,
        expiryDate:'24-Apr-26',
        companyId:1,
        companyName:'Forever Blue Pte Ltd'
      },
      {
        carPlate:"SWQ4711V",
        colourId:3,
        colourLabel:'blue',
        propellantId:3,
        propellantLabel:"electric",
        seats:5,
        expiryDate:'17-Aug-23',
        companyId:2,
        companyName:'Sky Rentals'
      },
    ]);

    function search(){
      console.log('search');
    }

    const isEditModal=ref(false);
    const curCar=ref({});
    function openEditModal(id){
      isEditModal.value=true;
      curCar.value=carList.value.find((v)=>v.id==id);
    }

    function closeEditModal(){
      isEditModal.value=false;
    }

    return{
      color,
      size,
      startDate,
      endDate,
      carList,
      isEditModal,
      
      search,
      openEditModal,
      closeEditModal
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/home.scss';
</style>