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
    currentProfile: state => {
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
    async createNewProfile() {
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
          toast.success("Created new profile")
          this.getCurrentProfiles();
        } else {
          // Handle error
          if (response.status === 409) {
            toast.warning("You have exceeded your maximum amount of profiles")
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async wipeProfile(profileId) {
      try {
        const response = await fetch(`${BACKEND_URL}/sugar/profile/${profileId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (response.ok) {
          toast.success("Profile wiped")
        } else {
          // Handle error
          toast.warning("An error occured while deleting profile")
        }
      } catch (error) {
        toast.warning("An error occured while deleting profile")
      }
    }
  },
  mounted() {
    this.getCurrentProfiles();
  }
}

</script>

<template>
  <BContainer>
    <h1>Choose a profile</h1>
    <div>
      <strong>Current profile: {{ currentProfile.name }}</strong>
    </div>

    <BRow>
      <BCol class="profile-wrapper" v-for="profile in profiles"
            :key="profile.id">
        <BCard>
          <BContainer>
            <BAvatar v-if="profile.imageUrl" variant="primary" :src="profile.imageUrl"/>
            <BAvatar v-else variant="primary"
                     src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"/>
            <p>{{ profile.name }}</p>
          </BContainer>

          <BButtonGroup>
            <BButton
                :disabled="profile.id === currentProfile.id"
                @click='switchToProfile(profile.id, profile.name)'>
              Select
            </BButton>
            <BButton
                @click='wipeProfile(profile.id)'>
              Reset
            </BButton>
          </BButtonGroup>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
  <br/>
  <BContainer>
    <BCard>
      <div> Please enter data for the new profile.</div>

      <br>

      <form @submit.prevent="createNewProfile" method="POST">
        <label for="productDescription">Profile Name</label>
        <BFormInput id="productDescription" v-model="name" type="text" placeholder="Enter your name" required/>
        <br/>
        <BButton type="submit">
          Create
        </BButton>
        <br/>

      </form>
    </BCard>
  </BContainer>
</template>


<style scoped>
.profile-picture {
  height: 48px;
  border-radius: 32px;
  border: 1px solid #212121;
}
</style>


