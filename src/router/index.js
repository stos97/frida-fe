import {createRouter, createWebHistory} from '@ionic/vue-router';
import store from "@/store/index.js";

const routes = [
    {
        path: '/', redirect: '/login'
    },
    {
        path: '/register',
        component: () => import("@/pages/auth/Register.vue"),
        meta: {
            authRequired: false,
        },
    },
    {
        path: '/login',
        component: () => import("@/pages/auth/Login.vue"),
        meta: {
            authRequired: false,
        },
    },
    {
        path: '/admin',
        component: () => import("@/pages/admin/AdminHomePage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/worker',
        component: () => import("@/pages/worker/WorkerHomePage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/user',
        component: () => import("@/pages/user/UserHomePage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/categories',
        component: () => import("@/pages/categories/CategoryList.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/services',
        component: () => import("@/pages/services/ServicesList.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/additions',
        component: () => import("@/pages/additions/AdditionList.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/:notFound(.*)', component: () => import("@/NotFound.vue")
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _, next) => {
    if (to.meta.authRequired && !store.getters.isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router
