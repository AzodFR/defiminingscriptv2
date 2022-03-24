<template>
  <div class="token-fees">
    <div class="token">
      <b-button
        size="sm"
        v-b-tooltip.hover
        title="Activate this to refill your energy when you are lower than your limit."
        :variant="refill ? 'success' : 'danger'"
        @click="switchRef"
        >Auto Energy: {{ refill ? "ON" : "OFF" }}</b-button
      >
    </div>
    <div class="token">
      <b-input
        @change="editLim"
        type="number"
        class="keep"
        placeholder="Min Energy Limit"
        v-model="limit"
        v-b-tooltip.hover
        title="Limit of energy before refill"
      ></b-input>
    </div>
    <div class="token">
      <b-input
        @change="editAm"
        type="number"
        class="keep"
        placeholder="Max amount of DME"
        v-model="amount"
        v-b-tooltip.hover
        title="Max usage of DME to refill, if you have less than the setted one, it use all your DME. 0 = refill to max energy / use all your DME"
      ></b-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      limit: 0,
      amount: 0.0,
      refill: false,
      refresh: null,
      pushed: false,
      user: this.$store.state.user,
    };
  },
  mounted() {
    if (
      localStorage.getItem("energy") &&
      localStorage.getItem("energy") == "true"
    ) {
      this.refill = true;
      this.launch();
    }
    if (localStorage.getItem("limit")) {
      this.limit = localStorage.getItem("limit");
    }
    if (localStorage.getItem("max_a")) {
      this.amount = localStorage.getItem("max_a");
    }
  },
  methods: {
    editLim() {
      localStorage.setItem("limit", this.limit);
    },
    editAm() {
      localStorage.setItem("max_a", this.amount);
    },
    launch() {
      this.refresh = setInterval(() => {
        this.user = this.$store.state.user;

        if (this.user.energy <= this.limit && !this.pushed) {
          if (this.user.ressources["DME"] >= 0) {
            console.log(this.amount, parseFloat(this.user.max_energy - this.user.energy))
            const needed = parseFloat(
              parseFloat(this.amount) > 0.0
                ? (parseFloat(this.amount) * 0.000085)
                : this.user.max_energy - this.user.energy
            );
            const have = parseFloat(this.user.ressources["DME"]) - 0.05;
            console.log("need to refill and got food");
            console.log("needed", needed);
            console.log("have", have);
            console.log(have < needed);
            let n = parseFloat(
              parseFloat(this.amount) > 0.0
                ? (parseFloat(this.amount) / 0.000085)
                : (this.user.max_energy - this.user.energy)
            );
            console.log("asked for", n);
            if (have < needed) {
              n = have / 0.000085;
            }
            n--;
            n = n.toFixed(0);
            n = parseInt(n) - 1

            const r_action = {
              actions: [
                {
                  account: "defiminingio",
                  name: "addenergy",
                  authorization: [
                    {
                      actor: this.$store.state.user.name,
                      permission: "active",
                    },
                  ],
                  data: {
                    username: this.$store.state.user.name,
                    energy: n,
                  },
                },
              ],
            };
            console.log(r_action)
            const r_block = {
              blocksBehind: 3,
              expireSeconds: 30,
            };
            const r_transac = {
              id: "refill",
              action: r_action,
              block: r_block,
            };
            this.pushed = true;
            this.$store.commit("user/addRAction", r_transac);
            setTimeout(() => {
              this.pushed = false;
              console.log("energy available");
            }, 60000);
            console.log("asked for energy");
          } else {
            console.log("need to refill but no food");
          }
        } else {
          console.log("no need");
        }
      }, 15000);
    },
    stop() {
      clearInterval(this.refresh);
    },
    switchRef() {
      this.refill = !this.refill;
      if (this.refill) {
        this.launch();
        localStorage.setItem("energy", "true");
      } else {
        this.stop();
        localStorage.setItem("energy", "false");
      }
    },
  },
};
</script>


<style>
.fees {
  display: inline;
  margin-left: 1%;
}

.token-fees {
  display: flex;
  font-size: small;
  margin-bottom: 1%;
}
.token {
  font-size: small;
}

.keep {
  font-size: small;
}

.to {
  width: 100%;
  font-size: small;
}
</style>
