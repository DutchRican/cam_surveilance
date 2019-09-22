<template>
  <div class="col-md-6 col-sm-6 col-xs-6">
    <div class="card">
      <div class="card-header">
        <p>Camera:</p>
      </div>
      <img
        class="cam-feed media-object"
        :src="stream"
        alt="video"
      />
      <div class="card-footer">
        <p v-if="isRecording">Camera is recording</p>
        <p v-else>Currently not recording</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetcher, serverUrl } from '../logic/fetchWrapper';

export default {
  name: 'Camera',
  created() {
    setInterval(this.getCamStatus, 3000);
  },
  data() {
    return {
      isRecording: false,
    }
  },
  props: ['stream'],
  methods: {
    getCamStatus() {
      fetcher('/camStatus')
        .then(res => res.text())
        .then(text => {
          let wasRecording = this.isRecording;
          this.isRecording = text === 'true';
          if (wasRecording && !this.isRecording) {
            this.$emit('refetchClips');
          }
        });
    }
  }
}
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
</style>