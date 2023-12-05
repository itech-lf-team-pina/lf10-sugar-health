<script setup>
import {BACKEND_URL} from "@/common/constants"
import {StreamBarcodeReader} from "vue-barcode-reader";
import {store} from "@/store/store";
import {useToast} from "vue-toastification";
import {mapState} from "vuex";
import {onMounted, ref} from "vue";

let sugarQuantityPer100GrMl = ref("");
let productConsumed = ref("");
let sugarTotal = ref("");
let description = ref("");

let useBarcodeScanner = ref(false);
let profileId = ref("");

function calculateSugarIntake() {
  sugarTotal.value = (productConsumed.value / 100 * sugarQuantityPer100GrMl.value).toFixed(2)
}

function toggleBarcodeScanner() {
  useBarcodeScanner.value = !useBarcodeScanner.value;
}

async function onDecode(result) {
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
      const data = await response.json()
      console.log("the data message: ", data);
      if (data.name !== undefined) {
        productConsumed.value = data.quantity;
        sugarQuantityPer100GrMl.value = data.sugar;
        description.value = data.name;
        calculateSugarIntake();
      }
    } else {
      console.error("Error sending data to the server.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

}

async function sendDataToServer(event) {
  event.preventDefault()
  const toast = useToast();

  try {
    const response = await fetch(`${BACKEND_URL}/sugar/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        intake: sugarTotal.value,
        description: description.value,
        profileId: store.state.profileId
      }),
    });

    if (response.ok) {
      const data = await response.json()
      console.log("data", data)
      toast.success('Data saved successfully')
    } else {
      console.error("Error sending data to the server.");
      toast.error('Error while sending data to server');
    }
  } catch (error) {
    console.error("An error occurred:", error);
    toast.error('Error while sending data to server');
  }
}

function onReset(event) {
  event.preventDefault()

  sugarQuantityPer100GrMl.value = "";
  productConsumed.value = "";
  sugarTotal.value = 0;
  description.value = "";
  profileId.value = "";
}


const computedAccountInfo = mapState({
  account: state => {
    return {
      id: state.accountId,
      name: state.accountName
    }
  },
  profile: state => {
    return {
      id: state.profileId,
      name: state.profileName
    }
  }
});

onMounted(() => {
  profileId.value = store.state.profileId
})
</script>

<template>
  <BContainer>
    <h1>Here you can enter your sugar intake</h1>
    <br/>
    <div> Please enter you sugar intake for today.</div>

    <BContainer class="scanbox-container">
      <div class="container-md form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="barcode-scanner-switch"
               @click="toggleBarcodeScanner">
        <label class="form-check-label" for="barcode-scanner-switch">Checked switch checkbox input</label>
      </div>

      <div class="container">
        <StreamBarcodeReader v-if="useBarcodeScanner" @decode="onDecode"></StreamBarcodeReader>
      </div>
      <audio id="barcode-scanner-audio">
        <source src="/beep.mp3" type="audio/mpeg">
      </audio>
    </BContainer>
    <BContainer>
      <BForm @submit="sendDataToServer" @reset="onReset">
        <BFormGroup
            id="productDescription-group"
            label="Product Description"
            label-for="productDescription"
        >
          <BFormInput
              id="productDescription"
              v-model="description"
              type="text"
              placeholder="Product description"
              required
          />
        </BFormGroup>

        <BFormGroup id="sugarContent-group" label="Sugar Content in 100 gr/ml of product" label-for="sugarContent">
          <BFormInput
              @input="calculateSugarIntake"
              id="sugarContent"
              v-model="sugarQuantityPer100GrMl"
              type="number"
              placeholder="Enter amount"
              required
          />
        </BFormGroup>
        <BFormGroup id="productConsumed-group" label="Consumed product in gr/ml" label-for="productConsumed">
          <BFormInput
              @input="calculateSugarIntake"
              id="productConsumed"
              v-model="productConsumed"
              type="number"
              placeholder="Enter amount"
              required
          />
        </BFormGroup>

        <BFormGroup id="sugarConsumed-group" label="Consumed product in gr/ml" label-for="sugarConsumed">
          <BFormInput
              id="sugarConsumed"
              type="text"
              v-model="sugarTotal"
              required
          />
        </BFormGroup>
        <br/>
        <BButtonGroup>
          <BButton type="reset" variant="outline-danger">Reset values</BButton>
          <BButton type="submit" variant="primary">Add sugar to your profile</BButton>
        </BButtonGroup>
      </BForm>
    </BContainer>
  </BContainer>
</template>


<style>
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


