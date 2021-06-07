<template>
  <div class="page-wrapper pt-4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="white-box">
            <h3 class="box-title">Список заявок</h3>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="thead-dark">
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Роль</th>
                  <th class="border-top-0"></th>
                </tr>
                </thead>
                <tr v-for="(type, idx) in types " :key="idx">
                  <td>{{idx + 1}}</td>
                  <td>
                    {{type.description}}
                  </td>
                  <td>
                    <router-link :to="`signer-orders/${type.id}`">
                      Изменить очередь подписывающих
                    </router-link>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState} from "vuex";

  export default {
    data: () => ({
      types: []
    }),
    created() {
      this.getApplicationTypes()
        .then((types) => {
          this.types = types
        })
    },
    computed: {
      ...mapState(['applicationType'])
    },
    methods: {
      ...mapActions(['getApplicationTypes']),
    }
  }
</script>
<style lang="scss" scoped></style>