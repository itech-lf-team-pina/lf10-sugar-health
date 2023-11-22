<script>
import { BACKEND_URL } from "./baseUrl"

export default {
  name: 'AllProfiles',
  data() {
    return {
      name: '',
      image: '',
      memberID: ''    };
  },
  components: {
    
  },
  methods: {
    sendFormData() {
      // Send the data to the server
      this.sendDataToServer();
    },
    async sendDataToServer() {
      console.log(this.description)
      console.log("From local Storage: " + localStorage.getItem("memberId"))
      try {
        const response = await fetch(`${BACKEND_URL}/profile/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: this.name,
            imageUrl: "https://bit.ly/3QIblUE",
            memberID: localStorage.getItem("memberId")
          }),
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log("the data message: " + data.intake);
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
  <h1>Here you can create a new profile to track sugar </h1>

  <div class="wrapper">
    <div> Please enter data for the new profile. </div>


    <form @submit.prevent="sendFormData" method="POST">
      <!-- Text Input -->
      <label for="productDescription">Profile Name</label>
      <input v-model="name" type="text" id="profileName" name="profileName" required><br>

      <input type="submit" value="Add">
      <br />

    </form>


  </div>
</template>


<style>
input[type=text] {
  width: 10%;
  padding: 12px 20px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 40%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}



.wrapper {
  width: 75%;
  margin: auto;
  border: solid;
  border-radius: 10px;
  border-color: #45a049;

}
</style>


