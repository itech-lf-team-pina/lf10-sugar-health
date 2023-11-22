import App from './App.vue'
import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/js/all'


import { createRouter, createWebHistory} from 'vue-router'

import { VueFire, VueFireAuth } from 'vuefire'
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './components/firebase'


import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.mount('#app')

