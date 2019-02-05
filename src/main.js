import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import stepper from "./components/Stepper";
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false;
Vue.component("stepper", stepper);

Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyAIKSjqFnVEOcmuLFWaSyXfhBLS3a-zII4",
  authDomain: "bechtle-2906f.firebaseapp.com",
  databaseURL: "https://bechtle-2906f.firebaseio.com",
  projectId: "bechtle-2906f",
  storageBucket: "bechtle-2906f.appspot.com",
  messagingSenderId: "14300049889"
})
export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
