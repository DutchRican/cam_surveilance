<template>
  <div id="app" class="container-fluid">
      <Header />
    <CameraContainer/>
  </div>
</template>

<script>
import CameraContainer from './components/CameraContainer.vue'
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    CameraContainer,
    Header
  }
}
</script>

