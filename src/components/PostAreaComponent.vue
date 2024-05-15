<template>
  <!-- {{ posts?.data?.data }} -->
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
  <section v-for="post in posts?.data?.data" :key="post._id" class="postArea my-3 p-4">
    <div class="user d-flex align-items-center">
        <div class="imgContainer mx-1" style="width: 45px;height: 45px;">
            <img :src="post.user.photo" alt="userPhoto">
        </div>
        <div class="userName">
          {{post.user.name}}<br>
          <div class="date">{{post.createdAt.split(/(T|\.)/)[0]}}
            &nbsp;{{post.createdAt.split(/(T|\.)/)[2]}}</div>
        </div>
    </div>
    <div class="content my-3">{{post.content}}</div>
    <div class="postImg my-3">
      <img :src="post.image" alt="postImg">
    </div>
    <div class="like my-3">
      <i v-if="post.likes" class="bi bi-hand-thumbs-up-fill custom-thumbs"></i>
      <i v-else class="bi bi-hand-thumbs-up custom-thumbs"></i>
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

export default {
  data() {
    return {
      postData: {
        _id: '6614ee8ba237680be218c792',
        name: '吳伊甫',
        photo: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '2024/04/21',
        content: '大家好 今天的天氣好冷 !',
        image: 'https://images.unsplash.com/photo-1713687070911-8c89cece491d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        like: 15,
        comment: [
          {
            _id: '662369099b417763bd588434',
            name: '林木水',
            photo: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=1868&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2024/04/22',
            content: '真的 已經要秋天了',
          },
          {
            _id: '662365e662f7a88edae70a40',
            name: '孫秋賢',
            photo: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            date: '2024/04/23',
            content: '可以開始穿大衣了',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(postsStore, ['posts']),
  },
  methods: {
    ...mapActions(postsStore, ['getPosts']),
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
    .userName .date{
      font-size: 12px;
      opacity: 0.5;
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
