<template>
  <div>
    <b-button :variant="actual ? 'success' : ''" @click="autoAll">
      <b>Auto Claim All</b>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "AutoClaimButton",
  props: {
    type: String,
  },
  data() {
    return {
      actual: false
    }
  },
  methods: {
    autoAll: function() {
      localStorage.setItem(`${this.type}AutoClaim`, true);
        this.$store.commit("user/setAutoClaim", {
          type: this.type,
          id: "global",
          value: true,
        });
          //alert("global 29 : " + this.type + ", " + value);
          this.$store.state.user.items[this.type].forEach((elem) => {
            localStorage.setItem(elem.asset_id, true);
            this.$store.commit("user/setAutoClaim", {
              type: this.type,
              id: elem.asset_id,
              value: true,
            });
          });
          this.actual = true;
          this.$root.$emit("autoClaimAll")
    }
  },
  mounted() {
    if (localStorage.getItem(`${this.type}AutoClaim`)) {
      let param = localStorage.getItem(`${this.type}AutoClaim`);
      if (param == "true") {
        this.actual = true;
        this.$store.commit("user/setAutoClaim", {
          type: this.type,
          id: "global",
          value: true,
        });
        this.$store.state.user.items[this.type].forEach((elem) => {
          localStorage.setItem(elem.asset_id, "true");
          this.$store.commit("user/setAutoClaim", {
            type: this.type,
            id: elem.asset_id,
            value: true,
          });
        });
      }
    }
    this.$root.$on('disableClaimAll', () => {
        this.actual = false;
    })
  },
};
</script>
