

<template>
  <div class="main-layout">
    <router-view></router-view>
    <div class="navigation-bar">
      <navigation-bar></navigation-bar>
    </div>
  </div>
</template>
<script>
import NavigationBar from './components/NavigationBar.vue';
import NavigationScreen from './components/NavigationScreen.vue'

export default {
 components: {
  NavigationScreen,
  NavigationBar,
 }
}
</script>
<style>
#app {
  width: 100%;
  height: 100vh;
  padding: 0;
}
.main-layout {
  width: 100%;
  height: 100%;
}
.navigation-bar {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 25px;
  width: 100%;
  z-index: 100000;
}
</style>
