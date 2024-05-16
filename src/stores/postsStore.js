import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('postsStore', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    // 取得貼文
    async getPosts(content = undefined, sortOption = 'newToOld') {
      try {
        const posts = await axios.get(content ? `${import.meta.env.VITE_HOST}/posts?content=${content}&sortOption=${sortOption}` : `${import.meta.env.VITE_HOST}/posts?sortOption=${sortOption}`);
        this.posts = posts;
      } catch (err) {
        this.errMessage = err;
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
