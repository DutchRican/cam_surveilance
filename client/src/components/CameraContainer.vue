<template>
  <div class="card main_card">
    <div class="card-body">
      <div class="row">
        <VideoPlayer
          v-if="selectedItem"
          :video="selectedItem"
          :clipName="clipName"
          @backToLiveFeed="clearSelectedItem"
        ></VideoPlayer>
        <div
          class="col-md-6 col-sm-6 col-xs-6"
          v-else
          v-for="camera in config"
          v-bind:key="camera.host"
        >
          <Camera :stream="liveFeed" :camera="camera" @errorHandler="setError"></Camera>
          <!-- @refetchClips="getStoredFiles"  -->
        </div>
      </div>
    </div>
    <ToastError v-if="error" :type="error.type" :message="error.message" />
  </div>
</template>

<script>
import axios from "axios";
import Camera from "./Camera.vue";
import VideoPlayer from "./VideoPlayer";
import ToastError from "./ToastError";

export default {
  name: "CameraContainer",
  components: {
    Camera,
    VideoPlayer,
    ToastError
  },
  data() {
    return {
      liveFeed: `/feed`,
      selectedItem: null,
      clipName: null,
      error: null,
      config: require("../../config/config.json")
    };
  },
  methods: {
    clearSelectedItem() {
      this.selectedItem = null;
    },
    setError(err) {
      this.error = { type: err.type, message: err.message };
    },
    setSource(e) {
      // let name = e.target.innerHTML;
      // fetcher(`/stored?clip=${name}`)
      //   .then(res => res.blob())
      //   .then(blob => {
      //     this.selectedItem = URL.createObjectURL(blob);
      //     this.clipName = name;
      //   });
    }
  }
};
</script>
<style scoped>
div.main_card {
  width: 48%;
  font-size: 2vw;
}
</style>