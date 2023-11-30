<script>
import PictureMenu from "./ProfileSubmenu/PictureMenu.vue";
import BannerMenu from "./ProfileSubmenu/BannerMenu.vue";
import ProfileFrames from "./ProfileSubmenu/ProfileFrames.vue";

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
  <h1> Profile Settings </h1>
  <p>
    This page shows all your profile settings.
  </p>
  <div class="mainDiv">

    <div>
      <button @click="setCurrentSection('Picture')"><i class="fa-solid fa-star"></i></button>
      <p>Your pictures</p>
    </div>

    <div>
      <button @click="setCurrentSection('Frames')"><i class="fa-solid fa-brush"></i></button>
      <p>Your profile frames</p>
    </div>

    <div>
      <button @click="setCurrentSection('Banner')"><i class="fa-solid fa-panorama"></i></button>
      <p>Your banner</p>
    </div>
  </div>

  <PictureMenu v-if="sectionToggles.Picture"></PictureMenu>
  <BannerMenu v-if="sectionToggles.Banner"></BannerMenu>
  <ProfileFrames v-if="sectionToggles.Frames"></ProfileFrames>
</template>

<style>
.mainDiv {
  margin-left: 25%;
  display: flex;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 7px;
  cursor: pointer;

}
</style>