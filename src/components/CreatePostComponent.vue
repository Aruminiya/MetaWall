<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>張貼動態</h3>
  </section>
  <section>
    <div class="createPost p-5">
      <div class="content">
        <label for="content">貼文內容</label><br>
        <textarea name="content" id="content" v-model="content"></textarea>
      </div>
      <p class="errorMessage text-center">{{ errorMessage }}</p>
      <div class="image mt-1">
        <label for="upLoadimage" class="upLoadimage my-3 px-4 py-1">上傳圖片</label>
        <input id="upLoadimage" class="d-none" type="file" @change="upLoadimage($event)">
      </div>
      <div v-if="image !== ''" class="imgContainer mx-1">
        <img :src="image" alt="photo">
      </div>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <button type="button" class="createPostBtn
        btn MetaWall_button btnShdow my-4 px-4" @click="submitPost">送出貼文</button>
      </div>

    </div>
    {{ content }}
    {{ image }}
  </section>
</template>

<script>
import { mapActions } from 'pinia';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import postsStore from '../stores/postsStore';

export default {
  data() {
    return {
      content: '',
      image: '',
      selectedFile: null,
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(postsStore, ['toPost', 'getPosts']),
    upLoadimage(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.image = URL.createObjectURL(file);
      }
    },
    async submitPost() {
      if (!this.content) {
        this.errorMessage = '請輸入貼文內容';
        return;
      }

      const postData = {
        tags: [],
        type: '',
        image: this.image,
        content: this.content,
        // eslint-disable-next-line no-underscore-dangle
        user: JSON.parse(Cookies.get('MetaWall_user'))._id,
      };

      if (this.selectedFile) {
        this.errText = '';
        try {
          const formData = new FormData();
          formData.append('image', this.selectedFile);

          const res = await this.axios.post(`${import.meta.env.VITE_HOST}/upload/file`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          postData.image = res.data.fileUrl;
        } catch (err) {
          const errMessage = err.response.data.message;
          if (errMessage === 'File too large') {
            Swal.fire({
              icon: 'error',
              title: '圖片檔案過大',
              text: '文件大小上限為 2 MB',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '發生錯誤請重新嘗試',
            });
          }
          return;
        }
      }

      try {
        this.errText = '';
        await this.toPost(postData);
        Swal.fire({
          icon: 'success',
          title: '貼文上傳成功',
        }).then(() => {
          this.resetForm();
          this.getPosts().then(() => {
            this.$router.push('/community/postArea');
          });
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: '貼文上傳失敗',
          text: '請重新嘗試',
        });
      }
    },
    resetForm() {
      this.content = '';
      this.image = '';
      this.selectedFile = null;
    },
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

.errorMessage{
  color: $MataWall_red;
}
</style>
