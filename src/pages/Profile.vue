<script>
import PictureMenu from "./../components/ProfileSubmenu/PictureMenu.vue";
import BannerMenu from "./../components/ProfileSubmenu/BannerMenu.vue";
import ProfileFrames from "./../components/ProfileSubmenu/ProfileFrames.vue";
import {mapState} from "vuex";

export default {
  name: 'ProfileSettings',
  data() {
    return {
      sectionToggles: {
        Picture: false,
        Banner: false,
        Frames: false
      }
    };
  },
  components: {
    PictureMenu: PictureMenu,
    BannerMenu: BannerMenu,
    ProfileFrames: ProfileFrames
  },
  computed: mapState({
    profile: state => {
      return {
        id: state.profileId,
        name: state.profileName
      }
    }
  }),
  methods: {
    setCurrentSection(sectionToggle) {
      for (const section in this.sectionToggles) {
        this.sectionToggles[section] = false;
      }
      this.sectionToggles[sectionToggle] = true
    }
  }
}
</script>


<template>
  <h1> Profile </h1>
  <h2>
    Welcome {{ profile.name }}
  </h2>
  <div class="mainDiv">

    <div>
      <div class="buttonContainer">
        <button @click="setCurrentSection('Picture')"><i class="fa-solid fa-star"></i></button>
      </div>
    </div>

    <div>
      <div class="buttonContainer">
        <button @click="setCurrentSection('Frames')"><i class="fa-solid fa-brush"></i></button>
      </div>
    </div>

    <div>
      <div class="buttonContainer">
        <button @click="setCurrentSection('Banner')"><i class="fa-solid fa-panorama"></i></button>
      </div>
    </div>
  </div>

  <PictureMenu v-if="sectionToggles.Picture"></PictureMenu>
  <BannerMenu v-if="sectionToggles.Banner"></BannerMenu>
  <ProfileFrames v-if="sectionToggles.Frames"></ProfileFrames>
</template>

<style scoped>
.mainDiv {
  align-content: center;
  align-self: center;
  justify-content: center;
  display: flex;
}

button {
  background-color: var(--bs-primary);
  color: white;
  border: none;
  border-radius: 32px;
  width: 48px;
  height: 48px;
  padding: 14px;
  cursor: pointer;

}

.buttonContainer {
  padding: 20px 18px;
  margin: 8px;
}
</style>