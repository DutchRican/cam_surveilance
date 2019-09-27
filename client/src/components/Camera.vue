<template>
  <div class="card cam_card">
    <div class="card-header">
      <p>Camera:</p>
    </div>
    <img class="cam-feed media-object" :src="stream_url" alt="video" />
    <div class="card-footer">
      <p v-if="isRecording">Camera is recording</p>
      <p v-else>Currently not recording</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Camera",
  created() {
    this.camCheckInterval = setInterval(this.getCamStatus, 3000);
  },
  data() {
    return {
      isRecording: false,
      camCheckInterval: null
    };
  },
  props: ["stream", "camera"],
  methods: {
    getCamStatus() {
      axios
        .get(`http://${this.camera.host}:${this.camera.port}/camStatus`)
        .then(result => {
          let wasRecording = this.isRecording;
          this.isRecording = result.data === "true";
          if (wasRecording && !this.isRecording) {
            this.$emit("refetchClips");
          }
        })
        .catch(err => {
          clearInterval(this.camCheckInterval);
          this.$bvToast.toast('Status check failed',{title: `${this.camera.name} can't be reached.`, variant: 'warning'});
        });
    }
  },
  computed: {
    stream_url() {
      return `http://${this.camera.host}:${this.camera.port}${this.stream}`;
    }
  }
};
</script>
<style scoped>
img.cam-feed {
  margin: 0 auto;
  height: 100%;
  width: 100%;
}
.card-footer {
  font-size: 1.3vw;
}

.cam_card {
  margin-bottom: 1.5em;
}
</style>