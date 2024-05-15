import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('isAuthStore', {
  state: () => ({
  }),
  actions: {
    // 驗證使用者是否為登入狀態
    async toAuth() {
      const userToken = document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/) ? document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/)[1] : '';
      axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      try {
        await axios.post(`${import.meta.env.VITE_HOST}/users/check`);
        return true;
      } catch {
        return false;
      }
    },
  },
});
