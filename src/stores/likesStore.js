import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('likesStore', {
  state: () => ({
    likes: [],
    errMessage: {},
  }),
  actions: {
    // 取得按讚
    async getLikes(post = undefined, user = undefined, id = undefined) {
      try {
        let likes;
        if (post && user) {
          likes = await axios.get(`${import.meta.env.VITE_HOST}/likes?post=${post}&user=${user}`);
        } else if (post) {
          likes = await axios.get(`${import.meta.env.VITE_HOST}/likes?post=${post}`);
        } else if (user) {
          likes = await axios.get(`${import.meta.env.VITE_HOST}/likes?user=${user}`);
        } else {
          likes = await axios.get(`${import.meta.env.VITE_HOST}/likes?_id=${id}`);
        }
        this.likes = likes;
      } catch (err) {
        this.errMessage = err;
      }
    },

    // 送出按讚
    async postLike(postId, userId) {
      try {
        const postLikeBody = { post: postId, user: userId };
        await axios.post(`${import.meta.env.VITE_HOST}/likes`, postLikeBody);
      } catch (err) {
        this.errMessage = err;
      }
    },

    // 刪除單一按讚
    async deliteLike(likeId) {
      try {
        await axios.delete(`${import.meta.env.VITE_HOST}/likes/${likeId}`);
      } catch (err) {
        this.errMessage = err;
      }
    },
  },
});
