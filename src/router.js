import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import datatable from "./views/datatable_user"
import login from "./views/login"


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/daten",
      name: "datatable",
      component: datatable
    },
    
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
