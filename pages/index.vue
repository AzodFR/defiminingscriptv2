<template>
  <div>
    <DefiLogo />
    <Login v-if="name == ''" />
    <div v-else>
      <Interval />
      <Banner />

      <Rigs />
      <Workshops />
      <ElecSources />
    </div>
    <Footer />
    <div class="devinfo">
      <p class="txt">
        Created by
        <span class="dev1"> Azod#9999 (vzfjg.wam) </span>
        &&
        <span class="dev2"> HME#1240 (43xts.wam) </span>
      </p>
    </div>
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
import Footer from "../components/Footer.vue";

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

.devinfo {
  position: fixed;
  bottom: 0;
  text-align: left;
}
.txt {
  text-align: left;
  font-weight: bold;
  margin-left: 20px;
}
.dev1 {
  color: #d666e0;
}
.dev2 {
  color: #e74c3c;
}
</style>
