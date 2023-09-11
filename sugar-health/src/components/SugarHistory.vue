<script>
import { BACKEND_URL } from "./baseUrl"

export default {
  name: 'sugarHistory',
  props: {
    msg: String
  },
  methods: {
    async getSugarDataFromServer() {
      
      console.log("From local Storage: " + localStorage.getItem("memberId"))
      const memberID = localStorage.getItem("memberId"); 
      try {
        const response = await fetch(`${BACKEND_URL}/${memberID}//sugar/`, {
          method: "GET",
          headers: {
          },
          
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log(data.memberID);
        } else {
          // Handle error
          console.error("Error sending data to the server.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }


  }
}
</script>


<template>
    <h1> Your sugar history </h1>
    <p>
      This page has a graph showing how much sugar was consumed each day. (vue-chart js)
    </p>
   
  </template>