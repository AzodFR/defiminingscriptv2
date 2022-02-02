<template>
  <div>
    <b-form-checkbox v-model="checked" name="check-button" switch>
      <b>Auto Repair</b>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "LocalAutoRepairButton",
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
        if (this.$store.state.user.autorepair[this.type]["global"]) {
          return true;
        } else {
          return this.$store.state.user.autorepair[this.type][this.id];
        }
        //return this.$store.state.user.autorepair[this.type][this.id];
      },
      set(value) {
        // peu importe la valeur (0 --> 1 || 1 --> 0) on la save dans l'item (dans store et localstorage) :
        localStorage.setItem(`${this.id}_r`, `${value}`);
        this.$store.commit("user/setAutoRepair", {
          type: this.type,
          id: this.id,
          value: value,
        });
        // et si la valeur passe à false (1 --> 0) : on passe le global à false (dans store et localstorage) :
        if (!value) {
          this.$store.commit("user/setAutoRepair", {
            type: this.type,
            id: "global",
            value: value,
          });
          localStorage.setItem(`${this.type}AutoRepair`, "false");
        }
      },
    },
  },
};
</script>