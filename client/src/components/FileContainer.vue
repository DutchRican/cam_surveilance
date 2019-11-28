<template>
  <div class="card file_list">
    <div class="card-header">
      <p>Available videos:</p>
    </div>
    <div class="card-body">
      <ul v-if="$store.state.files.length" id="file_list">
        <li class="file-list-item" v-for="(item, index) in $store.state.files" v-bind:key="index">
          <p class="list-item-name" v-on:click="$store.dispatch('loadVideo', item)">{{item.label}}</p>
          <a :href="item.url" :download="item.label"><font-awesome-icon target="_blank" class="download-icon" icon="download"></font-awesome-icon></a>
        </li>
      </ul>
      <p v-else>No videos recorded yet</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileContainer",
  created() {
    this.$store.dispatch("refreshFiles", this.$bvToast);
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
  font-size: 1vw;
}

.file_list {
  flex: 1;
  margin-left: 1.5em;
}

.file-list-item {
  display: flex;
  justify-content: space-between;
}

.list-item-name {
  display: inline-block;
  margin: 1px 0px;
  cursor: pointer;
}

.download-icon {
  margin: 5px 5px 5px 0;
  cursor: pointer;
}
</style>