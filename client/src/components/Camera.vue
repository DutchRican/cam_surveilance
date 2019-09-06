<template>
  <div class="col-md-7">
    <div class="card">
      <div class="card-header">
        <p>Camera:</p>
      </div>
      <img
        class="cam-feed media-object"
        :src="stream"
        alt="video"
        height="320"
        width="426"
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
          this.isRecording = text === 'true';
        });
    }
  }
}
</script>
<style scoped>
img.cam-feed {
  margin: 0 auto;
}
</style>