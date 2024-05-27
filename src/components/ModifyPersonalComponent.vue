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
          <input id="photoFile" class="d-none" type="file" @change="upLoadimage()">
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <v-form class="d-flex flex-column vForm" v-slot="{ errors }" @submit="editUserBtn()">
            <label for="name" class="my-2">暱稱</label>
            <v-field
                id="name"
                name="暱稱"
                type="text"
                class="MetaWall_input my-1"
                :class="{ 'is-invalid': errors['暱稱'] }"
                placeholder="請輸入暱稱" rules="required"
                v-model="modifyAreaData.name"
              ></v-field>
              <error-message name="暱稱" class="invalid-feedback"></error-message>

              <p class="my-2">性別</p>
              <div>
                <v-field
                  id="male"
                  name="性別"
                  type="radio"
                  :class="{ 'is-invalid': errors['性別'] }"
                  value="male" rules="required"
                  v-model="modifyAreaData.sex"
                ></v-field>
                <label for="male" class="mx-1">男性</label>
                &emsp;
                <v-field
                  id="female"
                  name="性別"
                  type="radio"
                  :class="{ 'is-invalid': errors['性別'] }"
                  value="female" rules="required"
                  v-model="modifyAreaData.sex"
                ></v-field>
                <label for="female" class="mx-1">女性</label>
                &emsp;
                <v-field
                  id="other"
                  name="性別"
                  type="radio"
                  :class="{ 'is-invalid': errors['性別'] }"
                  value="other" rules="required"
                  v-model="modifyAreaData.sex"
                ></v-field>
                <label for="other" class="mx-1">其他</label>
                <error-message name="性別" class="invalid-feedback"></error-message>
              </div>
              <error-message name="密碼" class="invalid-feedback"></error-message>
              <button type="submit" class="btn MetaWall_button
              btnShdow w-100 my-4 px-4">送出更新</button>
          </v-form>
        </div>
        {{ modifyAreaData }}
      </form>
      <form v-if="modifyMode==='modifyPassword'" class="modifyPassword m-5">
        <div class="d-flex flex-column justify-content-center align-items-center">
          <v-form class="d-flex flex-column vForm" v-slot="{ errors }" @submit="editPasswordBtn()">
            <label for="name" class="my-2">請輸入密碼</label>
            <v-field
              id="password"
              name="密碼"
              type="password"
              class="MetaWall_input my-1"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼" rules="min:8|required"
              v-model="editPassword.password"
            ></v-field>
            <error-message name="密碼" class="invalid-feedback"></error-message>

            <label for="name" class="my-2">請再次輸入密碼</label>
            <v-field
              id="checkPassword"
              name="檢查密碼"
              type="password"
              class="MetaWall_input my-1"
              :class="{ 'is-invalid': errors['檢查密碼'] }"
              placeholder="請再次輸入密碼" rules="min:8|required"
              v-model="checkPassword"
            ></v-field>
            <error-message name="檢查密碼" class="invalid-feedback"></error-message>
              <button type="submit" class="btn MetaWall_button
              btnShdow w-100 my-4 px-4">送出更新</button>
              <p class="errorMessage text-center">{{ passwordErrorMessage }}</p>
          </v-form>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'pinia';

// 把需要的語系 驗證 驗證規則引入
import * as VeeValidate from 'vee-validate';
import * as VeeValidateI18n from '@vee-validate/i18n';
import * as VeeValidateRules from '@vee-validate/rules';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';
import postsStore from '../stores/postsStore';
import usersStore from '../stores/usersStore';

// 中文語系 JSON
import zhTW from '../assets/zh_TW.json';
// 表單驗證規則全部引入使用
Object.keys(VeeValidateRules).forEach((rule) => {
  VeeValidate.defineRule(rule, VeeValidateRules[rule]);
});

// 讀取外部的資源
VeeValidateI18n.localize({
  zhTW,
});
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zhTW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

export default {
  components: {
    VForm: VeeValidate.Form,
    VField: VeeValidate.Field,
    ErrorMessage: VeeValidate.ErrorMessage,
  },
  data() {
    return {
      currentUserData: JSON.parse(Cookie.get('MetaWall_user')),
      selectedFile: null,
      modifyMode: 'modifyUser',
      modifyAreaData: {
        name: '',
        sex: '',
      },
      editPassword: {
        password: '',
      },
      checkPassword: '',
      passwordErrorMessage: '',
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
    async editUserBtn() {
      // eslint-disable-next-line no-underscore-dangle
      const res = await this.editUser(this.currentUserData._id, this.modifyAreaData);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '會員編輯成功',
        }).then(() => {
          this.$router.push('/community/postArea');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '發生錯誤',
          text: '請稍後嘗試',
        });
      }
    },
    async editPasswordBtn() {
      if (this.editPassword.password === this.checkPassword) {
        this.passwordErrorMessage = '';
        // eslint-disable-next-line no-underscore-dangle
        const res = await this.editUser(this.currentUserData._id, this.editPassword);
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '密碼修改成功',
          }).then(() => {
            this.$router.push('/community/postArea');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '發生錯誤',
            text: '請稍後嘗試',
          });
        }
      } else {
        this.passwordErrorMessage = '檢查密碼不正確';
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

.errorMessage{
  color: $MataWall_red;
}

.vForm{
  width: 250px;
}
</style>
