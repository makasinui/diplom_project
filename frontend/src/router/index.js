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

const routes = [
    { path: "/", component: Main },
    { path: "/catalog/:searchString?", component: Catalog },
    { path: "/about-us", component: AboutUs },
    { path: "/clients", component: Clients },
    { path: "/contacts", component: Contacts },
    { path: "/admin", component: MainAdmin, meta: {forAdmin: true} },
    { path: "/cart", component: Cart },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to?.meta?.forAdmin) {
        const user = store.getters.user;
        if (user.name) {
            next();
        }
    }
    next();
});

export default router;
