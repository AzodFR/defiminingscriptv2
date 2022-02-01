<template>
  <div>
    <b-form-checkbox v-model="checked" name="check-button" switch>
      <b>Auto Claim</b>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "ManualAutoButton",
  data() {
    return {
      checker: this.$store.state.user.autoclaim[this.type]["global"],
    };
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
      },
      set(value) {
        //alert(value);
        localStorage.setItem(`${this.id}`, `${value}`);
        this.$store.commit("user/setAutoClaim", {
          type: this.type,
          id: this.id,
          value: value,
        });
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