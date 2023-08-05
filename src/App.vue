<template>
  <router-view></router-view>
</template>

<script>
import store from '@/store';
import { reactive } from 'vue'

export default {
  name:'App',
  setup () {
    const mystore=store;
    const data=reactive({
      color:[{id:1,label:'black'},{id:2,label:'silver'},{id:3,label:'blue'}],
      propellant:[{id:1,label:'hybrid'},{id:2,label:'petrol'},{id:3,label:'electric'}]
    });

    mystore.methods.init(data);
  }
}
</script>

<style>
</style>
