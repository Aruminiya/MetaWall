<template>
  <!-- {{ posts?.data?.data }} -->
  <section class="userControl d-flex">
    <select class="form-select flex-grow-2 custom-select me-3" name="filter"
    v-model="filterOption" @change="this.getPosts(searchKeyWord,filterOption)">
      <option value="newToOld" selected>最新貼文</option>
      <option value="oldToNew">最舊貼文</option>
      <option value="leastLikes">最多讚數</option>
      <option value="mostLikes">最少讚數</option>
    </select>
    <div class="input-group">
      <input type="text" class="form-control h-100" placeholder="搜尋貼文" v-model="searchKeyWord">
      <button class="btn btn-secondary MetaWall_button"
      type="button" @click="this.getPosts(searchKeyWord,filterOption);">
      <i class="bi bi-search"></i></button>
    </div>
  </section>
  <section v-for="(post, index) in posts?.data?.data" :key="post._id" class="postArea my-3 p-4">
    <div class="user d-flex align-items-center">
        <div class="imgContainer mx-1" style="width: 45px;height: 45px;">
            <img :src="post.user.photo" alt="userPhoto">
        </div>
        <div class="userName">
          <router-link to="/community/personlWall">
            <p class="m-0"><span>{{post.user.name}}</span></p>
          </router-link>
          <div class="date">{{post.createdAt.split(/(T|\.)/)[0]}}
            &nbsp;{{post.createdAt.split(/(T|\.)/)[2]}}</div>
        </div>
    </div>
    <div class="content my-3">{{post.content}}</div>
    <div v-if="post.image" class="postImg my-3">
      <img :src="post.image" alt="postImg">
    </div>
    <div class="like my-3 d-flex align-items-center">
      <div class="likeBtn" ref="like" @click="likeSubmit(post, currentUserData._id)">
        <i v-if="isLikeHaveMe(post,currentUserData._id)"
        class="bi bi-hand-thumbs-up-fill"></i>
        <i v-else class="bi bi-hand-thumbs-up"></i>
      </div>

      <div class="mb-0 ms-1"
      v-if="isLikeHaveMe(post,currentUserData._id) && post.likes.length === 1 ">
      您已按讚</div>
      <div class="mb-0 ms-1"
      v-else-if="post.likes.length === 0"> 尚未有人按讚</div>
      <div class="mb-0 ms-1"
      v-else-if="isLikeHaveMe(post,currentUserData._id) && post.likes.length > 1">
      您與其他 {{ post.likes.length - 1 }} 位按讚</div>
      <div class="mb-0 ms-1"
      v-else>{{ post.likes.length }} 位按讚</div>
    </div>
    <div class="toMessage d-flex align-items-center my-3">
        <div class="imgContainer mx-1">
            <img :src="currentUserData.photo" alt="userPhoto">
        </div>
        <div class="input-group">
          <input type="text" class="form-control h-100" placeholder="留言..." ref="comment">
          <button class="btn btn-secondary MetaWall_button px-5"
          type="button" @click="commentSubmit(post, index)" >留言</button>
        </div>
    </div>
    <div v-for="comment in post.comments" :key="comment._id">
      <div class="posted position-relative my-3 p-3">
        <div class="user content d-flex align-comments-center">
          <div class="imgContainer mx-1">
              <img class="img-fluid" :src="comment?.user?.photo" alt="userPhoto">
          </div>
          <div class="userName mb-1">
            {{comment?.user?.name}}<br>
            <div class="date">{{comment.createdAt.split(/(T|\.)/)[0]}}
            &nbsp;{{comment.createdAt.split(/(T|\.)/)[2]}}</div>
          </div>
        </div>
        <div class="position-relative" style="left: 46px;">
          {{comment.content}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia';
// import Cookie from 'js-cookie';
import Cookie from 'js-cookie';
import postsStore from '../stores/postsStore';
import usersStore from '../stores/usersStore';
import commentsStore from '../stores/commentsStore';
import likesStore from '../stores/likesStore';

export default {
  props: { postUserId: { type: String, default: undefined } },
  data() {
    return {
      searchKeyWord: '',
      filterOption: 'newToOld',
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
    };
  },
  computed: {
    ...mapState(postsStore, ['posts']),
    ...mapState(usersStore, ['currentUser']),
  },
  methods: {
    ...mapActions(postsStore, ['getPosts', 'patchPosts']),
    ...mapActions(commentsStore, ['postComments']),
    ...mapActions(likesStore, ['getLikes', 'postLike', 'deliteLike']),
    isLikeHaveMe(post, userId) {
      // 檢查 "likes" 數組是否有任何一個元素滿足指定條件
      // eslint-disable-next-line no-underscore-dangle
      return post.likes.some((like) => like.user._id === userId);
    },
    // 貼文留言
    async commentSubmit(post, index) {
      const singleComment = this.$refs.comment[index].value;
      const commentData = {
        content: singleComment,
        // eslint-disable-next-line no-underscore-dangle
        user: this.currentUserData._id,
        // eslint-disable-next-line no-underscore-dangle
        post: post._id,
      };
      this.postComments(commentData).then(() => {
        this.$refs.comment[index].value = '';
        this.getPosts(this.searchKeyWord, this.filterOption);
      });
    },

    // 貼文按讚
    async likeSubmit(post, userId) {
      if (this.isLikeHaveMe(post, userId)) {
        // 如果我已按讚 刪除讚並重新渲染資料
        // eslint-disable-next-line no-underscore-dangle
        const likeData = post.likes.filter((like) => like.user._id === userId);
        // eslint-disable-next-line no-underscore-dangle
        this.deliteLike(likeData[0]._id).then(() => {
          this.getPosts(this.searchKeyWord, this.filterOption);
        });
      } else {
        // 如果我沒按讚 新增按讚並重新渲染資料
        // eslint-disable-next-line no-underscore-dangle
        this.postLike(post._id, userId).then(() => {
          this.getPosts(this.searchKeyWord, this.filterOption);
        });
      }
    },
  },
  mounted() {
    this.getPosts(this.postUserId);
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

.postArea{
  border: solid 2px $MataWall_black;
  border-radius: 0.5rem;
  background-color: $MetaWall_white;
}

.user{
    cursor: pointer;
    .userName {
      &:hover {
        p span{
          transition: all 0.1s ease-in-out ;
          color: $MataWall_blue;
          border-bottom: solid 2px $MataWall_blue;
        }
      }
      .date{
        font-size: 12px;
        opacity: 0.5;
      }
    }
}

.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

.postImg{
  border: solid 2px $MataWall_black;
  background-color: $MataWall_gray02;
  border-radius: 1rem;
  overflow: hidden;
  img{
    width: 100%;
    max-height: 70vh;
    object-fit: contain;
  }
}
.likeBtn {
  transition: all 0.1s ease-in-out;
  .bi {
    cursor: pointer;
    font-size: 20px;
    color: $MataWall_blue; /* 这里更改为你想要的颜色 */
  }
  &:hover{
      scale: 1.1;
    }
  &:active{
    scale: 0.9;
  }
}

.toMessage{
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

.posted{
  background-color: $MataWall_gray01;
}

</style>
