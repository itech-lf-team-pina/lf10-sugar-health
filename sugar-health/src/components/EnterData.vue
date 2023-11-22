<script>
import { BACKEND_URL } from "./baseUrl"
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  name: 'EnterData',
  data() {
    return {
      sugarContent: '',
      productConsumed: '',
      sugarConsumed: '',
      description: ''
    };
  },
  components: {
    StreamBarcodeReader
  },
  methods: {
    calculateSugarIntake() {
      this.sugarConsumed = (this.productConsumed / 100 * this.sugarContent).toFixed(2)
    },
    sendFormData() {
      // Send the data to the server
      this.sendDataToServer();
    },
    async onDecode(result) {
      console.log(result)
      console.log("onDecode")

      try {
        const response = await fetch(`${BACKEND_URL}/barcode/${result}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log("the data message: ", data);
        } else {
          // Handle error
          console.error("Error sending data to the server.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

    },
    async sendDataToServer() {
      console.log(this.description)
      console.log("From local Storage: " + localStorage.getItem("memberId"))
      try {
        const response = await fetch(`${BACKEND_URL}/sugar/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            intake: this.sugarConsumed,
            description: this.description,
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
  <h1>Here you can enter your sugar intake</h1>
  <p> Welcome to your sugar tracking helper.</p>


  <div class="wrapper">
    <div> Please enter you sugar intake for today. </div>

    <StreamBarcodeReader @decode="onDecode"></StreamBarcodeReader>

    <form @submit.prevent="sendFormData" method="POST">
      <!-- Text Input -->
      <label for="productDescription">Product Description</label>
      <input v-model="description" type="text" id="productDescription" name="productDescription" required><br>

      <label for="sugarContent">Sugar Content in 100 gr of product</label>
      <input v-model="sugarContent" type="text" id="sugarContent" name="sugarContent" @input="calculateSugarIntake"><br>

      <label for="productConsumed">Consumed product in gr</label>
      <input v-model="productConsumed" type="text" id="productConsumed" name="productConsumed"
        @input="calculateSugarIntake"><br>

      <label for="last_name">Sugar consumed in gr</label>
      <input type="text" id="sugarConsumed" v-model="sugarConsumed"><br>

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


