import axios from 'axios';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore('postsStore', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    // 取得貼文
    async getPosts(userId = undefined, content = undefined, sortOption = 'newToOld', id = undefined) {
      try {
        let posts;
        if (userId && content) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?userId=${userId}&content=${content}&sortOption=${sortOption}`);
        } else if (userId) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?userId=${userId}&sortOption=${sortOption}`);
        } else if (content) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?content=${content}&sortOption=${sortOption}`);
        } else if (id) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?_id=${id}`);
        } else {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?sortOption=${sortOption}`);
        }
        this.posts = posts;
        console.log(posts, id);
        return posts;
      } catch (err) {
        this.errMessage = err;
        return err;
      }
    },

    // 新增貼文
    async toPost(postData) {
      try {
        return await axios.post(`${import.meta.env.VITE_HOST}/posts`, postData);
      } catch (err) {
        this.errMessage = err;
        return err;
      }
    },

    // 上傳圖片至firebase
    async toUploadPost(selectedFile) {
      try {
        console.log(selectedFile);
        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log(formData);
        const res = await axios.post(`${import.meta.env.VITE_HOST}/upload/file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return res;
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
        return err;
      }
    },

    // 修改貼文
    async patchPosts(id, patchData) {
      try {
        await axios.patch(`${import.meta.env.VITE_HOST}/posts/${id}`, patchData);
        this.getPosts();
      } catch (err) {
        this.errMessage = err;
      }
    },
  },
});
