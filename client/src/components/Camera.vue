<template>
  <div class="card cam_card" v-if="!isDown">
    <div class="card-header">
      <p class="float-left">{{camera.name}}</p>
      <p class="float-right">
        status:
        <font-awesome-icon icon="spinner" v-if="isChecking"></font-awesome-icon>
        <font-awesome-icon icon="circle" v-else-if="isRecording" class='cam-icon' size="xs"></font-awesome-icon>
        <font-awesome-icon icon="check-circle" v-else-if="!isRecording && !isChecking && !isDown" class="cam-icon-ready" size="xs"></font-awesome-icon>
      </p>
    </div>
    <img class="cam-feed media-object" :src="stream_url" alt="video" />
    <div class="card-footer"></div>
  </div>
  <div v-else>
    <p class="down-message">{{camera.name}} is down</p>
    <button v-if="isDown" v-on:click="setCheckInterval">recheck status</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Camera",
  created() {
    this.setCheckInterval();
  },
  data() {
    return {
      isRecording: false,
      camCheckInterval: null,
      isChecking: false,
      isDown: false
    };
  },
  props: ["stream", "camera"],
  methods: {
    setCheckInterval() {
      this.isDown = false;
      this.camCheckInterval = setInterval(this.getCamStatus, 3000);
    },
    getCamStatus() {
      if (!this.isChecking) {
        this.isChecking = true;
        axios
          .get(`http://${this.camera.host}:${this.camera.port}/camStatus`)
          .then(result => {
            let wasRecording = this.isRecording;
            this.isChecking = false;
            this.isRecording = result.data;
            if (wasRecording && !this.isRecording) {
              this.$store.dispatch("refreshFiles", this.$bvToast);
            }
          })
          .catch(() => {
            clearInterval(this.camCheckInterval);
            this.isChecking = false;
            this.camCheckInterval = null;
            this.isDown = true;
            this.$bvToast.toast("Status check failed", {
              title: `${this.camera.name} can't be reached.`,
              variant: "warning"
            });
          });
      }
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

.cam-icon {
  color: #ff3c00d5;
}

.cam-icon-ready {
  color: #30e93f
}

.cam_card {
  margin-bottom: 1.5em;
}

.down-message {
  display: inline-block;
  margin-right: 0.2em;
}
</style>