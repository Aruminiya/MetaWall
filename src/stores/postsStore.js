import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('postsStore', {
  state: () => ({
    posts: [],
    errMessage: {},
  }),
  actions: {
    async getPosts(content = undefined, sortOption = 'newToOld') {
      try {
        const posts = await axios.get(content ? `${import.meta.env.VITE_HOST}/posts?content=${content}&sortOption=${sortOption}` : `${import.meta.env.VITE_HOST}/posts?sortOption=${sortOption}`);
        this.posts = posts;
      } catch (err) {
        this.errMessage = err;
      }
    },
  },
});
