import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateDessert from '../views/CreateDessert.vue'
import Dessert from '../views/Dessert.vue'
import AdminHome from '../views/AdminHome.vue'
import Login from '../views/Login.vue'
import EditDessert from '../views/EditDessert.vue'
import AdminDessert from '../views/AdminDessert.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create-dessert',
    name: 'create-dessert',
    component: CreateDessert
  },
  {
    path: '/dessert/:id',
    name: 'dessert',
    component: Dessert
  },
  {
    path: '/admindessert/:id',
    name: 'admindessert',
    component: AdminDessert
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHome
  },
  {
    path: '/edit-dessert/:id',
    name: 'edit-dessert',
    component: EditDessert
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
