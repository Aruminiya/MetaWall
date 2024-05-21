<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>我按讚的貼文</h3>
  </section>
  <section>

    <div v-for="like in likes?.data?.data" :key="like._id">
      <div class="likesPost d-flex justify-content-between
      align-items-center px-3 py-5 mt-3 position-relative">
        <div class="user d-flex align-items-center">
          <div class="imgContainer mx-1 me-3">
              <img :src="like?.post?.user?.photo" alt="userPhoto">
          </div>
          <div>
            <div class="userName">{{like?.post?.user?.name}}</div>
            <div class="date d-flex">
              <span>發文時間：</span><span>{{like?.post?.createdAt}}</span>
            </div>
          </div>
        </div>
        <div class="likePostsBtn d-flex">
          <div class="mx-3" @click="toDeliteLike(like._id)">
            <i class="icon cancel bi bi-hand-thumbs-up"></i>
            <p class="m-0">取消</p>
          </div>
          <router-link :to="'/community/likePosts/' + like.post._id " class="mx-3">
            <i class="icon check bi bi-arrow-right-circle"></i>
            <p class="m-0">查看</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import Cookie from 'js-cookie';
import likesStore from '../stores/likesStore';

export default {
  data() {
    return {
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
    };
  },
  computed: {
    ...mapState(likesStore, ['likes']),
  },
  methods: {
    ...mapActions(likesStore, ['getLikes', 'deliteLike']),
    toDeliteLike(deliteLikeId) {
      this.deliteLike(deliteLikeId).then(() => {
        // eslint-disable-next-line no-underscore-dangle
        this.getLikes(undefined, this.currentUserData._id);
      });
    },
  },
  created() {
    // eslint-disable-next-line no-underscore-dangle
    this.getLikes(undefined, this.currentUserData._id);
  },
};
</script>

<style lang="scss" scoped>

.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

.likePostsBtn{
  cursor: pointer;
  .icon{
    font-size: 30px;
    &.cancel{
      color: $MataWall_blue;
    }
    &.check{
      color: $MataWall_black;
    }
}
}

.likesPost{
  height: 80px;
  border: solid 2px $MataWall_black;
  border-radius: 0.5rem;
  background-color: $MetaWall_white;
  box-shadow: 0 4px $MataWall_black;
  .date{
    opacity: 0.3;
  }

  @media screen and (max-width:480px){
    .date{
      font-size: 14px;
      flex-direction: column;
    }
  }
}
</style>
