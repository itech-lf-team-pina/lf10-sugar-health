import HelloWorld from './components/HelloWorld.vue'
import LogIn from './components/LogIn.vue'
import AboutUs from './components/AboutUs.vue'

const routes = [
    {path : '/', component : HelloWorld},
    {path : '/login', component : LogIn},
    {path : '/aboutus', component : AboutUs}
]

export default routes