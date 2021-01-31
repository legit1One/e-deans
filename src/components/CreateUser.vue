<template>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-xlg-9 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="form-horizontal form-material">
                <div class="form-group mb-4">
                  <label class="col-md-12 p-0">ФИО</label>
                  <div class="col-md-12 border-bottom p-0">
                    <input type="text" v-model="user.name" placeholder="Фамилия Имя Отчество"
                            class="form-control p-0 border-0"></div>
                </div>
                <div class="form-group mb-4">
                  <label for="example-email" class="col-md-12 p-0">Email</label>
                  <div class="col-md-12 border-bottom p-0">
                    <input type="email" placeholder="johnathan@admin.com"
                            v-model="user.email"
                            class="form-control p-0 border-0" name="example-email"
                            id="example-email">
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label class="col-md-12 p-0">Пароль</label>
                  <div class="col-md-12 border-bottom p-0">
                    <input type="password" v-model="user.password" class="form-control p-0 border-0">
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label class="col-sm-12 p-0">Роль</label>
                  <div class="col-sm-12 border-bottom p-0">
                    <select class="form-control p-0 border-0" v-model="user.role_id">
                      <option v-for="(role, idx) in roles" :key="role.id" :value="role.id">{{role.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group mb-4">
                  <div class="col-sm-12">
                    <button class="btn btn-success" @click="saveUser">Сохранить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    data: () => ({
      user: {}
    }),
    computed: {
      ...mapState(['roles'])
    },
    mounted() {
      this.getRoles()
      if (this.$route.meta.isEdit) {
        this.getUser(this.$route.params.id).then((response) => this.user = response.data)
      }
    },
    methods: {
      ...mapActions(['getUser', 'updateUser', 'getRoles', 'createUser']),
      saveUser() {
        if (this.$route.meta.isEdit) {
          this.updateUser(this.user).then(() => {
            this.$router.push('/user-list')
          })
        } else {
          this.createUser(this.user).then(() => {
            this.$router.push('/user-list')
          })
        }
      }
    }
  }
</script>