<script>
import SidebarLink from './SidebarLink'
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'

export default {
  data() {
    return {
      signedIn: useCurrentUser(),
      auth: useFirebaseAuth()
    }
  },
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  },
  methods: {

    signingOut() {
      signOut(this.auth)
      window.location.reload()
    }
  }
}
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div>S</div>
        <div>H</div>
      </span>
      <span v-else>Sugar Health</span>
    </h1>


    <SidebarLink to="/" icon="fa-solid fa-arrow-right-to-bracket">Sign In/Out</SidebarLink>
    <SidebarLink v-if="signedIn" to="/sugarIntake" icon="fa-solid fa-check-double">Enter data</SidebarLink>
    <SidebarLink v-if="signedIn" to="/sugarhistory" icon="fa-solid fa-clock-rotate-left">Sugar History</SidebarLink>
    <SidebarLink v-if="signedIn" to="/choose-profile" icon="fa-regular fa-user">Profile Chooser</SidebarLink>
    <SidebarLink v-if="signedIn" to="/profiles" icon="fa-regular fa-id-card">Profile</SidebarLink>

   <!-- <SidebarLink v-if="signedIn" to="/settings" icon="fa-solid fa-gear">Settings</SidebarLink>-->
    <SidebarLink v-if="signedIn" to="/goPremium" icon="fa-solid fa-arrow-up">Go Premium</SidebarLink>
    <SidebarLink to="/aboutus" icon="fa-regular fa-address-card">About Us</SidebarLink>

    <div>
      <span class="collapse-icon" :class="{ 'rotate-180': collapsed }" @click="toggleSidebar">
        <i class="fas fa-angle-double-left"></i>
      </span>
      <button v-if="signedIn" @click="signingOut"> Sign Out </button>
    </div>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #51b15b;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>