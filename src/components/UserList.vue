<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb bg-white">
      <div class="row align-items-center">
        <div class="w-100">
          <div class="d-md-flex justify-content-end w-100 pr-3">
            <router-link to="/create-user"
                    class="btn btn-success d-md-block pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">Создать пользоваткля</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="white-box">
            <h3 class="box-title">Список пользователей</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">ФИО</th>
                  <th class="border-top-0">Логин</th>
                  <th class="border-top-0">Роль</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user, idx) in users " :key="idx">
                  <td>{{++idx}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.username}}</td>
                  <td>{{getRoleName(user)}}</td>
                  <td>
                    <i @click="deleteUserAlert(user)" class="fas fa-trash-alt text-danger cursor-pointer"></i>
                  </td>
                  <td>
                    <router-link :to="`/update-user/${user.id}`" class="text-dark">
                    <i class="fas fa-edit cursor-pointer"></i>
                    </router-link>
                  </td>
                </tr>
                </tbody>
              </table>
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
    computed: {
      ...mapState(['users', 'roles'])
    },
    created() {
      this.$store.dispatch('getUsers')
      this.getRoles()
    },
    methods: {
      ...mapActions(['deleteUser', 'getRoles']),
      deleteUserAlert(user) {
        const value = confirm(`Уверены, что хотите удалить пользователя ${user.name}`)
        value && this.deleteUser(user.id)
      },
      getRoleName(user) {
        return (this.roles.length && this.roles.find(role => role.id === user.role_id).name) || ''
      }
    }
  }
</script>