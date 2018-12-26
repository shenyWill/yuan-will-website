<template>
  <div id="app">
    <div class="mark" v-if="loading">
      <img :src="loadImg" alt="" class="mark-loading">
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      loadImg: require('@/assets/images/camera-aperture-ajax-spinner.svg')
    };
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
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
.mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}
.mark-loading {
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  position: absolute;
}
html::-webkit-scrollbar {
    width: 8px;
    height: 4px;
}
html::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(119, 203, 223, 0.993);
    background: rgba(119, 203, 223, 0.993);
}
html::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 5px rgba(119, 203, 223, 0.993);
    border-radius: 0;
    background: rgba(119, 203, 223, 0.993);
}
</style>
