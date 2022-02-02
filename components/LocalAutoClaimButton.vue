<template>
  <div>
    <b-form-checkbox v-model="checked" name="check-button" switch>
      <b>Auto Claim</b>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "LocalAutoClaimButton",
  data() {
    return {};
  },
  props: {
    type: String,
    id: String,
  },
  computed: {
    checked: {
      get() {
        if (this.$store.state.user.autoclaim[this.type]["global"]) {
          return true;
        } else {
          return this.$store.state.user.autoclaim[this.type][this.id];
        }
        //return this.$store.state.user.autoclaim[this.type][this.id];
      },
      set(value) {
        //alert("local : " + this.type + ", " + this.id + " " + value);
        // peu importe la valeur (0 --> 1 || 1 --> 0) on la save dans l'item (dans store et localstorage) :
        localStorage.setItem(`${this.id}`, `${value}`);
        this.$store.commit("user/setAutoClaim", {
          type: this.type,
          id: this.id,
          value: value,
        });
        // et si la valeur passe à false (1 --> 0) : on passe le global à false (dans store et localstorage) :
        if (!value) {
          this.$store.commit("user/setAutoClaim", {
            type: this.type,
            id: "global",
            value: value,
          });
          localStorage.setItem(`${this.type}AutoClaim`, "false");
        }
      },
    },
  },
};
</script>