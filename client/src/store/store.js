import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {},
        isLiveFeed: true,
        videoItem: undefined,
        shouldRefresh: false,
        files: []
    },
    getters: {

    },
    mutations: {
        loadConfig(state, config) {
            state.config = config;
        },
        loadVideo(state, item) {
            state.videoItem = item;
            state.isLiveFeed = false;
        },
        clearVideo(state) {
            state.videoItem = undefined;
            state.isLiveFeed = true;
        },
        refreshFiles(state, toast) {
                state.files = [];
                for (let cam of state.config) {
                  const baseUrl = `http://${cam.host}:${cam.port}`;
                  axios
                    .get(`${baseUrl}/savedFiles`)
                    .then(res => {
                      const items = res.data.map(item => ({
                        url: `${baseUrl}/stored?clip=${item}`,
                        label: item
                      }));
                      state.files = [...state.files, ...items];
                    })
                    .catch(() =>
                      toast.toast("Fetching files failed", {
                        title: `${cam.name} can't be reached.`,
                        variant: "warning"
                      })
                    );
                }
              }
    },
    actions: {
        loadConfig(context) {
            const config = require("../../config/config.json");
            context.commit('loadConfig', config)
        },
        loadVideo(context, item) {
            context.commit('loadVideo', item);
        },
        clearVideo(context) {
            context.commit('clearVideo');
        },
        refreshFiles(context, toast) {
            context.commit('refreshFiles', toast);
        }
    }
});