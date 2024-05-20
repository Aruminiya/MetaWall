<template>
    <div class="person position-relative d-flex justify-content-between align-items-center mb-5">
        <div class="user position-relative d-flex align-items-center">
            <div class="imgContainer me-3">
                <img src="https://images.unsplash.com/photo-1600603405959-6d623e92445c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="userPhoto">
            </div>
            <div class="userName">
                <p class="m-0">張曉明</p>
                <p class="m-0">198564 人追蹤</p>
            </div>
        </div>
        <div class="follweBtn me-3">
            <button type="button" class="btn MetaWall_button btnShdow px-4">
                <span class="text-nowrap">追蹤</span></button>
        </div>
    </div>
    <PostAreaComponent :postUserId="postUserId"/>
</template>

<script>
import Cookies from 'js-cookie';
import PostAreaComponent from './PostAreaComponent.vue';

export default {
  components: { PostAreaComponent },
  data() {
    return {
      // eslint-disable-next-line no-underscore-dangle
      postUserId: JSON.parse(Cookies.get('MetaWall_user'))._id,
    };
  },
};
</script>

<style lang="scss" scoped>
.person{
    height: 80px;
    border: solid 2px $MataWall_black;
    background-color: $MetaWall_white;
    border-radius: 0.5rem;
    overflow: hidden;
    &::before{
      content: ' ';
      z-index: -1;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 8px;
      left: -8px;
      border: solid 2px $MataWall_black;
      background-color: $MetaWall_white;
    }
}
.user{
    width: 100%;
}

.imgContainer{
    border-right: solid 2px $MataWall_black;
    width: 80px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

</style>
