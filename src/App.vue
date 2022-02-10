<template>
  <div id="app">
    <button @click="back">back</button>
    <button @click="next">next</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    back() {
      this.$router.go(-1);
    },
    next() {
      this.$router.go(1);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
