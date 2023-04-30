<template>
  <div>
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
            data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
      <Header v-if="$route.name!=='login'"></Header>
      <Sidebar v-if="$route.name!=='login'"></Sidebar>
      <router-view v-if="(user && user.id) || $route.name==='login'"></router-view>
      <Loader v-if="loading"></Loader>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Sidebar from "./components/Sidebar";
  import Loader from "./components/Loader";
  import {mapState} from 'vuex'

  export default {
    components: {
      Loader,
      Header,
      Sidebar
    },
    computed: {
      ...mapState(['loading', 'user'])
    }
  }
</script>

<style lang="scss">
  @import "styles/style";
</style>
