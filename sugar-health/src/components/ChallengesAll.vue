<script>
import ActiveChallenges from "./ChallengesSubmenu/ActiveChallenges.vue";
import WriteChallenge from "./ChallengesSubmenu/WriteChallenge.vue";
import StickerMenu from "./ChallengesSubmenu/StickerMenu.vue";
import AvatarMenu from "./ChallengesSubmenu/AvatarMenu.vue";
import BannerMenu from "./ChallengesSubmenu/BannerMenu.vue";
import ProfileFrames from "./ChallengesSubmenu/ProfileFrames.vue";

export default {
  name: 'ChallengesAll',
  data() {
    return {
      sectionToggles: {
        Avatar: false,
        Banner: false,
        Challenges: false,
        Frames: false,
        Sticker: false,
        Challenge: false
      }
    };
  },
  components: {
    ActiveChallenges: ActiveChallenges,
    AvatarMenu: AvatarMenu,
    BannerMenu: BannerMenu,
    ProfileFrames: ProfileFrames,
    StickerMenu: StickerMenu,
    WriteChallenge: WriteChallenge
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
  <h1> Challenges </h1>
  <p>
    This page shows all your challenges. The ones completed as well as the ones in progress.
  </p>
  <div class="mainDiv">
    <div>
      <button @click="setCurrentSection('Challenges')"><i class="fa-solid fa-heart"></i></button>
      <p>Active Challenges</p>
    </div>

    <div>
      <button @click="setCurrentSection('Challenge')"><i class="fa-solid fa-pen-nib"></i></button>
      <p>Write your own challenge</p>
    </div>

    <!-- <div style="visibility: hidden;">
      <i class="fa-solid fa-image"></i>
      <p>Choose a sticker</p>
    </div>
 -->

    <div>
      <button @click="setCurrentSection('Sticker')"><i class="fa-solid fa-folder"></i></button>
      <p>Your stickers</p>
    </div>

    <div>
      <button @click="setCurrentSection('Avatar')"><i class="fa-solid fa-star"></i></button>
      <p>Your avatar</p>
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

  <ActiveChallenges v-if="sectionToggles.Challenges"></ActiveChallenges>
  <AvatarMenu v-if="sectionToggles.Avatar"></AvatarMenu>
  <BannerMenu v-if="sectionToggles.Banner"></BannerMenu>
  <ProfileFrames v-if="sectionToggles.Frames"></ProfileFrames>
  <WriteChallenge v-if="sectionToggles.Challenge"></WriteChallenge>
  <StickerMenu v-if="sectionToggles.Sticker"></StickerMenu>
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