import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('postsStore', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    async getPosts() {
      try {
        const posts = await axios.get(`${import.meta.env.VITE_HOST}/posts`);
        this.posts = posts;
      } catch (err) {
        this.errMessage = err;
      }
    },
  },
});
