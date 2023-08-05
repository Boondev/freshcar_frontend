import { reactive } from 'vue'

const state = reactive({
  color:[],
  carPropellant:[],
})

const methods={
    init(data){
        state.color=data.color;
        state.carPropellant=data.propellant;
    }
}

export default{
    state,
    methods
}