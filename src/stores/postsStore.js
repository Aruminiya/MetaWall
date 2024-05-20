import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('postsStore', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    // 取得貼文
    async getPosts(userId = undefined, content = undefined, sortOption = 'newToOld') {
      try {
        let posts;
        if (userId && content) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?userId=${userId}&content=${content}&sortOption=${sortOption}`);
        } else if (userId) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?userId=${userId}&sortOption=${sortOption}`);
        } else if (content) {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?content=${content}&sortOption=${sortOption}`);
        } else {
          posts = await axios.get(`${import.meta.env.VITE_HOST}/posts?sortOption=${sortOption}`);
        }
        this.posts = posts;
        console.log(posts);
      } catch (err) {
        this.errMessage = err;
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
