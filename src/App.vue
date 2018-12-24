<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0 auto;
  background-color: #eeeeee;
}
html::-webkit-scrollbar {
    width: 8px;
    height: 4px;
}
html::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(119, 203, 223, 0.993);
    background: rgba(119, 203, 223, 0.993);
}
html::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 5px rgba(119, 203, 223, 0.993);
    border-radius: 0;
    background: rgba(119, 203, 223, 0.993);
}
</style>
