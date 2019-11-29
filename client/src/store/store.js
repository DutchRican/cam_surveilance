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
        deleteVideo(state, item, toast){
          axios.get(`${item.host}/delete?clip=${item.label}`)
          .then(() => toast.toast(`deleted file ${item.label}`, {title: 'deleted succesfully', variant: 'success'}))
          .catch((e) => 
          toast.toast(e, {title: 'broke shit', variant: 'warning'}));
        },
        refreshFiles(state, toast) {
                state.files = [];
                for (let cam of state.config) {
                  const baseUrl = `http://${cam.host}:${cam.port}`;
                  axios
                    .get(`${baseUrl}/savedFiles`)
                    .then(res => {
                      const items = res.data.map(item => {
                        const parts = item.match(/[\d-_]+\.mp4$/)
                        return {
                        url: `${baseUrl}/stored?clip=${item}`,
                        host: baseUrl,
                        label: item,
                        name: parts ? parts[0] : ''
                        }
                      });
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
        deleteVideo(context, item, toast) {
          context.commit('deleteVideo', item, toast);
          context.commit('refreshFiles', toast);
        },
        refreshFiles(context, toast) {
            context.commit('refreshFiles', toast);
        }
    }
});