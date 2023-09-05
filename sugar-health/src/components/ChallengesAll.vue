
<script>
import ActiveChallenges from "./ChallengesSubmenu/ActiveChallenges.vue";
import WriteChallenge from "./ChallengesSubmenu/WriteChallenge.vue";
import StickerMenu from "./ChallengesSubmenu/StickerMenu.vue";
import AvatarMenu from "./ChallengesSubmenu/AvatarMenu.vue";
import BannerMenu from "./ChallengesSubmenu/BannerMenu.vue";
import ProfileFrames from "./ChallengesSubmenu/ProfileFrames.vue";

export default {
  name: 'ChallengesAll',
  props: {
    msg: String
  },
  data() {
    return {
      hiddenAvatar: true,
      hiddenBanner: true,
      hiddenChallenge: true,
      hiddenFrames: true,
      hiddenSticker: true,
      hiddenWriteChallenge: true
    };
  },
  components: {
    ActiveChallenges: ActiveChallenges,
    AvatarMenu: AvatarMenu,
    BannerMenu: BannerMenu,
    ProfileFrames: ProfileFrames,
    StickerMenu: StickerMenu,
    WriteChallenge: WriteChallenge    
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
      <button @click="hiddenChallenge = !hiddenChallenge"><i class="fa-solid fa-heart"></i></button>
      <p>Active Challenges</p>

    </div>

    <div>
      <button @click="hiddenWriteChallenge = !hiddenWriteChallenge"><i class="fa-solid fa-pen-nib"></i></button>
      <p>Write your own challenge</p>
    </div>

    <!-- <div style="visibility: hidden;">
      <i class="fa-solid fa-image"></i>
      <p>Choose a sticker</p>
    </div>
 -->

    <div>
      <button @click="hiddenSticker = !hiddenSticker"><i class="fa-solid fa-folder"></i></button>
      <p>Your stickers</p>
    </div>

    <div>
      <button @click="hiddenAvatar = !hiddenAvatar"><i class="fa-solid fa-star"></i></button>
      <p>Your avatar</p>
    </div>

    <div>
      <button @click="hiddenFrames = !hiddenFrames"><i class="fa-solid fa-brush"></i></button>
      <p>Your profileframes</p>
    </div>

    <div>
      <button @click="hiddenBanner = !hiddenBanner"><i class="fa-solid fa-panorama"></i></button>
      <p>Your banner</p>
    </div>

  </div>

  <ActiveChallenges v-if="!hiddenChallenge"></ActiveChallenges>
  <AvatarMenu v-if="!hiddenAvatar"></AvatarMenu>
  <BannerMenu v-if="!hiddenBanner"></BannerMenu>
  <ProfileFrames v-if="!hiddenFrames"></ProfileFrames>
  <WriteChallenge v-if="!hiddenWriteChallenge"></WriteChallenge>
  <StickerMenu v-if="!hiddenSticker"></StickerMenu>
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