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
        <form class="d-flex flex-column">
          <input class="MetaWall_input my-1" type="email" placeholder="Email">
          <input class="MetaWall_input my-1" type="password" placeholder="Password">
          <button class="btn MetaWall_button mt-2" type="button">登入</button>
          <button class="btn mt-2" type="button">註冊</button>
        </form>
      </div>
    </section>
  </main>
</template>

<script>

export default {

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

</style>
