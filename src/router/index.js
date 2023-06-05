import { createRouter, createWebHistory } from 'vue-router'
import frutas from '../view/frutas_view.vue'
import home from '../view/home_view.vue'
import cadastro from '../view/cliente_view.vue'

const routes = [
  {
    path: '/frutas',
    name: 'frutas',
    component: frutas
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: cadastro
  },
  
  {
    path: '/',
    name: 'home',
    component: home
  },
  
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router