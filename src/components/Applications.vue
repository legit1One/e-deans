<template>
  <div class="page-wrapper pt-4">
    <div class="page-breadcrumb bg-white">
      <div class="row align-items-center">
        <div class="w-100">
          <div class="d-md-flex justify-content-end w-100 pr-3">
            <router-link to="/create-application"
                    class="btn btn-success d-md-block pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">Создать заявление</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="white-box">
            <h3 class="box-title">Список заявок</h3>
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Тип заявки</th>
                  <th class="border-top-0">Дата</th>
                  <th class="border-top-0">Ссылка</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(application, idx) in applications " :key="idx">
                  <td>{{++idx}}</td>
                  <td>{{getApplicationName(application)}}</td>
                  <td>{{application.created_at}}</td>
                  <td>
                    <a v-if="application.uri && isValidURL(application.uri)"
                            :href="application.uri">{{application.uri}}</a>
                    <span class="text-success" v-else-if="!application.uri">В обработке</span>
                    <span class="text-danger" v-else>Отказано</span>
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
      ...mapState(['applications', 'applicationTypes'])
    },
    mounted() {
      this.getApplicationTypes()
      this.getApplications()
    },
    methods: {
      ...mapActions(['getApplications', 'getApplicationTypes']),
      getApplicationName(application) {
        return (this.applicationTypes.length && this.applicationTypes.find(type => type.id === application.application_type_id).description) || ''
      },
      isValidURL(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
      }
    }
  }
</script>