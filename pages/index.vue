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
    <div class="footer">
      <footer>
        Created by <span class="dev1">Azod#9999 (vzfjg.wam)</span> &&
        <span class="dev2">HME#1240 (43xts.wam)</span>
        <a href="https://discord.gg/"
          ><img src="../assets/QTTlogo.png" alt="" class="img"
        /></a>
      </footer>
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
footer {
  position: absolute;
  bottom: 0;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1em;
}
.img {
  margin: 0 15px 10px 50px;
}
.dev1 {
  color: rgb(173, 142, 55);
}
.dev2 {
  color: rgb(21, 209, 146);
}
</style>
