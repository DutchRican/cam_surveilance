<template>
  <div id="app" class="container-fluid" v-bind:class="{'modal-open': $store.state.isShowSettings}">
    <Header />
    <div style="display: flex; margin-top: 2em;">
      <CameraContainer />
      <FileContainer />
    </div>
  </div>
</template>

<script>
import CameraContainer from "./components/CameraContainer.vue";
import Header from "./components/Header";
import FileContainer from "./components/FileContainer";

export default {
  name: "app",
  components: {
    CameraContainer,
    Header,
    FileContainer
  },
  created() {
    this.$store.dispatch('loadConfig');
  }
};
</script>

