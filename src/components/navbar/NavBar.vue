<script>
import NavBarLink from './NavBarLink.vue'
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
  components: { NavBarLink },
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
  <BNavbar class="navbar" toggleable="lg" variant="primary" v-b-color-mode="'dark'">
    <BNavbarBrand href="/sugarhistory">Sugar Health</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem>
          <NavBarLink v-if="signedIn" to="/sugarhistory" icon="fa-solid fa-clock-rotate-left">Sugar History</NavBarLink>
        </BNavItem>
        <BNavItem>
          <NavBarLink v-if="signedIn" to="/sugarIntake" icon="fa-solid fa-check-double">Enter data</NavBarLink>
        </BNavItem>
        <BNavItem>
          <NavBarLink v-if="signedIn" to="/choose-profile" icon="fa-regular fa-user">Profile Chooser</NavBarLink>
        </BNavItem>
        <BNavItem>
          <NavBarLink v-if="signedIn" to="/profiles" icon="fa-regular fa-id-card">Profile</NavBarLink>
        </BNavItem>
        <BNavItem>
          <NavBarLink v-if="signedIn" to="/goPremium" icon="fa-solid fa-arrow-up">Go Premium</NavBarLink>
        </BNavItem>
      </BNavbarNav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItem>
          <NavBarLink to="/" icon="fa-solid fa-arrow-right-to-bracket">Account</NavBarLink>
        </BNavItem>
        <BNavItem>
          <NavBarLink to="/aboutus" icon="fa-regular fa-address-card">About Us</NavBarLink>
        </BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>
</style>