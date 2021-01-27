import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Oglas from "@/views/Oglas";
import Postavi from "@/views/Postavi";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oglas/:id',
    name: 'oglas',
    component: Oglas
  },
  {
    path: '/postavi_oglas',
    name: 'Postavi_oglas',
    component: Postavi
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
