<template>
  <div id="notebook-list">
    <h1>{{ msg }}</h1>
    <router-link to="/note/1">note1</router-link>
    <router-link to="/note/2">note2</router-link>
  </div>
</template>

<script>
export default {
  name: "NotebookList",
  data() {
    return {
      msg: "笔记本列表"
    };
  }
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
