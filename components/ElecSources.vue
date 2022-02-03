<template>
  <div
    style="display: block; margin-left: 20%; margin-right: 20%"
    v-if="this.$store.state.user.items['elecsources'].length"
  >
    <h4>Electricity</h4>
    <AutoClaimButton type="elecsources" />
    <AutoRepairButton type="elecsources" />
    <carousel-3d :controls-visible="true" class="carousel" :height="350">
      <slide
        class="slide"
        v-for="(item, i) in this.$store.state.user.items['elecsources']"
        :key="i"
        :index="i"
        style="background-color: #d19e5c; border: solid 4px #ea6813"
      >
        <div class="rigname">{{ item.name }}</div>
        <div class="durability">
          Dur. : {{ item.current_durability }} / {{ item.durability }}
        </div>
        <div class="durability">
          <em>{{ item.current_durability / item.durability_usage }} claims before repair ({{(item.durability - item.current_durability) * 0.01}} DMC)</em>
        </div>
        <div class="production">
          <em>+ ~{{item.production / 1000}} {{item.claim_type}}/h</em>
        </div>
        <div class="energy_cost">
          <em>- {{format(item.power_usage * 0.000086)}} DME/h</em>
          </div>
        <LocalAutoClaimButton
          class="switch"
          type="elecsources"
          :id="item.asset_id"
        />
        <LocalAutoRepairButton
          class="switch"
          type="elecsources"
          :id="item.asset_id"
        />
        <Counter
          class="counter"
          :item="item"
          :timestamp="item.claim_time"
          :claiminfo="{
            type: 'elecsources',
            action: 'claimelec',
          }"
          :autoclaim="
            `this.$store.state.user.items['elecsources']['item.asset_id']` ===
            true
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
  name: "ElecSources", /// *************
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
  methods: {
    format: function (value) {
      let splitted = value.toString().split(".");
      if (splitted.lenght == 1 || splitted[1] == undefined) return value;
      if (splitted[1].length > 4) {
        splitted[1] = splitted[1].substring(0, 3);
      }
      return splitted.join(".");
    },
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
}
.img {
  width: 60%;
  height: auto;
}
</style>
