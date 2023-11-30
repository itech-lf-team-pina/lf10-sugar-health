<script setup>
import {
  getRedirectResult,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth, getCurrentUser } from 'vuefire'
import { ref, onMounted } from "vue"
import { BACKEND_URL } from "./baseUrl"


let signedIn = useCurrentUser()

const auth = useFirebaseAuth() // only exists on client side
const googleAuthProvider = new GoogleAuthProvider()

const facebookAuthProvider = new FacebookAuthProvider()

// display errors if any
const error = ref(null)

async function createLoggedInUser(data) {
  try {
    console.log("sending post request...", data.user.displayName, data.user.uid)
    const response = await fetch(`${BACKEND_URL}/account/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: data.user.displayName,
        login_uid: data.user.uid
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("displayName", JSON.stringify(data.displayName));
      localStorage.setItem("accountId", data.id);

      console.log("Account created successfully! ", data.displayName);
      console.log(data.id);
      console.log(data.login_uid);
    } else {
      // Handle error
      console.error("Error while addind a account.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
function signInWithGoogle() {
  signInWithPopup(auth, googleAuthProvider).then(async (data) => {
    console.log("Sign in (Google) with popup returns UserCredentials: ", data)
    // To make a new User
    await createLoggedInUser(data)
  })
    .catch((reason) => {
      console.error('Failed signInWithGoogle', reason)
      error.value = reason
    })
}

function signInWithFacebook() {
  signInWithPopup(auth, facebookAuthProvider).then(async (data) => {
    console.log("Sign in (Facebook) with popup returns UserCredentials: ", data)
    // To make a new User
    await createLoggedInUser(data)
  })
      .catch((reason) => {
        console.error('Failed signInWithFacebook', reason)
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

  // this methods returns Promise<User>, can access its properties directly
  getCurrentUser().then((data) => {

    if (data) {

      console.log(data.displayName)
      console.log(data.uid)

    }
    return (data)
  })
})

</script>

<script> 

export default {
  name: 'LogIn'
}


</script>

<template>
  <h1>Sign In Page</h1>
  <p v-if="!signedIn"> Please Sign In to use the service. Thank you.</p>
  <p v-else> Welcome, {{ useCurrentUser().value.displayName }}</p>

  <div>
    <main>
      <button v-if="!signedIn" @click="signInWithGoogle">SignIn with Google</button>
      <br />
      <button v-if="!signedIn" @click="signInWithFacebook">SignIn with Facebook</button>
      <button v-else @click="signingOut">Sign Out</button>
    </main>

  </div>
</template>

<style scoped>
button {
  margin: 4px;
}
</style>