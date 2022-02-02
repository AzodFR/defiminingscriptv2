<template>
  <div>
    <b-form-checkbox v-model="checked" name="check-button" switch>
      <b>Auto Claim All</b>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "AutoClaimButton",
  props: {
    type: String,
  },
  computed: {
    checked: {
      get() {
        return this.$store.state.user.autoclaim[this.type]["global"];
      },
      set(value) {
        // peu importe la valeur (0 --> 1 || 1 --> 0) on la save en global (dans store et localstorage) :
        //alert("global 21 : " + this.type + ", " + value);
        localStorage.setItem(`${this.type}AutoClaim`, `${value}`);
        this.$store.commit("user/setAutoClaim", {
          type: this.type,
          id: "global",
          value: value,
        });
        // et si la valeur passe à true (0 --> 1) : on passe tous les items à true (dans store et localstorage) :
        if (value)
          //alert("global 29 : " + this.type + ", " + value);
          this.$store.state.user.items[this.type].forEach((elem) => {
            localStorage.setItem(elem.asset_id, `${value}`);
            this.$store.commit("user/setAutoClaim", {
              type: this.type,
              id: elem.asset_id,
              value: value,
            });
            //console.log(this.$store.state.user.autoclaim[this.type]);
          });
      },
    },
  },
  mounted() {
    if (localStorage.getItem(`${this.type}AutoClaim`)) {
      let param = localStorage.getItem(`${this.type}AutoClaim`);
      if (param == "true") {
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
  },
};
</script>