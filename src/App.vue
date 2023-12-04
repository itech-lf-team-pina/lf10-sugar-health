<script setup>
import { sidebarWidth } from './components/sidebar/state'

</script>

<template>
  <Sidebar data-test="sidebar" />
  <div data-test="app" :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>

<script>
import SideBar from './components/sidebar/SideBar.vue'
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
  margin-top: 60px;
}
</style>
