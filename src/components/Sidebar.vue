<template>
  <aside class="left-sidebar" data-sidebarbg="skin6">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <ul id="sidebarnav">

          <li class="sidebar-item" v-if="isStudent">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/profile" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Профиль</span>
            </router-link>
          </li>

          <li class="sidebar-item" v-if="isStudent">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/applications" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Заявления</span>
            </router-link>
          </li>

          <li class="sidebar-item" v-if="isAdmin">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/user-list" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Пользователи</span>
            </router-link>
          </li>

          <li class="sidebar-item" v-if="isAdmin">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/static-values" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Поля заявок</span>
            </router-link>
          </li>

          <li class="sidebar-item" v-if="isAdmin">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/all-applications" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Все заявления</span>
            </router-link>
          </li>

          <li class="sidebar-item" v-if="!isStudent">
            <router-link class="sidebar-link waves-effect waves-dark sidebar-link"
                    to="/sign-docs" aria-expanded="false"><i class="fa fa-table"
                    aria-hidden="true"></i><span class="hide-menu">Подписать</span>
            </router-link>
          </li>

          <li class="text-center p-20 upgrade-btn p-2">
            <div class="btn btn-block btn-danger text-white" @click="logoutSession">Выйти
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['user']),
      isStudent() {
        return this.user && this.user.role && this.user.role.name === 'STUDENT'
      },
      isAdmin() {
        return this.user && this.user.role && this.user.role.name === 'ADMIN'
      },
    },
    methods: {
      ...mapActions(['logout']),
      async logoutSession() {
        await this.logout()
        this.$router.push('/login')
      }
    }
  }
</script>