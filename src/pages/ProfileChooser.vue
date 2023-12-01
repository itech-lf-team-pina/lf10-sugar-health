<script>
import {mapState} from "vuex";
import {useToast} from "vue-toastification";
import {BACKEND_URL} from "@/common/constants";
import {store} from "@/store/store";
const toast = useToast();

export default {
  name: 'ProfileChooser',
  data() {
    return {
      name: '',
      profiles: []
    };
  },
  computed: mapState({
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
  }), //TODO
  methods: {
    async getCurrentProfiles() {
      try {
        const response = await fetch(`${BACKEND_URL}/account/${store.state.accountId}/profiles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          this.profiles = data;
          console.table(data);
        } else {
          // Handle error
          console.error("Error sending data to the server.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    async switchToProfile(profileId, name) {
      store.commit("setProfilId", profileId);
      store.commit("setProfileName", name);

      toast.success("Switched to " + name);
    },
    async createNewProfile () {
      try {
        const response = await fetch(`${BACKEND_URL}/profile/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: this.name,
            imageUrl: "https://bit.ly/3QIblUE",
            accountID: store.state.accountId
          }),
        });

        if (response.ok) {
          const data = await response.json(); // Read the response as JSON
          console.log("the data message: ", data);
          toast.success("Created new profile")
          this.getCurrentProfiles();
        } else {
          // Handle error
          console.error("Error sending data to the server.");
          console.log(response);
          if (response.status === 409) {
            toast.warning("You have exceeded your maximum amount of profiles")
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  },
  mounted() {
    this.getCurrentProfiles();
  }
}

</script>

<template>
  <h1>Choose a profile</h1>

  <div class="wrapper">
    <div> Choose between your current profiles.</div>

    <div class="profileContainer">
      <div
          v-for="profile in profiles"
          :key="profile.id">
        {{ profile.name }}
        <br>
        <button
            :disabled="false"
            @click='switchToProfile(profile.id, profile.name)'>
          Select
        </button>
      </div>
    </div>
  </div>

  <div class="wrapper">
    <div> Please enter data for the new profile.</div>


    <form @submit.prevent="createNewProfile" method="POST">
      <!-- Text Input -->
      <label for="productDescription">Profile Name</label>
      <input v-model="name" type="text" id="profileName" name="profileName" required><br>

      <input type="submit" value="Create">
      <br/>

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


