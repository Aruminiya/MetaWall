<template>
  <section class="title position-relative d-flex justify-content-center align-items-center mb-5">
    <h3>修改個人資料</h3>
  </section>
  <section>
    <div class="modifySwitchBtn ms-3 d-flex">
        <button class="btn modifyBtn px-4"
        :class="{ modifyBtnActive : modifyMode ==='modifyUser'}"
        @click="modifyMode='modifyUser'">暱稱修改</button>

        <button class="btn modifyBtn px-4"
        :class="{ modifyBtnActive : modifyMode ==='modifyPassword'}"
        @click="modifyMode='modifyPassword'">重設密碼</button>
    </div>
    <div class="modifyArea">
      <form  v-if="modifyMode==='modifyUser'" class="modifyUser m-5">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="imgContainer mx-1">
            <img src="https://images.unsplash.com/photo-1585807515950-bc46d934c28b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="userPhoto">
          </div>

          <label for="photoFile" class="photoFile m-2 px-4 py-1">上傳大頭照</label>
          <input id="photoFile" class="d-none" type="file">
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div>
            <label for="name" class="my-2">暱稱</label><br>
            <input id="name" class="MetaWall_input" type="text" placeholder="請輸入暱稱">
            <br>
            <p class="my-2">性別</p>
            <label for="male">男性</label>
            <input id="male" class="mx-1" type="radio" name="gender" value="male">&nbsp;
            <label for="female">女性</label>
            <input id="female" class="mx-1" type="radio" name="gender" value="female">&nbsp;
            <label for="else">其他</label>
            <input id="else" class="mx-1" type="radio" name="gender" value="else">&nbsp;
            <br>
            <button class="btn MetaWall_button btnShdow w-100 my-4 px-4">送出更新</button>
          </div>
        </div>
      </form>
      <form v-if="modifyMode==='modifyPassword'" class="modifyPassword m-5">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div>
            <label for="newPassword" class="my-2">輸入新密碼</label><br>
            <input id="newPassword" class="MetaWall_input px-3 py-2"
            type="text" placeholder="請輸入新密碼">
            <br>
            <label for="checkNewPassword" class="my-2">再次輸入</label><br>
            <input id="checkNewPassword" class="MetaWall_input px-3 py-2"
            type="text" placeholder="再次輸入新密碼">
            <br>
            <button class="btn MetaWall_button btnShdow w-100 my-4 px-4">重設密碼</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modifyMode: 'modifyUser',
    };
  },
};

</script>

<style lang="scss" scoped>
.modifyBtn{
  border: solid 2px $MataWall_black;
  border-bottom: 0 ;
  background-color: $MetaWall_white;
  border-radius: 0.5rem 0.5rem 0 0;
  &:active{
    border: solid 2px $MataWall_black;
    border-bottom: 0 ;
    background-color: $MetaWall_white;
  }
};
.modifyBtnActive{
  background-color: $MataWall_black;
  color: $MetaWall_white;
  &:active{
    background-color: $MataWall_black;
    color: $MetaWall_white;
  }
}

.modifyArea{
  border: solid 2px $MataWall_black;
  background-color: $MetaWall_white;
  border-radius:0.5rem ;
}
.photoFile{
  cursor: pointer;
  font-weight: 300;
  background-color: $MataWall_black;
  color: $MetaWall_white;
}

.imgContainer{
    border: solid 2px $MataWall_black;
    border-radius: 50%;
    width: 107px;
    height: 107px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
}
</style>
