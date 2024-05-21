<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>追蹤名單</h3>
  </section>
  <section>
    <div v-for="people in currentUser?.data?.data[0]?.following" :key="people._id">
      <div class="follwer d-flex px-3 py-5 mt-3 position-relative">
      <div class="user d-flex align-items-center">
        <div class="imgContainer mx-1 me-3">
            <img :src="people.photo" alt="userPhoto">
        </div>
        <div>
          <div class="userName">{{people.name}}</div>
          <!-- <div class="date">追蹤時間：{{people.date}}</div>
          <div class="followDate">您已追蹤了 20 天！</div> -->
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
  },
  methods: {
    ...mapActions(usersStore, ['getUser']),
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
