<template>
  <div class="card main_card">
    <div class="card-header">
      <p>Your Cameras:</p>
    </div>
    <div class="card-body">
      <div class="row">
        <VideoPlayer
          v-if="!isLiveFeed"
          :video="$store.state.videoItem.url"
          :clipName="videoItem.label"
          @backToLiveFeed="clearSelectedItem"
        ></VideoPlayer>
        <div
          class="col-md-6 col-sm-6 col-xs-6"
          v-else
          v-for="camera in cameras"
          v-bind:key="camera.host"
        >
          <Camera :stream="liveFeed" :camera="camera"></Camera>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      return this.$store.state.config.cameras;
    },
    isLiveFeed() {
      return this.$store.state.isLiveFeed;
    },
    videoItem() {
      return this.$store.state.videoItem
    }
  },
  data() {
    return {
      liveFeed: `/feed`,
      clipName: null
    };
  },
  methods: {
    clearSelectedItem() {
      this.$store.dispatch('clearVideo');
    }
  }
};
</script>
<style scoped>
div.main_card {
  flex: 3;
  font-size: 1.3vw;
}
</style>