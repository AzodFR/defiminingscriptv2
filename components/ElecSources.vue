<template>
  <div
    style="display: block; margin-left: 20%; margin-right: 20%"
    v-if="this.$store.state.user.items['elecsources'].length"
  >
  <div style="display: flex; margin-bottom: 1%">
    <h4>Electricity</h4>
    <div style="display: flex; margin-left: 2%;">
    <AutoClaimButton type="elecsources" />
    <AutoRepairButton type="elecsources" />
    </div>
    </div>
    <div style="display: flex;
  flex-wrap: wrap;">
    <b-card
        class="slide"
        v-for="(item, i) in this.$store.state.user.items['elecsources']"
        :key="i"
        :title="item.name"
        style="background-color: #d19e5c; border: solid 4px #ea6813; width: 25%"
      >
        <!-- <div class="rigname">{{ item.name }}</div> -->
        <div class="durability">
          Dur. : {{ item.current_durability }} / {{ item.durability }}
        </div>
        <div class="durability">
          <em
            >{{
              Math.floor(item.current_durability / item.durability_usage)
            }}
            claims before repair ({{
              format((item.durability - item.current_durability) * 0.01)
            }}
            DMC)</em
          >
        </div>
        <div class="production">
          <em>+ {{ item.production / 10000 }} {{ item.claim_type }}/h</em>
        </div>
        <div class="energy_cost">
          <em>- {{ format(item.durability_usage * 0.01) }} DMC/h</em>
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
            r_action: 'repairelec'
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
      </b-card>
      </div>
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
.production {
  color: green;
  font-weight: bold;
}
.energy_cost {
  color: red;
  font-weight: bold;
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
  width: 50%;
  height: auto;
}
</style>
