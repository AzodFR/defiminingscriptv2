<template>
<div>
    <b-form-checkbox v-model="checker"  name="check-button" switch>
      <b>Auto Repair</b>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
    name: "ManualAutoRepairButton",
    props: {
        type: String,
        id: String
    },
    computed: {
        checker:{
            get() {
                return this.$store.state.user.autorepair[this.type][this.id];
            },
            set(value) {
                localStorage.setItem(`${this.id}_r`, `${value}`);
                this.$store.commit("user/setAutoRepair", { type: this.type, id: this.id, value: value });
                if (!value)
                {
                    this.$store.commit("user/setAutoRepair", { type: this.type, id: "global", value: value });
                    localStorage.setItem(`${this.type}AutoRepair`, "false");
                }
            }
        }
    },
}
</script>