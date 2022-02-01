<template>
  <div></div>
</template>

<script>
const time = 15000
export default {
  name: "Interval",
  async mounted() {
    await this.getTemplates();
    this.fetchTokens();
    this.fetchUserInfo();
    this.launchIntervalTokens();
    this.launchIntervalInfo();
    this.fetchItems("rigs");
    this.fetchItems("elecsources");
    this.fetchItems("workshops");
    this.launchIntervalItems();
  },
  methods: {
    launchIntervalItems: function () {
      setInterval(() => {
        this.fetchItems("rigs");
        this.fetchItems("elecsources");
        this.fetchItems("workshops");
      }, time);
    },
    findInTemplate: function (id) {
      let template;
      this.$store.state.user.templates.forEach((elem) => {
        if (elem.template_id == id) {
          template = elem;
        }
      });
      return template;
    },
    async fetchItems(item) {
      await fetch("https://wax.greymass.com/v1/chain/get_table_rows", {
        credentials: "omit",
        headers: {
          Accept: "*/*",
          "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
          "Content-Type": "text/plain;charset=UTF-8",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "no-cors",
          "Sec-Fetch-Site": "cross-site",
        },
        referrer: "https://thedefimining.io/",
        body: `{\"json\":true,\"code\":\"defiminingio\",\"scope\":\"defiminingio\",\"table\":\"${item}\",\"table_key\":\"\",\"lower_bound\":\"${this.$store.state.user.name}\",\"upper_bound\":\"${this.$store.state.user.name}\",\"index_position\":2,\"key_type\":\"i64\",\"limit\":\"100\",\"reverse\":false,\"show_payer\":false}`,
        method: "POST",
        mode: "cors",
      })
        .then((x) => x.json())
        .then(async (items) => {
          const newList = [];
          await items.rows.forEach(async (elem) => {
            elem.img = this.findInTemplate(elem.template_id).img;
            if (localStorage.getItem(`${elem.asset_id}`)) {
            if (localStorage.getItem(`${elem.asset_id}`) == "true"){
                this.$store.commit("user/setAutoClaim", { type: item, id: elem.asset_id, value: true });
                this.checker = true;
            }
            else {
                this.$store.commit("user/setAutoClaim", { type: item, id: elem.asset_id, value: false });
            }
        }
        if (localStorage.getItem(`${elem.asset_id}_r`)) {
            if (localStorage.getItem(`${elem.asset_id}_r`) == "true"){
                this.$store.commit("user/setAutoRepair", { type: item, id: elem.asset_id, value: true });
                this.checker = true;
            }
            else {
                this.$store.commit("user/setAutoRepair", { type: item, id: elem.asset_id, value: false });
            }
        }
        else {
                this.$store.commit("user/setAutoRepair", { type: item, id: elem.asset_id, value: false });
            }
            newList.push(elem);
          });
          if (newList.length) {
            console.log(newList)
            this.$store.commit("user/setItem", { value: newList, type: item });
          }
        });
    },
    async getTemplates() {
      await fetch(
        `${this.$store.state.user.wax.rpc.endpoint}/v1/chain/get_table_rows`,
        {
          credentials: "omit",
          headers: {
            Accept: "*/*",
            "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "text/plain;charset=UTF-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
          },
          referrer: "https://thedefimining.io/",
          body: `{\"json\":true,\"code\":\"defiminingio\",\"scope\":\"defiminingio\",\"table\":\"templates\",\"table_key\":\"\",\"lower_bound\":\"\",\"upper_bound\":\"\",\"limit\":\"100\",\"reverse\":false,\"show_payer\":false}`,
          method: "POST",
          mode: "cors",
        }
      )
        .then((x) => x.json())
        .then((y) => {
          this.$store.commit("user/setTemplates", y.rows);
        });
    },
    async launchIntervalInfo() {
      setInterval(() => {
        this.fetchUserInfo();
      }, time);
    },
    async fetchUserInfo() {
      await fetch(
        `${this.$store.state.user.wax.rpc.endpoint}/v1/chain/get_table_rows`,
        {
          credentials: "omit",
          headers: {
            Accept: "*/*",
            "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "text/plain;charset=UTF-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
          },
          referrer: "https://thedefimining.io/",
          body: `{\"json\":true,\"code\":\"defiminingio\",\"scope\":\"defiminingio\",\"table\":\"users\",\"table_key\":\"\",\"lower_bound\":\"${this.$store.state.user.name}\",\"upper_bound\":\"${this.$store.state.user.name}\",\"limit\":\"100\",\"reverse\":false,\"show_payer\":false}`,
          method: "POST",
          mode: "cors",
        }
      )
        .then((x) => x.json())
        .then((user) => {
          this.$store.commit("user/setRessource", {
            type: "DME",
            value: user.rows[0].balance_dme / 10000,
          });
          this.$store.commit("user/setRessource", {
            type: "DMT",
            value: user.rows[0].balance_dmt / 10000,
          });
          this.$store.commit("user/setRessource", {
            type: "DMC",
            value: user.rows[0].balance_dmc / 10000,
          });
          this.$store.commit("user/setEnergy", user.rows[0].energy);
        });
    },
    async launchIntervalTokens() {
      setInterval(() => {
        this.fetchTokens();
      }, time);
    },
    async fetchTokens() {
      const tokens = ["DMT", "DME", "DMC", "WAX"];
      tokens.forEach(async (token) => {
        const code = token == "WAX" ? "eosio.token" : "defiminingtk";
        await fetch(
          `${this.$store.state.user.wax.rpc.endpoint}/v1/chain/get_currency_balance`,
          {
            credentials: "omit",
            headers: {
              Accept: "*/*",
              "Accept-Language": "fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3",
              "Content-Type": "text/plain;charset=UTF-8",
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "no-cors",
              "Sec-Fetch-Site": "cross-site",
            },
            referrer: "https://thedefimining.io/",
            body: `{\"code\":\"${code}\",\"account\":\"${this.$store.state.user.name}\",\"symbol\":\"${token}\"}`,
            method: "POST",
            mode: "cors",
          }
        )
          .then((x) => x.json())
          .then((y) => {
            if (y[0] == undefined) {
              this.$store.commit("user/setToken", {
                type: token,
                value: "0.0000",
              });
            } else {
              this.$store.commit("user/setToken", {
                type: token,
                value: y[0] != undefined ? y[0].split(" ")[0] : "0.0000",
              });
            }
          });
      });
    },
  },
};
</script>
