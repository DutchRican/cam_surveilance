<template>
  <div class="card file_list">
    <div class="card-header">
      <p>Available videos:</p>
    </div>
    <div class="card-body">
      <ul v-if="storedItems.length" id="file_list">
        <li v-for="(item, index) in storedItems" v-bind:key="index" v-on:click="setSource">{{item}}</li>
      </ul>
      <p v-else>No videos recorded yet</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileContainer",
  created() {
      this.getStoredFiles();
  },
  methods: {
    getStoredFiles() {
      const currentFiles = [];
      for (let cam of this.cameras) {
        axios
          .get(`http://${cam.host}:${cam.port}/savedFiles`)
          .then(res => [...currentFiles, ...res.data])
          .catch(err =>
            this.$bvToast.toast("Fetching files failed", {
              title: `${cam.name} can't be reached.`,
              variant: "warning"
            })
          );
      }
      this.storedItems = currentFiles;
      // fetcher("/savedFiles")
      //   .then(res => res.json())
      //   .then(resJson => {
      //     this.storedItems = resJson;
      //   })
      //   .catch(
      //     err => (this.error = { type: "stored Files", message: err.message })
      //   ); // just ignoring the error for now.
    }
  },
  data() {
    return {
      storedItems: [],
      cameras: this.$store.state.config
    };
  }
};
</script>

<style scoped>
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

.file_list {
  flex: 1;
  margin-left: 1.5em;
}
</style>