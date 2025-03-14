import {createRouter, createWebHistory} from '@ionic/vue-router';
import store from "@/store/index.js";

const routes = [
    {
        path: '/', redirect: '/login'
    },
    {
        path: '/register',
        component: () => import("@/pages/auth/RegisterPage.vue"),
        meta: {
            authRequired: false,
        },
    },
    {
        path: '/login',
        component: () => import("@/pages/auth/LoginPage.vue"),
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
        component: () => import("@/pages/categories/CategoriesPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/categories/add',
        component: () => import("@/pages/categories/AddCategoryPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/services',
        component: () => import("@/pages/services/ServicesPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/services/add',
        component: () => import("@/pages/services/AddServicePage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/additions',
        component: () => import("@/pages/additions/AdditionsPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/additions/add',
        component: () => import("@/pages/additions/AddAdditionPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/workers',
        component: () => import("@/pages/worker/WorkersPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/workers/:id/details',
        component: () => import("@/pages/worker/WorkerDetailsPage.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/worker/:workerId/service/:serviceId',
        component: () => import("@/pages/worker/EditWorkerService.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/worker/:id/service/add',
        component: () => import("@/pages/worker/AddWorkerServicePage.vue"),
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
