<template>
  <div class="card main_card">
    <div class="card-body">
      <div class="row">
        <VideoPlayer
          v-if="selectedItem"
          :video="selectedItem"
          :clipName="clipName"
          @backToLiveFeed="clearSelectedItem"
        ></VideoPlayer>
        <Camera v-else :stream="liveFeed" @refetchClips="getStoredFiles"></Camera>
        <div class="col-md-6 col-sm-6 col-xs-6">
          <div class="card">
            <div class="card-header">
              <p>Available videos:</p>
            </div>
            <div class="card-body">
              <ul v-if="storedItems.length" id="file_list">
                <li
                  v-for="(item, index) in storedItems"
                  v-bind:key="index"
                  v-on:click="setSource"
                >{{item}}</li>
              </ul>
              <p v-else>No videos recorded yet</p>
            </div>
          </div>
        </div>
        <ToastError v-if="error" :error-type="error.type" :message="error.message" />
      </div>
    </div>
  </div>
</template>

<script>
import Camera from "./Camera.vue";
import VideoPlayer from "./VideoPlayer";
import ToastError from "./ToastError";
import { fetcher, serverUrl } from "../logic/fetchWrapper";

export default {
  name: "CameraContainer",
  components: {
    Camera,
    VideoPlayer,
    ToastError
  },
  data() {
    return {
      storedItems: [],
      liveFeed: `${serverUrl}/feed`,
      selectedItem: null,
      clipName: null,
      error: null
    };
  },
  created() {
    this.getStoredFiles();
  },
  methods: {
    getStoredFiles() {
      fetcher("/savedFiles")
        .then(res => res.json())
        .then(resJson => {
          this.storedItems = resJson;
        })
        .catch(
          err => (this.error = { type: "stored Files", message: err.message })
        ); // just ignoring the error for now.
    },
    clearSelectedItem() {
      this.selectedItem = null;
    },
    setSource(e) {
      let name = e.target.innerHTML;
      fetcher(`/stored?clip=${name}`)
        .then(res => res.blob())
        .then(blob => {
          this.selectedItem = URL.createObjectURL(blob);
          this.clipName = name;
        });
    }
  }
};
</script>
<style scoped>
div.main_card {
  width: 48%;
  font-size: 2vw;
}
ul {
  list-style: none;
  padding-inline-start: 0;
}

li {
  border: solid 1px lightgray;
  border-radius: 3px;
  padding: 0 0 2px 10px;
  margin-bottom: 2px;
  cursor: pointer;
  font-size: 1vw;
}
</style>