import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {},
        isLiveFeed: true
    },
    getters: {

    },
    mutations: {
        loadConfig(state, config) {
            state.config = config;
        }
    },
    actions: {
        loadConfig(context) {
            const config = require("../../config/config.json");
            context.commit('loadConfig', config)
        }
    }
});