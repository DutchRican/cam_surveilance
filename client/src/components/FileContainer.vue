<template>
  <div class="card file_list">
    <div class="card-header">
      <p>Available videos:</p>
    </div>
    <div class="card-body">
      <ul v-if="$store.state.files.length" id="file_list">
        <li
          v-for="(item, index) in $store.state.files"
          v-bind:key="index"
          v-on:click="$store.dispatch('loadVideo', item)"
        >{{item.label}}</li>
      </ul>
      <p v-else>No videos recorded yet</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileContainer",
  created() {
    this.$store.dispatch('refreshFiles', this.$bvToast);
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