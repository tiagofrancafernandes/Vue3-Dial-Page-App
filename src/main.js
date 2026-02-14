import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './router';
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right',
    theme: 'auto',
    clearOnUrlChange: false,
});

app.mount('#app');
