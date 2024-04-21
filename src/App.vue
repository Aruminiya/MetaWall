<template>
  <RouterView />
</template>

<script>
import LoginView from './views/LoginView.vue';

export default {
  components: [LoginView],
};
</script>

<style lang="scss">
body {
  display: grid;
  background-color: $MataWall_gray01;
  &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      background-image: linear-gradient(90deg, $MataWall_gray04 1px, transparent 0),
                        linear-gradient(180deg, $MataWall_gray04 1px, transparent 0);
      background-size: 60px 60px;
      z-index: -1;
  }
}

</style>
