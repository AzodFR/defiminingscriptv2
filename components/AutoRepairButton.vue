<template>
    <div>
        <b-form-checkbox v-model="checked" name="check-button" switch>
            <b>Auto Repair All</b>
        </b-form-checkbox>
    </div>
</template>

<script>
export default {
    name: "AutoRepairButton",
    props: {
        type: String
    },
    computed: {
        checked: {
            get() {
                return this.$store.state.user.autorepair[this.type]["global"];
            },
            set(value) {
                localStorage.setItem(`${this.type}AutoRepair`, `${value}`)
                this.$store.commit("user/setAutoRepair", { type: this.type, id: "global", value: value });
                if (value)
                    this.$store.state.user.items[this.type].forEach(elem => {
                        localStorage.setItem(`${elem.asset_id}_r`, `${value}`);
                        this.$store.commit("user/setAutoRepair", { type: this.type, id: elem.asset_id, value: value });
                        console.log(this.$store.state.user.autorepair[this.type])
                    })
            }
        }
    },
    mounted() {
        if (localStorage.getItem(`${this.type}AutoRepair`)) {
            let param = localStorage.getItem(`${this.type}AutoRepair`);
            if (param == "true") {
                this.$store.commit("user/setAutoRepair", { type: this.type, id: "global", value: true });
                this.$store.state.user.items[this.type].forEach(elem => {
                    localStorage.setItem(elem.asset_id, "true");
                    this.$store.commit("user/setAutoRepair", { type: this.type, id: elem.asset_id, value: true });
                })
            }
        }
    },
}
</script>