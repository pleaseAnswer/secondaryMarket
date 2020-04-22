<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
