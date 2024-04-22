<template>
  <nav class="navbar navbar-light mb-1">
    <div class="container">
        <router-link class="routerLink navbar-brand m-0" to="community">
            <h4 class="logo text-center">MetaWall</h4>
        </router-link>
        <div class="user d-flex">
            <div class="imgContainer mx-1">
                <img class="img-fluid" src="../../public/userPhotoDefault.svg" alt="userPhoto">
            </div>
            <div class="userName">{{ userName }}</div>
        </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'NavbarComponent',
  data() {
    return {
      userName: 'Leo',
    };
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },

};
</script>

<style lang="scss" scoped>
.user{
    cursor: pointer;
}
.navbar{
    background-color: $MetaWall_white;
    box-shadow: 0 5px $MataWall_black;
}
.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    overflow: hidden;
}

.logo{
      font-family: "Paytone One", sans-serif;
      font-weight: 400;
      font-size: 26px;
      color: $MataWall_black;
}
</style>
