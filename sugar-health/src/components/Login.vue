<script setup>
import {
  getRedirectResult,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { GoogleAuthProvider } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth, getCurrentUser } from 'vuefire'
import { ref, onMounted } from "vue"
import { BASE_URL } from "./baseUrl"


let signedIn = useCurrentUser()

const auth = useFirebaseAuth() // only exists on client side
const googleAuthProvider = new GoogleAuthProvider()

// display errors if any
const error = ref(null)
function signinRedirect() {
    // this methods returns Promise<UserCredentials>, can access User properties through "user" property.

  signInWithPopup(auth, googleAuthProvider).then(async (data) => {
    console.log("Sign in with popup returns UserCredentials: ", data)

      // check if already exists in the database
    try {
      const response = await fetch(`${BASE_URL}/member`, {
        method: "GET",
        headers: {
        },
      });

      if (response.ok) {
        const resp = await response.json(); // Read the response as JSON
        console.log("Members ", resp.message);

        // TODO: check data.message for the current uid
      } else {
        console.error("Error getting members.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    try {
      console.log("sending post request...", data.user.displayName, data.user.uid)
      const response = await fetch(`${BASE_URL}/member`, {
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
        const data = await response.json(); // Read the response as JSON
        console.log("Member created successfully! ", data.message);
      } else {
        // Handle error
        console.error("Error while addind a member.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

  })
  .catch((reason) => {
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

  // this methods returns Promise<User>, can access its properties directly
  getCurrentUser().then((data) => {
    if (data) {
      console.log(data.displayName)
      console.log(data.uid)
    } 
  })
})

</script>

<script>

export default {
  name: 'LogIn',
  methods: {

  }
}


</script>

<template>
  <h1>Login Page</h1>
  <p v-if="!signedIn"> Please login to use the service. Thank you.</p>
  <p v-else> Welcome, {{ useCurrentUser().value.displayName }}</p>

  <div>
    <main>
      <button v-if="!signedIn" @click="signinRedirect">SignIn with Google</button>
      <button v-else @click="signingOut">Sign Out</button>
    </main>

  </div>
</template>


