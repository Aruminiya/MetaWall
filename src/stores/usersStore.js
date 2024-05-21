import axios from 'axios';
import { defineStore } from 'pinia';

import Cookies from 'js-cookie';

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

    // 取得使用者
    async getUser(id) {
      try {
        const currentUser = await axios.get(id ? `${import.meta.env.VITE_HOST}/users?_id=${id}` : `${import.meta.env.VITE_HOST}/users`);
        console.log(currentUser);
        this.currentUser = currentUser;
        return currentUser;
      } catch (err) {
        this.errorMessages = err;
        return err;
      }
    },

    // 登入或註冊
    async loginAndSignup(user, mode) {
      try {
        const loginUser = await axios.post(`${import.meta.env.VITE_HOST}/users/${mode}`, user);
        const { token, data } = loginUser.data;

        delete data.following;
        delete data.follower;

        // 如果模式室登入 將 token 存入 cookie，設定有效期為一個禮拜
        if (mode === 'logIn') {
          Cookies.set('MetaWall_user_token', token, { expires: 7 });
          Cookies.set('MetaWall_user', JSON.stringify(data), { expires: 7 });
        }

        return loginUser;
      } catch (err) {
        return err;
      }
    },

    // 登出
    logout() {
      Cookies.remove('MetaWall_user_token');
      Cookies.remove('MetaWall_user');
    },

    // 追蹤使用者
    async userFollow(userId, followingId) {
      try {
        const followUser = await axios.patch(`${import.meta.env.VITE_HOST}/users/${userId}/follow`, { following: followingId });
        return followUser;
      } catch (err) {
        this.errorMessages = err;
        console.log(err);
        return err;
      }
    },

    // 退追蹤使用者
    async userUnFollow(userId, followingId) {
      try {
        const followUser = await axios.patch(`${import.meta.env.VITE_HOST}/users/${userId}/unfollow`, { following: followingId });
        return followUser;
      } catch (err) {
        this.errorMessages = err;
        console.log(err);
        return err;
      }
    },
  },
});
