import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('isAuth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    // 驗證使用者是否為登入狀態
    toAuth(success, error) {
      const userToken = document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/) ? document.cookie.match(/(?:^|;\s*)MetaWall_user_token=([^;]*)/)[1] : '';
      axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
      axios.post(`${import.meta.env.VITE_HOST}/users/check`)
        .then(() => {
          this.isAuthenticated = true;
          return success;
        })
        .catch(() => error);
    },
  },
});
