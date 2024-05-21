<template>
<section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>我按讚的貼文</h3>
</section>
<section>
   <PostAreaComponent />
</section>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import Cookie from 'js-cookie';
import likesStore from '../stores/likesStore';

import PostAreaComponent from './PostAreaComponent.vue';

export default {
  components: { PostAreaComponent },
  data() {
    return {
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
    };
  },
  computed: {
    ...mapState(likesStore, ['likes']),
  },
  methods: {
    ...mapActions(likesStore, ['getLikes']),
  },
  created() {
    // eslint-disable-next-line no-underscore-dangle
    this.getLikes(undefined, undefined, this.$route.params.likePostId);
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
