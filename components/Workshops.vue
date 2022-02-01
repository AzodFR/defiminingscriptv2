<template>
<div style="display: block; margin-left: 20%; margin-right: 20%">
  <h4>Workshops</h4>
  <carousel-3d :controls-visible="true">
    <slide v-for="(rig, i) in this.$store.state.user.items['workshops']" :key="i" :index="i-1" style="background-color: #d19e5c; border: solid 0px black">
      {{rig.current_durability}} / {{rig.durability}}
      <img
              :src="'https://mypinata.cloud/ipfs/' + rig.img"
              referrerpolicy="no-referrer"
              style="width: 100%"
            />
          {{rig.name}}
          <!-- Claim button -->
    </slide>
  </carousel-3d>
</div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: "Workshops",
  components: {
    Carousel3d, Slide
  }
}
</script>

