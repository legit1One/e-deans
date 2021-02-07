<template>
  <div class="content login-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-6 order-md-2">
          <img src="@/assets/images/undraw_file_sync_ot38.svg" alt="Image" class="img-fluid">
        </div>
        <div class="col-md-6 contents">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="mb-4">
                <h3>Вход в <strong>E-deans</strong></h3>
                <p class="mb-4">Сервис автоматизации документооборота</p>
              </div>
              <div>
                <div class="form-group first">
                  <label for="username">Логин</label>
                  <input v-model="user.username" type="text" class="form-control" id="username">

                </div>
                <div class="form-group last mb-4">
                  <label for="password">Пароль</label>
                  <input v-model="user.password" type="password" class="form-control" id="password">

                </div>

                <button @click="signIn" class="btn text-white btn-block btn-primary">Войти</button>
                <button @click="studentSignIn" class="btn text-white btn-block btn-primary">Войти как студент</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data: () => ({
      user: {
        username: '',
        password: ''
      }
    }),
    methods: {
      ...mapActions(['login', 'studentLogin']),
      signIn() {
        this.login(this.user).then(() => {
          window.location.href = '/sign-docs'
        })
      },
      studentSignIn() {
        this.studentLogin(this.user).then(() => {
          window.location.href = '/applications'
        })
      }
    }
  }
</script>
<style lang="scss">
  .login-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    @media (max-width: 560px) {
      height: auto;
    }
  }
</style>