<template>
  <div class="page-wrapper pt-4">
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
                <tr v-for="(application, idx) in allApplications.data " :key="idx">
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
          <nav class="d-flex justify-content-center" v-if="allApplications.meta" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" :class="{active: allApplications.meta.current_page === page}"
                      v-for="page in allApplications.meta.last_page">
                <a class="page-link" href="javascript:void(0)" @click="getAllApplications(page)">{{page}}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['allApplications', 'applicationTypes'])
    },
    mounted() {
      this.getApplicationTypes()
      this.getAllApplications()
    },
    methods: {
      ...mapActions(['getAllApplications', 'getApplicationTypes']),
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