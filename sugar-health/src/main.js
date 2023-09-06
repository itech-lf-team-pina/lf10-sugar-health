import App from './App.vue'
import { createApp } from 'vue'
import '@fortawesome/fontawesome-free/js/all'


import { createRouter, createWebHistory} from 'vue-router'

import { VueFire, VueFireAuth } from 'vuefire'
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './components/firebase'

// import Vue, { createApp } from 'vue'
//import VueRouter from 'vue-router'
import routes from './routes'

// Vue.config.productionTip = false
// const router = new VueRouter({routes})


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

// This will give you access to some convenient composables like useFirebaseApp(), useFirestore(), useFirebaseAuth and useDatabase() in your components:
{/* <script setup>
import { useFirestore } from 'vuefire'
const db = useFirestore()
</script>

<template>
  <div>...</div>
</template> */}

