<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  data() {
    return {
      sugarContent: 0,
      productConsumed: 0,
    };
  },
  computed: {
    sugarIntake() {
      return (this.productConsumed / 100 * this.sugarContent).toFixed(2)
    },
  },
}

</script>

<template>
  <h1>This is the Homepage</h1>
  <p> Welcome to your sugar tracking helper.</p>
  

  <div class="wrapper">
    <div> Please enter you sugar intake for today. </div>

    <form action="" method="post">
    <!-- Text Input -->
    <label for="first_name">Sugar Content in 100 gr of product</label>
    <input  v-model="sugarContent" type="text" id="sugarContent" name="sugarContent" required><br>

    <label for="last_name">Consumed product in gr</label>
    <input v-model="productConsumed" type="text" id="productConsumed" name="productConsumed" required><br>

    <label for="last_name">Sugar consumed in gr</label>
    <input :value="sugarIntake" type="text" id="sugarConsumed" name="sugarConsumed" required><br>

    <input type="submit" value="Add">

    <br />

  </form>

  <div> Or enter it manually. </div>

  <form action="" method="post">

    <label for="last_name">Sugar Intake</label>
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



</style>


