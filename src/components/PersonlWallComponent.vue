<template>
    <div class="person position-relative d-flex mb-5">
        <div class="user position-relative d-flex align-items-center">
            <div class="imgContainer me-3">
                <img :src="postUserData?.photo" alt="userPhoto">
            </div>
            <div class="userName">
                <p class="m-0">{{postUserData?.name}}</p>
                <p class="m-0">{{postUserData?.follower?.length}} 人追蹤</p>
            </div>
        </div>
        <div class="follweBtn d-flex align-items-center me-3">
          <div v-if="postUserData?._id !== currentUserData?._id">
            <button v-if="!isFollowing"
            type="button" class="btn MetaWall_button btnShdow px-4">
                <span class="text-nowrap" @click="toFollow()">追蹤</span>
            </button>
            <button v-else
            type="button" class="btn MetaWall_button_yellow btnShdow px-4">
                <span class="text-nowrap" @click="toUnFollow()">已追蹤</span>
            </button>
          </div>
        </div>
    </div>
    <PostAreaComponent/>
</template>

<script>
import { mapActions } from 'pinia';
import Cookie from 'js-cookie';
import postsStore from '../stores/postsStore';
import usersStore from '../stores/usersStore';

import PostAreaComponent from './PostAreaComponent.vue';

export default {
  components: { PostAreaComponent },
  data() {
    return {
      // eslint-disable-next-line no-underscore-dangle
      postUserData: undefined,
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
    };
  },
  computed: {
    // 檢查該貼文人是否被我追蹤
    isFollowing() {
      // eslint-disable-next-line no-underscore-dangle
      return this.postUserData?.follower
      // eslint-disable-next-line no-underscore-dangle
        .some((element) => element.user._id === this.currentUserData._id);
    },
  },
  methods: {
    ...mapActions(postsStore, ['getPosts']),
    ...mapActions(usersStore, ['getUser', 'userFollow', 'userUnFollow']),
    toFollow() {
      // eslint-disable-next-line no-underscore-dangle
      console.log(this.currentUserData._id, this.postUserData._id);
      // eslint-disable-next-line no-underscore-dangle
      this.userFollow(this.currentUserData._id, this.postUserData._id).then(() => {
        this.getUser(this.$route.params.id).then((postUser) => {
          this.postUserData = postUser?.data?.data[0];
          this.getPosts(this.$route.params.id);
        });
      });
    },
    toUnFollow() {
      // eslint-disable-next-line no-underscore-dangle
      console.log(this.currentUserData._id, this.postUserData._id);
      // eslint-disable-next-line no-underscore-dangle
      this.userUnFollow(this.currentUserData._id, this.postUserData._id).then(() => {
        this.getUser(this.$route.params.id).then((postUser) => {
          this.postUserData = postUser?.data?.data[0];
          this.getPosts(this.$route.params.id);
        });
      });
    },
  },
  created() {
    this.getUser(this.$route.params.id).then((postUser) => {
      this.postUserData = postUser?.data?.data[0];
      this.getPosts(this.$route.params.id);
    });
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
    height: 100%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

</style>
