
<script setup>
import {
  getRedirectResult,
  signInWithRedirect,
  // signOut,
} from 'firebase/auth'

import { GoogleAuthProvider } from 'firebase/auth'
import { 
  // useCurrentUser, 
  useFirebaseAuth } from 'vuefire'
import {ref, onMounted} from "vue"

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

// only on client side
onMounted(() => {
  getRedirectResult(auth).catch((reason) => {
    console.error('Failed redirect result', reason)
    error.value = reason
  })
})
</script>

<script>

export default {
  name: 'LogIn',
  props: {
    msg: String
  },
}
</script>

<template>
  <h1>Login</h1>
  <p> Please login to use the service. Thank you.</p>
  <div>
    <main>
    <ErrorBox v-if="error" :error="error" />
    <button @click="signinRedirect">SignIn with Google</button>
  </main>
   
  </div>
</template>


