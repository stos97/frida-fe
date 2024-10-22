import {createRouter, createWebHistory} from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'

const routes = [
    {
        path: '/register', component: () => import("@/pages/auth/Register.vue")
    },
    {
        path: '/login', component: () => import("@/pages/auth/Login.vue")
    },

    {
        path: '/', redirect: '/home'
    },
    {
        path: '/home', name: 'Home', component: HomePage
    },
    {
        path: '/:notFound(.*)', component: () => import("@/NotFound.vue")
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
