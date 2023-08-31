<template>
    <nav>
      <router-link to="/"> Home </router-link>
      <router-link to="/login"> Login </router-link>
      <router-link to="/aboutus"> About Us </router-link>
      <router-link to="/settings"> Settings </router-link>
      <router-link to="/sugarhistory"> Your History</router-link>
      <router-link to="/challenges"> Challenges</router-link>
      <router-view />
    </nav>
  
 
</template>

<script>


export default {
  name: 'App',
  components: {
 
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
