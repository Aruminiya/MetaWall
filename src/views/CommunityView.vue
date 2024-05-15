<template>
  <NavbarComponent :currentUser="currentUser"/>
  <div class="container">
    <div class="row mt-5 h-100 position-relative">
      <div class="col-md-8 col-12">
        <RouterView />
      </div>
      <div class="col-4 d-md-block d-none">
        <section class="panel p-3">
          <router-link to="/community/createPost">
            <button class="btn MetaWall_button btnShdow w-100 mt-2" type="button">張貼動態</button>
          </router-link>
          <div class="p-3">
            <div class="panelBtn d-flex align-items-center">
              <div class="imgContainer mx-1 my-2 me-3">
                  <img :src="currentUser.photo" alt="userPhoto">
              </div>
              {{currentUser.name}}
            </div>
            <div class="panelBtn d-flex align-items-center">
              <div class="icon imgContainer d-flex justify-content-center
              align-items-center mx-1 my-2 me-3">
                <i class="bi bi-bell" style="font-size: 30px;"></i>
              </div>
              追蹤名單
            </div>
            <div class="panelBtn d-flex align-items-center">
              <div class="icon imgContainer d-flex justify-content-center
              align-items-center mx-1 my-2 me-3">
                <i class="bi bi-hand-thumbs-up" style="font-size: 30px;"></i>
              </div>
              按讚名單
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="phonePanel d-md-none d-block position-fixed">
        <section class="mx-4">
          <div class="phonePanelBtns d-flex justify-content-around align-items-center">
            <button class="phonePanelBtn btn MetaWall_button my-2" type="button">
              <i class="bi bi-house-door"></i>
            </button>
            <button class="phonePanelBtn btn MetaWall_button my-2" type="button">
              <i class="bi bi-bell"></i>
            </button>
            <button class="phonePanelBtn btn MetaWall_button my-2" type="button">
              <i class="bi bi-hand-thumbs-up"></i>
            </button>
            <button class="phonePanelBtn btn MetaWall_button my-2" type="button">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </section>
      </div>
</template>

<script>
import { mapState } from 'pinia';
import usersStore from '../stores/usersStore';

import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  components: { NavbarComponent },
  data() {
    return {
      postData: [1, 2, 3],
    };
  },
  computed: {
    ...mapState(usersStore, ['currentUser']),
  },
};
</script>

<style lang="scss" scoped>

.panel{
  border: $MataWall_black solid 2px ;
  background-color: $MetaWall_white;
  height: 336px;
  position: sticky;
  top: 80px;
  .panelBtn{
    cursor: pointer;
  }
}

.icon{
  background-color: $MetaWall_lightBlue;
}

.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}
.phonePanel{
  z-index: 10;
  bottom: 30px;
  width: 100%;
}
.phonePanelBtns{
  border: solid 2px $MataWall_black;
  border-radius: 3rem;
  background-color: $MataWall_gray02;
  .phonePanelBtn{
  border-radius:50% ;
}
}

</style>
