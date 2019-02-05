import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snack:{status:false},
    Stepper:false,
    user:''
  },
  mutations: {
    getsnack: (state, data) => {
      state.snack = data
    },
    dStepper: (state, data) => {
      state.Stepper= data      
    },
    addUser: (state, data) => {
     
      state.user= data      
    },
  },
  getters: {
    snack: state => {
      return state.snack
    },
    user: state => {
      return state.user
    },
    Stepper: state => {
      return state.Stepper
    }},
  actions: {}
});
