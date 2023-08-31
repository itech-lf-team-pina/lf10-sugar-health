import App from './App.vue'
import { createApp } from 'vue'

import { createRouter, createWebHistory} from 'vue-router'

// import Vue, { createApp } from 'vue'
//import VueRouter from 'vue-router'
import routes from './routes'

// Vue.config.productionTip = false
// const router = new VueRouter({routes})


const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')