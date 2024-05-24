<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>追蹤名單</h3>
  </section>
  <section>
    <div v-for="(people, index) in currentUser?.data?.data[0]?.following" :key="people._id">
      <div class="follwer d-flex px-3 py-5 mt-3 position-relative">
      <div class="user d-flex align-items-center">
        <div class="imgContainer mx-1 me-3">
            <img :src="people?.user.photo" alt="userPhoto">
        </div>
        <div>
          <div class="userName">{{people?.user.name}}</div>
          <div class="date">追蹤時間：{{calculatingFollowTime[index]}}</div>
          <div class="followDate">您已追蹤了 {{daysSince(people.createdAt)}} 天！</div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import Cookie from 'js-cookie';
import usersStore from '../stores/usersStore';

export default {
  data() {
    return {
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
    };
  },
  computed: {
    ...mapState(usersStore, ['currentUser']),

    calculatingFollowTime() {
      return this.currentUser?.data?.data[0].following
        .map((e) => this.convertToGMT8(e.createdAt));
    },
  },
  methods: {
    ...mapActions(usersStore, ['getUser']),

    // 時間轉換 GTM+8
    convertToGMT8(isoDate) {
      // 創建日期對象
      const date = new Date(isoDate);

      // 獲取 UTC 時間的毫秒數
      const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

      // 轉換為 GMT+8 時區
      const gmt8Time = new Date(utcTime + (8 * 3600000));

      // 格式化日期和時間
      const year = gmt8Time.getFullYear();
      const month = String(gmt8Time.getMonth() + 1).padStart(2, '0');
      const day = String(gmt8Time.getDate()).padStart(2, '0');

      const hours = String(gmt8Time.getHours()).padStart(2, '0');
      const minutes = String(gmt8Time.getMinutes()).padStart(2, '0');
      const seconds = String(gmt8Time.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    // 距今時間計算
    daysSince(isoDate) {
    // 取得今天的日期
      const today = new Date();

      // 取得輸入日期
      const pastDate = new Date(isoDate);

      // 計算兩個日期之間的毫秒差
      const diffTime = today - pastDate;

      // 將毫秒差轉換為天數
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    },

  },
  created() {
    // eslint-disable-next-line no-underscore-dangle
    this.getUser(this.currentUserData._id);
  },
};
</script>

<style lang="scss" scoped>

.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}

.follwer{
  height: 80px;
  border: solid 2px $MataWall_black;
  border-radius: 0.5rem;
  background-color: $MetaWall_white;
  box-shadow: 0 4px $MataWall_black;
  .date{
    opacity: 0.3;
  }
  .followDate{
    position: absolute;
    bottom: 1.5rem;
    right: 1rem;
  }
  @media screen and (max-width:480px){
    .followDate{
      position: relative;
      bottom: auto;
      right: auto;
    }
  }
}
</style>
