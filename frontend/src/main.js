import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'
import './style.scss'
import router from './router'
import App from './App.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import UIComponents from './components/UI'

register();
const app = createApp(App)
app.use(router);
/* define global components */
app.component('Header', Header);
app.component('Footer', Footer)

UIComponents.forEach(component => {
    /* private property .__name */
    app.component(component.__name, component)
});

app.mount('#app');