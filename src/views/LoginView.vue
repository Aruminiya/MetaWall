<template>
  <main class="d-flex justify-content-center align-items-center">
    <section class="d-flex flex-wrap justify-content-center align-items-center p-5 m-5">
      <div class="imgContainer p-3">
        <img class="img-fluid" src="../../public/loginView_Picture.svg" alt="loginView_Picture"
        title="loginView_Picture" width="300">
      </div>
      <div class="loginForm p-3">
        <h1 class="logo text-center">MetaWall</h1>
        <h5 class="text-center">到原宇宙展開全新社交圈</h5>
        <br>
        <v-form class="d-flex flex-column" v-slot="{ errors }" @submit="onSubmit" >
            <v-field
              id="email"
              name="Email"
              type="email"
              class="MetaWall_input my-1"
              :class="{ 'is-invalid': errors['Email'] }"
              placeholder="請輸入 Email" rules="email|required"
              v-model="user.email"
            ></v-field>
            <error-message name="Email" class="invalid-feedback"></error-message>

            <v-field
              id="password"
              name="密碼"
              type="password"
              class="MetaWall_input my-1"
              :class="{ 'is-invalid': errors['密碼'] }"
              placeholder="請輸入密碼" rules="min:8|required"
              v-model="user.password"
            ></v-field>
            <error-message name="密碼" class="invalid-feedback"></error-message>

            <button class="btn MetaWall_button btnShdow mt-2" type="submit"
            :disabled="isLogin">登入</button>
            <router-link class="routerLink" to="signup">
              註冊帳號
            </router-link>

            <p class="errorMessage text-center">{{ errorMessage }}</p>
        </v-form>
      </div>
    </section>
  </main>
</template>

<script>
// 其他 Pinia Store
import { mapActions } from 'pinia';

// 把需要的語系 驗證 驗證規則引入
import * as VeeValidate from 'vee-validate';
import * as VeeValidateI18n from '@vee-validate/i18n';
import * as VeeValidateRules from '@vee-validate/rules';
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
      isLogin: false,
      user: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(usersStore, ['toAuth', 'loginAndSignup']),
    onSubmit() {
      this.isLogin = true;
      this.errorMessage = '';
      this.loginAndSignup(this.user, 'logIn').then((res) => {
        // 如果登入狀態 200 就跳轉頁面 反之回傳錯誤
        if (res.status === 200) {
          this.$router.push('/community/postArea');
        } else {
          this.errorMessage = `登入失敗：${res?.response?.data?.message}`;
          this.isLogin = false;
        }
      });
    },
  },
  async mounted() {
    // 驗證是否已有 Token 若有 直接倒向頁面
    const isAuth = await this.toAuth();
    if (isAuth) {
      this.$router.push('/community/postArea');
    }
  },
};
</script>

<style lang="scss" scoped>
main{
  width: 100vw;
  height: 100vh;
}

section{
  background: $MataWall_gray01 0% 0% no-repeat padding-box;
  box-shadow: -8px 8px 0px #00040029;
  border: 2px solid #000400;
  opacity: 1;
  position: relative;
  min-height: 450px;
  .loginForm{
    height: 100%;
    .logo{
      font-family: "Paytone One", sans-serif;
      font-weight: 400;
      font-size: 50px;
      color: $MataWall_blue;
    }
    @media screen and (max-width: 400px) {
       .logo{
        font-size: 28px;
        padding: 0;
       }
       h5{
        font-size: 16px;
       }
    }
  }
}

.errorMessage{
  color: $MataWall_red;
}

</style>
