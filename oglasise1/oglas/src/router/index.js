import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Oglas from "@/views/Oglas";
import Postavi from "@/views/Postavi";
import MojiOglasi from "@/views/MojiOglasi";
import IzmeniOglas from "@/views/IzmeniOglas";

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
  {
    path: '/moji_oglasi',
    name: 'Moji_oglasi',
    component: MojiOglasi
  },
  {
    path: '/edit_oglas/:id',
    name: 'Edit_oglas',
    component: IzmeniOglas
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
