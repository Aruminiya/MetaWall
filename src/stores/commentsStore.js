import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('commentsStore', {
  state: () => ({
    comments: [],
    errMessage: {},
  }),
  actions: {
    // 取得留言
    async getComments(content = undefined) {
      try {
        const comments = await axios.get(content ? `${import.meta.env.VITE_HOST}/comments?content=${content}` : `${import.meta.env.VITE_HOST}/comments`);
        this.comments = comments;
      } catch (err) {
        this.errMessage = err;
      }
    },

    // 新增留言
    async postComments(comment) {
      try {
        const comments = await axios.post(`${import.meta.env.VITE_HOST}/comments`, comment);
        return comments;
      } catch (err) {
        this.errMessage = err;
        console.log(err);
        return err;
      }
    },
  },
});
