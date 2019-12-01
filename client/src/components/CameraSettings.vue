<template>
  <li class="settings-list-item">
    <!-- <p class="group-header">camera</p> -->
    <div class="card settings-card" :class="{'is-marked': markedForDeletion }">
      <div class="card-header">
        <h5 class="card-header-title">Camera: {{camera.camera_id}}</h5>
         <font-awesome-icon icon="trash-alt" class="delete-icon" v-on:click="removeCamera"></font-awesome-icon>
      </div>
      <div class="card-body">
        <div class="settings-info">
          <p>Host:</p>
          <input class="host-input" type="text" :value="camera.host" v-on:input="updateValue($event, 'host')" />
        </div>
        <div class="settings-info">
          <p>Name:</p>
          <input class="name-input" type="text" :value="camera.name" v-on:input="updateValue($event, 'name')"/>
        </div>
        <div class="settings-info">
          <p>Port:</p>
          <input class="port-input" type="text" :value="camera.port" v-on:input="updateValue($event, 'port')"/>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "CameraSettings",
  props: ["information", "toRemove"],
  data() {
    return {
      camera: this.$props.information
    }
  },
  computed: {
    markedForDeletion() {
      return this.$props.toRemove.includes(this.$props.information.camera_id)
    }
  },
  methods: {
    updateValue(evt, item) {
        const {target} = evt;
        this.camera = { ...this.camera, [item]: target.value  };
      this.$emit("updateCameraIndex", this.camera);
    },
    removeCamera() {
      this.$emit("removeCameraIndex", this.camera.camera_id);
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

.card-header-title {
  display: inline-block;
}

.delete-icon {
  float: right;
    margin: 5px 0px;
}

.is-marked {
  opacity: 0.2;
}
</style>