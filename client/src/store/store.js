import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import fs from 'fs';
// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('../data/config.db', err => {
//   if (err) process.exit(1);
// });

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {cameras: []},
        isLiveFeed: true,
        videoItem: undefined,
        shouldRefresh: false,
        isShowSettings: false,
        files: []
    },
    getters: {

    },
    mutations: {
        loadConfig(state, config) {
            axios.get('http://localhost:3000/config/cameras')
            .then(res => {
                state.config = {...state.config, cameras: res.data.cameras || []};
            }).catch(err => {
                console.log(err);
            });
        },
        saveConfig(state, cameras) {
            // TODO write real logic for the update!
            axios.put('http://localhost:3000/config/cameras/1', {host: 'test', port: 123, name: 'new'}).then(res => console.log(res.data)).catch(err => console.log(err));
            state.config = {...state.config, cameras};
        },
        loadVideo(state, item) {
            state.videoItem = item;
            state.isLiveFeed = false;
        },
        clearVideo(state) {
            state.videoItem = undefined;
            state.isLiveFeed = true;
        },
        deleteVideo(state, item, toast) {
            axios.get(`${item.host}/delete?clip=${item.label}`)
                .then(() => toast.toast(`deleted file ${item.label}`, { title: 'deleted succesfully', variant: 'success' }))
                .catch((e) =>
                    toast.toast(e, { title: 'broke shit', variant: 'warning' }));
        },
        refreshFiles(state, toast) {
            state.files = [];
            for (let cam of state.config.cameras) {
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
        },
        toggleSettings(state) {
            state.isShowSettings = !state.isShowSettings;
        }
    },
    actions: {
        loadConfig(context) {
            const config = require("../../config/config.json");
            context.commit('loadConfig', config);
        },
        saveConfig(context, cameras) {
            context.commit('saveConfig', cameras);
            context.commit('toggleSettings');
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
        },
        toggleSettings(context) {
            context.commit('toggleSettings');
        }
    }
});