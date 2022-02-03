<template>
  <div class="banner-button">
    <b-button variant="success" v-b-toggle.sidebar-1 style="">{{
      user.name
    }}</b-button>
    <b-sidebar id="sidebar-1" :title="user.name" shadow>
      <div class="px-3 py-2">
        <p>Energy: {{ user.energy }}/500000</p>
        Tokens:
        <div style="margin-left: 4%">
          <p>WAX: {{ user.tokens["WAX"] }}</p>
          <p>DMT: {{ user.tokens["DMT"] }}</p>
          <p>DME: {{ user.tokens["DME"] }}</p>
          <p>DMC: {{ user.tokens["DMC"] }}</p>
        </div>
        Ressources:
        <div style="margin-left: 4%">
         <b-form-checkbox @change="changeType" name="check-button" switch>
            Hour / Daily
          </b-form-checkbox>
          <p>
            DMT: {{ user.ressources["DMT"] }}
            <label
              :class="
                user.production['DMT'] - user.cost['DMT'] > 0
                  ? 'positive'
                  : 'negative'
              "
              >({{ user.production["DMT"] - user.cost["DMT"] > 0 ? "+" : ""
              }}{{
                format(
                  (user.production["DMT"] - user.cost["DMT"]) *
                    info_mult[info_choice]
                )
              }}/{{ info_type[info_choice] }})</label
            >
          </p>
          <p>
            DME: {{ user.ressources["DME"] }}
            <label
              :class="
                user.production['DME'] - user.cost['DME'] > 0
                  ? 'positive'
                  : 'negative'
              "
              >({{ user.production["DME"] - user.cost["DME"] > 0 ? "+" : ""
              }}{{
                format(
                  (user.production["DME"] - user.cost["DME"]) *
                    info_mult[info_choice]
                )
              }}/{{ info_type[info_choice] }})</label
            >
          </p>
          <p>
            DMC: {{ user.ressources["DMC"] }}
            <label
              :class="
                user.production['DMC'] - user.cost['DMC'] > 0
                  ? 'positive'
                  : 'negative'
              "
              >({{ user.production["DMC"] - user.cost["DMC"] > 0 ? "+" : ""
              }}{{
                format(
                  (user.production["DMC"] - user.cost["DMC"]) *
                    info_mult[info_choice]
                )
              }}/{{ info_type[info_choice] }})</label
            >
          </p>
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
  data() {
    return {
      info_type: ["h", "day"],
      info_mult: [1, 24],
      info_choice: 0,
    };
  },
  methods: {
    changeType: function (value) {
      if (value) this.info_choice = 1;
      else this.info_choice = 0;
    },
    format: function (value) {
      let splitted = value.toString().split(".");
      if (splitted.lenght == 1 || splitted[1] == undefined) return value;
      if (splitted[1].length > 4) {
        splitted[1] = splitted[1].substring(0, 3);
      }
      return splitted.join(".");
    },
  },
};
</script>

<style>
.banner-button {
  display: flex;
  justify-content: center;
}
.positive {
  color: green;
}
.negative {
  color: red;
}
</style>
