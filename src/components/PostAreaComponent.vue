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
  <section v-for="post in posts?.data?.data" :key="post._id" class="postArea my-3 p-4">
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
    <div class="postImg my-3">
      <img :src="post.image" alt="postImg">
    </div>
    <div class="like my-3 d-flex">
      <i v-if="isLikeHaveMe(post,currentUser._id)"
      class="bi bi-hand-thumbs-up-fill custom-thumbs"></i>
      <i v-else class="bi bi-hand-thumbs-up custom-thumbs"></i>
      <p class="mb-0 ml-1"
      v-if="isLikeHaveMe(post,currentUser._id)">您與其他 {{ post.likes.length - 1 }} 位按讚</p>
      <p class="mb-0 ml-1"
      v-else>{{ post.likes.length }} 位按讚</p>
    </div>
    <div class="toMessage d-flex align-items-center my-3">
        <div class="imgContainer mx-1">
            <img :src="post.user.photo" alt="userPhoto">
        </div>
        <div class="input-group">
          <input type="text" class="form-control h-100" placeholder="留言...">
          <button class="btn btn-secondary MetaWall_button px-5"
          type="button">留言</button>
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
import postsStore from '../stores/postsStore';
import usersStore from '../stores/usersStore';

export default {
  data() {
    return {
      searchKeyWord: '',
      filterOption: 'newToOld',
    };
  },
  computed: {
    ...mapState(postsStore, ['posts']),
    ...mapState(usersStore, ['currentUser']),
  },
  methods: {
    ...mapActions(postsStore, ['getPosts']),
    isLikeHaveMe(post, userId) {
      // 檢查 "likes" 數組是否有任何一個元素滿足指定條件
      // eslint-disable-next-line no-underscore-dangle
      return post.likes.some((like) => like._id === userId);
    },
  },
  mounted() {
    this.getPosts();
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

.custom-thumbs {
  font-size: 20px;
  color: $MataWall_blue; /* 这里更改为你想要的颜色 */
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
