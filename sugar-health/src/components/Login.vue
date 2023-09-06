<script setup>

import {
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'

import { GoogleAuthProvider } from 'firebase/auth'
import { useCurrentUser,useFirebaseAuth } from 'vuefire'
import { ref, onMounted } from "vue"

let signedIn = useCurrentUser()

const auth = useFirebaseAuth() // only exists on client side
const googleAuthProvider = new GoogleAuthProvider()


// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
}

function signingOut() {
  signOut(auth)
  window.location.reload()
}



onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })

  // loading the user takes some time
  setTimeout(() => {

    // useCurrentUser().value is a proxy, so we are directly accessing uid from value
    if (useCurrentUser().value !== null && useCurrentUser().value !==undefined ) {
      console.log(useCurrentUser().value.reloadUserInfo.displayName)
      console.log(useCurrentUser().value.uid)
    }

  }
    , 5000)


})
</script>

<script>

export default {
  name: 'LogIn',
  data() {
    //  signedIn: false
  }
}
</script>

<template>
  <h1>Login Page</h1>
  <p v-if="!signedIn"> Please login to use the service. Thank you.</p>
  <p v-else> Welcome, {{ useCurrentUser().value.reloadUserInfo.displayName }}</p>

  <div>
    <main>
      <ErrorBox v-if="error" :error="error" />
      <button v-if="!signedIn" @click="signinRedirect">SignIn with Google</button>
      <button v-else @click="signingOut">Sign Out</button>

    </main>

  </div>
</template>


