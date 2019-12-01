<template>
  <div class="modal" v-bind:class="{show: $store.state.isShowSettings}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Current Configuration:</h5>
        </div>
        <div class="modal-body">
          <ul v-if="Object.keys(cameras).length" class="settings-list">
              <CameraSettings v-for="camera in cameras" v-bind:key="camera.name" :information="camera"  @updateCameraIndex="updateCameraIndex"/>
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

export default {
  name: "Settings",
  data(){
      return {
          cameras: this.$store.state.config.cameras 
      }
  },
  components: {
    CameraSettings
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('saveConfig', this.cameras);
    },
    updateCameraIndex(item, value, field) {
        const cameras = this.cameras;
        cameras[item][field] = value
        this.cameras = cameras;
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