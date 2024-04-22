<template>
  <NavbarComponent/>
  <div class="container">
    <div class="row">
      <div class="col-8">
        Column
      </div>
      <div class="col-4">
        Column
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  components: { NavbarComponent },

};
</script>

<style scoped>
</style>
