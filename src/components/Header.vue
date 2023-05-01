<template>
  <header class="topbar" data-navbarbg="skin5">
    <nav class="navbar top-navbar navbar-expand-md navbar-dark">
      <div class="navbar-header" data-logobg="skin6">
        <router-link class="navbar-brand" to="/dashboard">
          <b class="logo-icon">
            <img src="@/assets/images/logo-icon.png" alt="homepage" width="50" height="47"/>
          </b>
          <span class="logo-text">
            E-DEANS
          </span>
        </router-link>
        <div class="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                href="javascript:void(0)"><i class="ti-menu ti-close"></i></div>
      </div>
      <div class="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
        <ul class="navbar-nav d-none d-md-block d-lg-none">
          <li class="nav-item">
            <div class="nav-toggler nav-link waves-effect waves-light text-white"
                    href="javascript:void(0)"><i class="ti-menu ti-close"></i></div>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto d-flex align-items-center">
          <li>
            <a class="profile-pic" href="#">
              <span class="text-white font-medium" v-if="user">{{user.name}}</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    computed: {
      ...mapState(['user'])
    },
    mounted() {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>