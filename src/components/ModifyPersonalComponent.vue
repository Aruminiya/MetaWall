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
            <img :src="currentUserData.photo" alt="userPhoto">
          </div>

          <label for="photoFile" class="photoFile m-2 px-4 py-1">上傳大頭照</label>
          <input id="photoFile" class="d-none" type="file" @change="upLoadimage($event)">
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div>
            <label for="name" class="my-2">暱稱</label><br>
            <input id="name" class="MetaWall_input" type="text" placeholder="請輸入暱稱"
            v-model="modifyAreaData.name">
            <br>
            <p class="my-2">性別</p>
            <label for="male">男性</label>
            <input id="male" class="mx-1" type="radio" name="gender" value="male"
            v-model="modifyAreaData.sex">&nbsp;
            <label for="female">女性</label>
            <input id="female" class="mx-1" type="radio" name="gender" value="female"
            v-model="modifyAreaData.sex">&nbsp;
            <label for="else">其他</label>
            <input id="else" class="mx-1" type="radio" name="gender" value="else"
            v-model="modifyAreaData.sex">&nbsp;
            <br>
            <button class="btn MetaWall_button btnShdow w-100 my-4 px-4">送出更新</button>
          </div>
        </div>
        {{ modifyAreaData }}
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
import { mapActions } from 'pinia';
import Cookie from 'js-cookie';
import postsStore from '../stores/postsStore';
import usersStore from '../stores/usersStore';

export default {
  data() {
    return {
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
      selectedFile: null,
      modifyMode: 'modifyUser',
      modifyAreaData: {
        name: '',
        sex: '',
      },
    };
  },
  methods: {
    ...mapActions(postsStore, ['toUploadPost']),
    ...mapActions(usersStore, ['changePassword', 'editUser']),
    async upLoadimage(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        console.log(this.selectedFile);
        this.toUploadPost(this.selectedFile).then((res) => {
          console.log(res);
          const newPhoto = res.data.fileUrl;
          console.log(newPhoto);
          // eslint-disable-next-line no-underscore-dangle
          this.editUser(this.currentUserData._id, { photo: newPhoto }).then(() => {
            this.currentUserData.photo = newPhoto;
            Cookie.set('MetaWall_user', JSON.stringify(this.currentUserData), { expires: 7 });
          });
        });
      }
    },
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
