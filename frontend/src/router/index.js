import App from "../App.vue"
import Main from "../pages/Main.vue"
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: Main },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;