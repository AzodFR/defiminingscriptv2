import * as waxjs from "@waxio/waxjs/dist";

export const state = () => ({
  name: "",
  energy: 0,
  autoclaim: {
    "rigs": {
      "global": false,
    },
    "elecsources": {
      "global": false
    },
    "workshops": {
      "global": false
    }
  },
  autorepair: {
    "rigs": {
      "global": false,
    },
    "elecsources": {
      "global": false
    },
    "workshops": {
      "global": false
    }
  },
  tokens: {
    "WAX": 0,
    "DMC": 0,
    "DME": 0,
    "DMT": 0
  },
  production: {
    "DMC": 0,
    "DME": 0,
    "DMT": 0
  },
  cost: {
    "DMC": 0,
    "DME": 0,
    "DMT": 0
  },
  logged_asset: [],
  ressources: {
    "DMC": 0,
    "DME": 0,
    "DMT": 0
  },
  wax: null,
  items: {
    "rigs": [],
    "elecsources": [],
    "workshops": []
  },
  templates: []
})

export const mutations = {
  async login(state, rpc) {
    state.wax = new waxjs.WaxJS({
      rpcEndpoint: rpc,
      tryAutoLogin: true
    })
    await state.wax.login()
  },
  setUser(state) {
    state.name = state.wax.userAccount
  },
  setToken(state, token) {
    state.tokens[token.type] = token.value
  },
  setRessource(state, token) {
    state.ressources[token.type] = token.value
  },
  setEnergy(state, value) {
    state.energy = value
  },
  setItem(state, item) {
    state.items[item.type] = item.value;
  },
  setTemplates(state, value) {
    state.templates = value
  },
  setAutoClaim(state, param) {
    state.autoclaim[param.type][param.id] = param.value;
  },
  setAutoRepair(state, param) {
    state.autorepair[param.type][param.id] = param.value;
  },
  addProduction(state, param) {
    state.production[param.type] += param.value;
  },
  addCost(state, param) {
    state.cost[param.type] += param.value;
  },
  addAsset(state, id) {
    state.logged_asset.push(id);
  },

}
