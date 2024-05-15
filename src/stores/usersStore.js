import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('usersStore', {
  state: () => ({
    currentUser: '',
    errorMessages: '',
  }),
  actions: {
    // 驗證使用者是否為登入狀態
    async toAuth() {
      const userToken = document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/) ? document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/)[1] : '';
      axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      try {
        const currentUser = await axios.post(`${import.meta.env.VITE_HOST}/users/check`);
        this.currentUser = currentUser?.data?.user;
        return true;
      } catch {
        return false;
      }
    },

    async getUser(id) {
      try {
        const currentUser = await axios.get(id ? `${import.meta.env.VITE_HOST}/users?_id=${id}` : `${import.meta.env.VITE_HOST}/users?`);
        this.currentUser = currentUser;
      } catch (err) {
        this.errorMessages = err;
      }
    },
  },
});
