<template>
<div style="display: block; margin-left: 20%; margin-right: 20%" v-if="this.$store.state.user.items['rigs'].length">
  <h4>Rigs</h4> <AutoClaimButton type="rigs"/> <AutoRepairButton type="rigs" />
  <carousel-3d :controls-visible="true">
    <slide v-for="(rig, i) in this.$store.state.user.items['rigs']" :key="i" :index="i" style="background-color: #d19e5c; border: solid 0px black">
      {{rig.current_durability}} / {{rig.durability}}
      <ManualAutoClaimButton type="rigs" :id="rig.asset_id" />
      <ManualAutoRepairButton type="rigs" :id="rig.asset_id"/>
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
import AutoClaimButton from './AutoClaimButton.vue';
import ManualAutoClaimButton from './ManualAutoClaimButton.vue';
import AutoRepairButton from './AutoRepairButton.vue';
import ManualAutoRepairButton from './ManualAutoRepairButton.vue';
export default {
  name: "Rigs",
  components: {
    Carousel3d,
    Slide,
    AutoClaimButton,
    ManualAutoClaimButton,
    AutoRepairButton,
    ManualAutoRepairButton
}
}
</script>

