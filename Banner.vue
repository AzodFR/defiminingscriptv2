<template>
  <div class="banner-button">
    <b-button
      variant="success"
      v-b-toggle.sidebar-1
      style=""
      >{{ user.name }}</b-button
    >
    <b-sidebar id="sidebar-1" :title="user.name" shadow>
      <div class="px-3 py-2">
        <p>Energy: {{user.energy}}/500000</p>
        Tokens:
        <div style="margin-left: 4%">
          <p>WAX: {{user.tokens["WAX"]}}</p>
          <p>DMT: {{user.tokens["DMT"]}}</p>
          <p>DME: {{user.tokens["DME"]}}</p>
          <p>DMC: {{user.tokens["DMC"]}}</p>
        </div>
        Ressources:
          <div style="margin-left: 4%">
          <p>DMT: {{user.ressources["DMT"]}}</p>
          <p>DME: {{user.ressources["DME"]}}</p>
          <p>DMC: {{user.ressources["DMC"]}}</p>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "Banner",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.banner-button {
    display: flex;
    justify-content: center;
}
</style>
