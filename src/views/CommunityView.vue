<template>
  <NavbarComponent/>
  <div class="container">
    <div class="row mt-5 h-100 position-relative">
      <div class="col-md-8 col-12">
        <section class="userControl d-flex">
          <select class="form-select flex-grow-2 custom-select me-3" name="filter">
            <option value="asc" selected>最新貼文</option>
            <option value="desc">最舊貼文</option>
            <option value="mostLike">最多讚數</option>
            <option value="leastLike">最少讚數</option>
          </select>
          <div class="input-group">
            <input type="text" class="form-control h-100" placeholder="搜尋貼文">
            <button class="btn btn-secondary MetaWall_button"
            type="button"><i class="bi bi-search"></i></button>
          </div>
        </section>
        <div v-for="item in postData" :key="item">
          <PostAreaComponent/>
        </div>
      </div>
      <div class="col-4 d-md-block d-none">
        <section class="panel p-3">
          <button class="btn MetaWall_button btnShdow w-100 mt-2" type="button">張貼動態</button>
          <div class="p-3">
            <div class="d-flex align-items-center">
              <div class="imgContainer mx-1 my-2 me-3">
                  <img class="img-fluid" src="../../public/userPhotoDefault.svg" alt="userPhoto">
              </div>
              Leo
            </div>
            <div class="d-flex align-items-center">
              <div class="icon imgContainer d-flex justify-content-center
              align-items-center mx-1 my-2 me-3">
                <i class="bi bi-bell" style="font-size: 30px;"></i>
              </div>
              追蹤名單
            </div>
            <div class="d-flex align-items-center">
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
</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import PostAreaComponent from '../components/PostAreaComponent.vue';

export default {
  components: { NavbarComponent, PostAreaComponent },
  data() {
    return {
      postData: [1, 2, 3],
    };
  },
};
</script>

<style lang="scss" scoped>
.userControl{
  height: 46px;
  .form-select {
    width: 0;
    flex-grow: 3;
    border: $MataWall_black solid 2px ;
    border-radius: 0;
    &:focus{
      box-shadow: none;
    }
  }
  .input-group{
    width: 0;
    flex-grow: 7;
    .form-control{
      border: $MataWall_black solid 2px;
      border-right: none;
      border-radius: 0;
      &:focus{
        box-shadow: none;
      }
    }
    button{
      border: $MataWall_black solid 2px ;
      border-radius:0 ;
      background-color: $MataWall_blue;
      color: $MetaWall_white;
    }
  }
}

.panel{
  border: $MataWall_black solid 2px ;
  background-color: $MetaWall_white;
  height: 336px;
  position: sticky;
  top: 80px;
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
}

</style>
