<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

</script>

<template>
  <Sidebar data-test="sidebar" />
  <div data-test="app">
    <BCard class="box">
      <router-view />
    </BCard>
  </div>
</template>

<script>
import SideBar from '@/components/navbar/NavBar.vue'
export default {
  name: 'App',
  components: { Sidebar: SideBar }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.box {
  margin: 4vh 5vw;
}
</style>
