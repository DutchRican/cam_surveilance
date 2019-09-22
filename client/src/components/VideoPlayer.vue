<template>
  <div class="col-md-6 col-sm-6 col-xs-6">
    <div class="card">
      <div class="card-header">
        <p>Previous footage: {{clipName}}</p>
      </div>
      <video
        class="media-object"
        :src="video"
        autoplay
        controls
        preload="metadata"
        alt="video"
      />
    </div>
    <button class="btn btn-secondary go_back" v-on:click="backToFeed"><font-awesome-icon icon="arrow-left"/>Live</button>
  </div>
</template>

<script>

export default {
  name: 'VideoPlayer',
  props: ['video','clipName'],
  methods: {
      backToFeed() {
          this.$emit('backToLiveFeed')
      }
  }
}
</script>
<style scoped>
video {
  margin: 0 auto;
  height: 100%;
  width: 100%;
}

button.go_back {
    margin-top: 0.5em;
}
button.go_back > svg {
    margin: 0 5px 0 0;
}
.card-header > p, button {
  font-size: 1.3vw;
}
</style>