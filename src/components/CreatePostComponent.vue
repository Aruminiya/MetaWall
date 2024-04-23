<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>張貼動態</h3>
  </section>
  <section>
    <div class="createPost p-5">
      <div class="content">
        <label for="content">貼文內容</label><br>
        <textarea name="content" id="content"></textarea>
      </div>
      <div class="image mt-1">
        <label for="upLoadimage" class="upLoadimage my-3 px-4 py-1">上傳圖片</label>
        <input id="upLoadimage" class="d-none" type="file">
      </div>
      <div v-if="image !== ''" class="imgContainer mx-1">
        <img :src="image" alt="photo">
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <button type="button" class="createPostBtn
        btn MetaWall_button btnShdow my-4 px-4">送出貼文</button>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      image: 'https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
  },
};
</script>

<style lang="scss" scoped>
.createPost{
  border: solid 2px $MataWall_black;
  background-color: $MetaWall_white;
  border-radius:0.5rem ;
}
.upLoadimage{
  cursor: pointer;
  font-weight: 300;
  background-color: $MataWall_black;
  border-radius: 5px;
  color: $MetaWall_white;
}

textarea{
  width: 100%;
  max-height: 200px;
  height: 30vh;
  resize:none;
  border: solid 2px $MataWall_black;
}

.imgContainer{
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

.createPostBtn{
  width: 60%;
  height: 50px;
}
</style>
