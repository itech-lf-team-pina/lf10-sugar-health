<template>
    <div>
      <vue-google-signin-button
        :clientId="YOUR_CLIENT_ID"
        @success="onSuccess"
        @error="onError"
      />
    </div>
  </template>
  
  <script>
  import VueGoogleSigninButton from 'vue-google-signin-button';
  
  export default  {
    name: "GoogleSignInButton",
    components: {
      VueGoogleSigninButton,
    },
    data() {
      return {
        YOUR_CLIENT_ID: 'YOUR_CLIENT_ID', // Replace with your Client ID
      };
    },
    methods: {
      onSuccess(googleUser) {
        // Handle the successful login here
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        // You can also send the user's ID token to your backend for server-side verification.
      },
      onError(error) {
        // Handle errors here
        console.error('Error during login: ', error);
      },
    },
  };
  </script>
  