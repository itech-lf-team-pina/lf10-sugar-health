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
      description: '',
      useBarcodeScanner: false
    };
  },
  components: {
    StreamBarcodeReader
  },
  methods: {
    calculateSugarIntake() {
      this.sugarConsumed = (this.productConsumed / 100 * this.sugarContent).toFixed(2)
    },
    toggleBarcodeScanner() {
      this.useBarcodeScanner = !this.useBarcodeScanner;
    },
    sendFormData() {
      // Send the data to the server
      this.sendDataToServer();
    },
    async onDecode(result) {
      console.log(result)
      document.getElementById("barcode-scanner-audio").play();


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
          if (data.name !== undefined) {
            this.productConsumed = data.quantity;
            this.sugarContent = data.sugar;
            this.description = data.name;
            this.calculateSugarIntake();
          }
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

    <div class="scanbox-container">
      <div class="container-md form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="barcode-scanner-switch" @click="toggleBarcodeScanner">
        <label class="form-check-label" for="barcode-scanner-switch">Checked switch checkbox input</label>
      </div>

      <div class="container">
        <StreamBarcodeReader v-if="useBarcodeScanner" @decode="onDecode"></StreamBarcodeReader>
      </div>
      <audio id="barcode-scanner-audio">
        <source src="beep.mp3" type="audio/mpeg">
      </audio>
    </div>

    <form @submit.prevent="sendFormData" method="POST">
      <!-- Text Input -->
      <label for="productDescription">Product Description</label>
      <input v-model="description" type="text" id="productDescription" name="productDescription" required><br>

      <label for="sugarContent">Sugar Content in 100 gr/ml of product</label>
      <input v-model="sugarContent" type="text" id="sugarContent" name="sugarContent" @input="calculateSugarIntake"><br>

      <label for="productConsumed">Consumed product in gr/ml</label>
      <input v-model="productConsumed" type="text" id="productConsumed" name="productConsumed"
        @input="calculateSugarIntake"><br>

      <label for="last_name">Sugar consumed in gr/ml</label>
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
.scanbox-container {
  padding: 20px;
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
video {
  width: 50% !important;
  border-radius: 32px;
}

.laser, .overlay-element {
  display: none;
}
</style>


