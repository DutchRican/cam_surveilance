<template>
  <li class="settings-list-item">
    <!-- <p class="group-header">camera</p> -->
    <div class="card settings-card">
      <div class="card-header">
        <h5>Camera: {{information.camera_id}}</h5>
      </div>
      <div class="card-body">
        <div class="settings-info">
          <p>Host:</p>
          <input class="host" type="text" :value="information.host" v-on:input="updateValue" />
        </div>
        <div class="settings-info">
          <p>Name:</p>
          <input class="name" type="text" :value="information.name" />
        </div>
        <div class="settings-info">
          <p>Port:</p>
          <input class="port" type="text" :value="information.port" />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "CameraSettings",
  props: ["information"],
  methods: {
    updateValue(evt) {
        const {target} = evt;
      this.$emit("updateCameraIndex", this.index, target.value, target.className);
    }
  }
};
</script>

<style scoped>
.settings-list-item {
  display: flex;
  padding-bottom: 1.5em;
}
.group-header {
  flex: 1;
}
.settings-card {
  width: 100%;
}
.settings-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
input {
  text-align: center;
}
</style>