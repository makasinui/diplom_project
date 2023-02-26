import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'
import './style.scss'
import router from './router'
import App from './App.vue'
import Layout from './components/Layout.vue'
import UIComponents from './components/UI'
import store from './store'

/* регистрируем компоненты слайдера */
register();
const app = createApp(App)
app.use(router).use(store);
/* define global components */
app.component('Layout', Layout);

UIComponents.forEach(component => {
    /* приватное поле property.__name */
    app.component(component.__name, component)
});

app.mount('#app');