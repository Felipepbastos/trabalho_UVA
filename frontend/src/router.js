import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import NewAppointment from './components/NewAppointment.vue'
import Admin from './components/Admin.vue'
import Register from './components/Register.vue'

const routes = [
   { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/new', component: NewAppointment },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

