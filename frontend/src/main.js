import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'
import './style.scss'
import router from './router'
import App from './App.vue'
import Layout from './components/Layout.vue'
import UIComponents from './components/UI'
import Loader from './components/Loader.vue'
import store from './store'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css';

/* регистрируем компоненты слайдера */
register();
const app = createApp(App)
app.use(router).use(store).use(ToastPlugin);
/* define global components */
app.component('Layout', Layout);
app.component('Loader', Loader)

UIComponents.forEach(component => {
    /* приватное поле property.__name */
    app.component(component.__name, component)
});

app.mount('#app');