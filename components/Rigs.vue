<template>
  <div
    style="display: block; margin-left: 20%; margin-right: 20%"
    v-if="this.$store.state.user.items['rigs'].length"
  >
    <h4>Rigs</h4>
    <AutoClaimButton type="rigs" />
    <AutoRepairButton type="rigs" />
    <carousel-3d :controls-visible="true" class="carousel" :height="300">
      <slide
        class="slide"
        v-for="(item, i) in this.$store.state.user.items['rigs']"
        :key="i"
        :index="i"
        style="background-color: #d19e5c; border: solid 4px #ea6813"
      >
        <div class="rigname">{{ item.name }}</div>
        <div class="durability">
          Dur. : {{ item.current_durability }} / {{ item.durability }}
        </div>
        <LocalAutoClaimButton class="switch" type="rigs" :id="item.asset_id" />
        <LocalAutoRepairButton class="switch" type="rigs" :id="item.asset_id" />
        <Counter
          class="counter"
          :item="item"
          :timestamp="item.claim_time"
          :claiminfo="{
            type: 'rigs',
            action: 'claimrig',
          }"
          :autoclaim="
            `this.$store.state.user.items['rigs']['item.asset_id']` === true
          "
        />
        <div class="thumb">
          <img
            class="img"
            :src="'https://mypinata.cloud/ipfs/' + item.img"
            referrerpolicy="no-referrer"
          />
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

import AutoClaimButton from "./AutoClaimButton.vue";
import LocalAutoClaimButton from "./LocalAutoClaimButton.vue";
import AutoRepairButton from "./AutoRepairButton.vue";
import LocalAutoRepairButton from "./LocalAutoRepairButton.vue";
export default {
  name: "Rigs", /// *************
  data() {
    return {};
  },
  components: {
    Carousel3d,
    Slide,
    AutoClaimButton,
    LocalAutoClaimButton,
    AutoRepairButton,
    LocalAutoRepairButton,
  },
};
</script>

<style scoped>
.rigname {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5em;
  padding: 5px 0;
  background-color: #ea6813;
}
.durability {
  display: flex;
  justify-content: center;
  font-weight: bold;
  padding: 5px 0;
}
.slide {
  border-radius: 5px;
}
.counter {
  display: flex;
  justify-content: center;
  margin: 5px 0 0 0;
}
.switch {
  margin: 0 10px;
}
.thumb {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
}
.img {
  width: 70%;
  height: auto;
}
</style>