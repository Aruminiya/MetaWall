<template>
  <NavbarComponent/>
  <div class="container">
    <div class="row mt-5">
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
            <button class="btn btn-secondary" type="button"><i class="bi bi-search"></i></button>
          </div>
        </section>
        <div v-for="item in postData" :key="item">
          <PostAreaComponent/>
        </div>
      </div>
      <div class="col-4 d-md-block d-none">
        Column
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

</style>
