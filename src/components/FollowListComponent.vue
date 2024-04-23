<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>追蹤名單</h3>
  </section>
  <section>
    <div v-for="people in follwer" :key="people._id">
      <div class="follwer d-flex px-3 py-5 mt-3 position-relative">
      <div class="user d-flex align-items-center">
        <div class="imgContainer mx-1 me-3">
            <img :src="people.image" alt="userPhoto">
        </div>
        <div>
          <div class="userName">{{people.name}}</div>
          <div class="date">追蹤時間：{{people.date}}</div>
          <div class="followDate">您已追蹤了 20 天！</div>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      follwer: [
        {
          _id: '6614ee8ba237680be218c797',
          name: '黃美玲',
          image: 'https://images.unsplash.com/photo-1577880216142-8549e9488dad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: '2024/04/01 08:00',
        },
        {
          _id: '6614f80f358a72d5f2119ec8',
          name: '陳彥廷',
          image: 'https://images.unsplash.com/photo-1600603405959-6d623e92445c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: '2024/04/02 17:00',
        },
        {
          _id: '6614ee8ba237680be218c795',
          name: '林美君',
          image: 'https://images.unsplash.com/photo-1585807515950-bc46d934c28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          date: '2024/04/03 15:00',
        },
      ],
    };
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
