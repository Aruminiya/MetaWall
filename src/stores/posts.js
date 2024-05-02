import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('posts', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    async getPosts() {
      try {
        const posts = await axios.get(`${import.meta.env.VITE_HOST}/posts`);
        this.posts = posts;
        console.log(this.posts);
      } catch (err) {
        this.errMessage = err;
      }
    },
  },
});
