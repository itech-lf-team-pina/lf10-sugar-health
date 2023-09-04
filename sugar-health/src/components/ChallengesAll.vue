<script>
export default {
  name: 'challengesAll',
  props: {
    msg: String
  }
}
</script>


<template>
  <h1> Challenges </h1>
  <p>
    This page shows all your challenges. The ones completed as well as the ones in progress.
  </p>




  <div>
    <i class="fa-solid fa-folder"></i>
    <p> Deine Sticker</p>
  </div>


  <div>
    <i class="fa-solid fa-star"></i>
    <p>Deine Avatare</p>
  </div>

  <div>
    <i class="fa-solid fa-heart"></i>
    <p>Aktive Challenges</p>
  </div>

  <div>
    <i class="fa-solid fa-pen-nib"></i>
    <p>Schreibe deine eigene Challenge</p>
  </div>

  <div style="visibility: hidden;">
    <i class="fa-solid fa-image"></i>
    <p>Wähle einen Sticker</p>
  </div>

  <div>
    <i class="fa-solid fa-brush"></i>
    <p>Deine Profilbildrahmen</p>
  </div>

  <div>
    <i class="fa-solid fa-panorama"></i>
    <p>Deine Banner</p>
  </div>
</template>

<style>


</style>