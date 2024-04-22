<template>
 <section class="my-3 p-4">
    <div>
        <div class="user d-flex align-items-center">
            <div class="imgContainer mx-1">
                <img class="img-fluid" src="../../public/userPhotoDefault.svg" alt="userPhoto">
            </div>
            <div class="userName">
              {{ userName }}<br>
              <div class="date">2024/04/22</div>
            </div>
        </div>
        <div class="content mt-3">大家好 今天的天氣好冷</div>
        <div class="postImg mt-3">
          <img src="https://images.unsplash.com/photo-1713687070911-8c89cece491d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="userPhoto">
        </div>
        <div class="like mt-3"><i class="bi bi-hand-thumbs-up custom-thumbs"></i>
          <i class="bi bi-hand-thumbs-up-fill custom-thumbs"></i>
          15
        </div>
        <div class="toMessage d-flex align-items-center mt-3">
            <div class="imgContainer mx-1">
                <img class="img-fluid" src="../../public/userPhotoDefault.svg" alt="userPhoto">
            </div>
            <div class="input-group">
              <input type="text" class="form-control h-100" placeholder="留言...">
              <button class="btn btn-secondary" type="button"><i class="bi bi-search"></i></button>
            </div>
        </div>
    </div>
 </section>
</template>

<script>

export default {
  data() {
    return {
      userName: 'Leo',
    };
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  },

};
</script>

<style lang="scss" scoped>
section{
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
    width: 45px;
    height: 45px;
    overflow: hidden;
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
  .imgContainer{
    width: 40px;
    height: 40px;
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
