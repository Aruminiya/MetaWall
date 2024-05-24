<template>
  <nav class="navbar navbar-light position-sticky top-0 mb-1" @click="isPopPanal = false">
    <div class="container position-relative">
        <router-link class="routerLink navbar-brand m-0" to="/community/postArea">
            <h4 class="logo text-center">MetaWall</h4>
        </router-link>
        <div class="position-relative">
          <div class="user d-flex" @click.stop="isPopPanal = !isPopPanal">
            <div class="imgContainer mx-1"><img :src="currentUserData.photo" alt="userPhoto"></div>
            <div class="userName"><p class="m-0">{{ currentUserData.name }}</p></div>
          </div>
          <div class="popPanal position-absolute end-0"
          :class="{ popPanalActive: isPopPanal }">
            <router-link :to="'/community/postArea/' + currentUserData._id">
              <button class="m-0 py-1 w-100 text-center">我的貼文</button>
            </router-link>
            <router-link to="/community/modifyPersonal">
              <button class="m-0 py-1 w-100 text-center">修改個人資料</button>
            </router-link>
            <button class="m-0 py-1 w-100 text-center" @click="logoutBtn()">登出</button>
          </div>
        </div>
    </div>
  </nav>
  <div class="container-fluid popPanalBG position-fixed top-0 mb-1 start-0"
  :class="{ popPanalActive: isPopPanal }"
  @click="isPopPanal = false"></div>
</template>

<script>
import { mapActions } from 'pinia';
import usersStore from '../stores/usersStore';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isPopPanal: false,
    };
  },
  props: {
    currentUserData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(usersStore, ['logout']),
    logoutBtn() {
      this.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
nav{
  z-index: 10;
}

.user{
  cursor: pointer;
  p{
    border-bottom: solid 2px $MataWall_black;
  }
  &:hover {
    p{
      transition: all 0.1s ease-in-out ;
      border-bottom: solid 2px $MataWall_blue;
      color: $MataWall_blue;
    }
    .icon{
      transition: all 0.1s ease-in-out ;
      background-color: $MataWall_blue;
      color: $MetaWall_white;
    }
  }
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
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

.logo{
      font-family: "Paytone One", sans-serif;
      font-weight: 400;
      font-size: 26px;
      color: $MataWall_black;
      z-index: -2;
}

.popPanal{
  display: none;
  border: solid 2px $MataWall_black;
  background-color: $MetaWall_white;
  min-width: 182px;
  button{
    background-color: $MetaWall_white;
    font-weight: 500;
    border: solid 1px $MataWall_black;
    transition: all 0.1s ease-in-out;
    &:hover{
      background-color: $MataWall_gray02;
    }
  }
}
.popPanalBG{
    display: none;
    z-index: 1;
    width: 100vw;
    height: 100vh;
  }
.popPanalActive{
  display: block;
}
</style>
