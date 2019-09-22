<template>
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
      storedItems: []
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
</style>