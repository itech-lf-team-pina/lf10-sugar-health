<script setup>

import {
  getRedirectResult,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

import { GoogleAuthProvider } from 'firebase/auth'
import { useCurrentUser,useFirebaseAuth } from 'vuefire'
import { ref, onMounted } from "vue"
import { BASE_URL } from "./baseUrl"


let signedIn = useCurrentUser()

const auth = useFirebaseAuth() // only exists on client side
const googleAuthProvider = new GoogleAuthProvider()


// display errors if any
const error = ref(null)
function signinRedirect() {
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinRedirect', reason)
    error.value = reason
  })
  setTimeout( async () => {
      console.log("adding user....")

      // check if already exists in the database

      try {
        const response = await fetch(`${BASE_URL}/member`, {
          method: "GET",
          headers: {
          },
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log("Members ", data.message);

          // TODO: check data.message for the current uid
        } else {
          console.error("Error getting members.");
        }

      } catch (error) {
        console.error("An error occurred:", error);
      }

      try {
        console.log("sending post request...", useCurrentUser().value.displayName, useCurrentUser().value.uid )
      const response = await fetch(`${BASE_URL}/member`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            displayName: useCurrentUser().value.displayName,
            login_uid: useCurrentUser().value.uid
           }),
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log("Member created successfully! ", data.message);
        } else {
          // Handle error
          console.error("Error sending data to the server.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }


  }
    , 5000 )}

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
    console.log(useCurrentUser().value)
    // useCurrentUser().value is a proxy, so we are directly accessing uid from value
    if (useCurrentUser().value !== null && useCurrentUser().value !==undefined ) {
      console.log(useCurrentUser().value.reloadUserInfo.displayName)
      console.log(useCurrentUser().value)
    }

  }
    , 5000)


})
</script>

<script>

export default {
  name: 'LogIn',
  data() {
  },
  methods: {
    
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


