import { createWebHistory, createRouter } from "vue-router";
import store from "../store";
import App from "../App.vue";
import Main from "@/pages/Main.vue";
import Catalog from "@/pages/Catalog.vue";
import AboutUs from "@/pages/AboutUs.vue";
import MainAdmin from "@/pages/admin/MainAdmin.vue";
import Clients from "@/pages/Clients.vue";
import Contacts from "@/pages/Contacts.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Cart from '@/pages/Cart.vue'
import ErrorPage from '@/pages/ErrorPage.vue'

const routes = [
    { path: "/", component: Main },
    { path: "/catalog/:searchString?", component: Catalog },
    { path: "/about-us", component: AboutUs },
    { path: "/clients", component: Clients },
    { path: "/contacts", component: Contacts },
    { path: "/admin", component: MainAdmin, meta: { forAdmin: true } },
    { path: "/cart", component: Cart },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/404", component: ErrorPage },
    { path: '/:pathMatch(.*)*', component: ErrorPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const user = store.getters['user'];

    if (to?.meta?.forAdmin) {

        if (user.admin) {
            next();
            return;
        } else {
            next('/404')
            return;
        }
    }
    
    if((to.path === '/login' || to.path === '/register') && user?.name) {
        next('/');
        return;
    }
    next();
});

export default router;
