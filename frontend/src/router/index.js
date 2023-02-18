import App from "../App.vue";
import Main from "../pages/Main.vue";
import { createWebHistory, createRouter } from "vue-router";
import Catalog from "../pages/Catalog.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/catalog", component: Catalog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
