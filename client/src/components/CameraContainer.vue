<template>
  <div class="card main_card">
    <div class="card-header">
      <p>Your Cameras:</p>
    </div>
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
          v-for="camera in cameras"
          v-bind:key="camera.host"
        >
          <Camera :stream="liveFeed" :camera="camera" @errorHandler="setError"></Camera>
          <!-- @refetchClips="getStoredFiles"  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Camera from "./Camera.vue";
import VideoPlayer from "./VideoPlayer";

export default {
  name: "CameraContainer",
  components: {
    Camera,
    VideoPlayer
  },
  computed: {
    cameras() {
      return this.$store.state.config;
    }
  },
  data() {
    return {
      liveFeed: `/feed`,
      selectedItem: null,
      clipName: null
    };
  },
  methods: {
    clearSelectedItem() {
      this.selectedItem = null;
    },
    setError(err) {
     // this.error = { type: err.type, message: err.message };
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
  flex: 3;
  font-size: 2vw;
}
</style>