<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>我按讚的貼文</h3>
  </section>
  <section>

    <div v-for="(like, index) in likes?.data?.data" :key="like._id">
      <div class="likesPost d-flex justify-content-between
      align-items-center px-3 py-5 mt-3 position-relative">
        <div class="user d-flex align-items-center">
          <div class="imgContainer mx-1 me-3">
              <img :src="like?.post?.user?.photo" alt="userPhoto">
          </div>
          <div>
            <div class="userName">{{like?.post?.user?.name}}</div>
            <div class="date d-flex">
              <span>發文時間：</span><span>{{calculatingLikePostTime[index]}}</span>
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
      postTime: '',
    };
  },
  computed: {
    ...mapState(likesStore, ['likes']),
    calculatingLikePostTime() {
      return this.likes?.data?.data.map((e) => this.convertToGMT8(e.post.createdAt));
    },
  },
  methods: {
    ...mapActions(likesStore, ['getLikes', 'deliteLike']),
    toDeliteLike(deliteLikeId) {
      this.deliteLike(deliteLikeId).then(() => {
        // eslint-disable-next-line no-underscore-dangle
        this.getLikes(undefined, this.currentUserData._id);
      });
    },

    // 時間轉換 GTM+8
    convertToGMT8(isoDate) {
      // 創建日期對象
      const date = new Date(isoDate);

      // 獲取 UTC 時間的毫秒數
      const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

      // 轉換為 GMT+8 時區
      const gmt8Time = new Date(utcTime + (8 * 3600000));

      // 格式化日期和時間
      const year = gmt8Time.getFullYear();
      const month = String(gmt8Time.getMonth() + 1).padStart(2, '0');
      const day = String(gmt8Time.getDate()).padStart(2, '0');

      const hours = String(gmt8Time.getHours()).padStart(2, '0');
      const minutes = String(gmt8Time.getMinutes()).padStart(2, '0');
      const seconds = String(gmt8Time.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
