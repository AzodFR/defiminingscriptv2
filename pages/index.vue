<template>
  <div>
    <DefiLogo />
    <Login v-if="name == ''" />
    <div v-else>
      <Interval />
      <Banner />
      <ElecSources />
      <Rigs />
      <Workshops />
    </div>
    <footer style="   position:absolute; bottom:0;">
      Created by Azod#9999 (vzfjg.wam) && HME#1240 (43xts.wam)
    </footer>
  </div>
</template>

<script>
import DefiLogo from "../components/DefiLogo.vue";
import Login from "../components/Login.vue";
import Banner from "../components/Banner.vue";
import Interval from "../components/Interval.vue";
import Rigs from "../components/Rigs.vue";
import ElecSources from "../components/ElecSources.vue";
import Workshops from "../components/Workshops.vue";

export default {
  name: "IndexPage",
  components: {
    DefiLogo,
    Login,
    Banner,
    Interval,
    Rigs,
    ElecSources,
    Workshops,
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    },
  },
};
</script>

<style>
body {
  background-color: #111c38;
  color: aliceblue;
}
</style>
