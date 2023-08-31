<template>
  
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <LogIn />
  <AboutUs />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LogIn from './components/LogIn.vue'
import AboutUs from './components/AboutUs.vue'



export default {
  name: 'App',
  components: {
    HelloWorld,
    LogIn,
    AboutUs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
