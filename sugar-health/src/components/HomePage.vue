<script>
 import { BASE_URL } from "./baseUrl"

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  data() {
    return {
      sugarContent: '',
      productConsumed: '',
      sugarConsumed: ''
    };
  },
  methods: {
    calculateSugarIntake() {
       this.sugarConsumed = (this.productConsumed / 100 * this.sugarContent).toFixed(2)
    },
    sendFormData() {
      // Send the data to the server
      this.sendDataToServer();
    },
    async sendDataToServer() {
      try {
      const response = await fetch(`${BASE_URL}/sugarIntake`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sugarConsumed: this.sugarConsumed }),
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log(data.message);
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
  <h1>This is the Homepage</h1>
  <p> Welcome to your sugar tracking helper.</p>


  <div class="wrapper">
    <div> Please enter you sugar intake for today. </div>

    <form @submit.prevent="sendFormData" method="POST">
      <!-- Text Input -->
      <label for="sugarContent">Sugar Content in 100 gr of product</label>
      <input v-model="sugarContent" type="text" id="sugarContent" name="sugarContent" required><br>

      <label for="productConsumed">Consumed product in gr</label>
      <input v-model="productConsumed" type="text" id="productConsumed" name="productConsumed" @blur="calculateSugarIntake" required><br>

      <label for="last_name">Sugar consumed in gr</label>
      <input readonly type="text" id="sugarConsumed" v-model="sugarConsumed"><br>

      <input type="submit" value="Add">

      <br />

    </form>

    <div> Or enter it manually. </div>

    <form action="" method="post">

      <label for="sugarIntake">Sugar Intake</label>
      <input type="text" id="sugarIntake" name="sugarIntake" required><br>

      <input type="submit" value="Add">


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


