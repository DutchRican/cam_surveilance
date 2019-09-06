<template>
  <div class="card main_card">
    <div class="card-body">
      <div class="row">
        <Camera v-if="selectedItem == null" :stream="liveFeed"></Camera>
        <VideoPlayer
          v-if="selectedItem"
          :video="selectedItem"
          :clipName="clipName"
          @backToLiveFeed="clearSelectedItem"
        ></VideoPlayer>
        <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <p>Available videos:</p>
            </div>
            <div class="card-body">
              <ul id="file_list">
                <li
                  v-for="(item, index) in storedItems"
                  v-bind:key="index"
                  v-on:click="setSource"
                >{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Camera from './Camera.vue';
import VideoPlayer from './VideoPlayer';
import { fetcher, serverUrl } from '../logic/fetchWrapper';

export default {
  name: 'CameraContainer',
  components: {
    Camera,
    VideoPlayer
  },
  data() {
    return {
      storedItems: [],
      liveFeed: `${serverUrl}/feed`,
      selectedItem: null,
      clipName: null
    }
  },
  created() {
    this.getStoredFiles();
  },
  methods: {
    getStoredFiles() {
      fetcher('/savedFiles')
        .then(res => res.json())
        .then(resJson => {
          this.storedItems = resJson;
        }).catch(err => console.log(err));
    },
    clearSelectedItem() {
      this.selectedItem = null;
    },
    setSource(e) {
      let name = e.target.innerHTML;
      fetcher(`/stored?clip=${name}`).then(res => res.blob()).then(blob => {
        this.selectedItem = URL.createObjectURL(blob);
        this.clipName = name;
      });
    }
  }
}
</script>
<style scoped>
div.main_card {
  width: 45%;
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
}
</style>