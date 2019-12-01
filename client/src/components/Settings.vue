<template>
  <div class="modal" v-bind:class="{show: $store.state.isShowSettings}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Current Configuration:</h5>
        </div>
        <div class="modal-body">
          <ul v-if="Object.keys(cameras).length" class="settings-list">
              <CameraSettings v-for="camera in cameras" v-bind:key="camera.name"
              :toRemove="idsRemoving"
               :information="camera" 
               @updateCameraIndex="updateCameraIndex" @removeCameraIndex="removeCameraIndex"/>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" v-on:click="$store.dispatch('toggleSettings')">Close</button>
          <button class="btn btn-primary" v-on:click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraSettings from "./CameraSettings.vue";
import { isEqual } from 'lodash';

export default {
  name: "Settings",
  data(){
      return {
          cameras: [...this.$store.state.config.cameras],
          idsNeedUpdating: {},
          idsRemoving: []
      }
  },
  components: {
    CameraSettings
  },
  methods: {
    saveChanges() {
        this.$store.dispatch('saveConfig', {toUpdate: this.idsNeedUpdating, toRemove: this.idsRemoving, toast: this.$bvToast});
    },
    updateCameraIndex(camera) {
      const origCam = this.cameras.find(el => el.camera_id === camera.camera_id);
      if (!isEqual(origCam, camera)) {
        this.idsNeedUpdating[camera.camera_id] = {host: camera.host, port: camera.port, name: camera.name};
      }
    },
    removeCameraIndex(index) {
      let ids = [...this.idsRemoving];
      ids.includes(index)
      ? ids = ids.filter(el =>  el !== index)
      : ids.push(index);
      this.idsRemoving = [...ids];
    }
  }
};
</script>

<style scoped>
.modal.show {
  display: block;
}
.settings-list {
    list-style: none;
    padding-left: 1px;
}
</style>