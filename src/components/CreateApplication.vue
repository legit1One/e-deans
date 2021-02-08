<template>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-xlg-9 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="form-horizontal form-material">
                <div class="form-group mb-4">
                  <label class="col-sm-12 p-0">Тип заявки</label>
                  <div class="col-sm-12 border-bottom p-0">
                    <select class="form-control p-0 border-0" v-model="applicationTypeId">
                      <option v-for="(applicationType, idx) in applicationTypes" :key="applicationType.id"
                              :value="applicationType.id">{{applicationType.description}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group mb-4">
                  <div class="col-sm-12">
                    <button class="btn btn-success"
                            @click="submitApplication">Запросить
                    </button>
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
      applicationTypeId: ''
    }),
    computed: {
      ...mapState(['applicationTypes'])
    },
    mounted() {
      this.getApplicationTypes()
    },
    methods: {
      ...mapActions(['getApplicationTypes', 'requestApplication']),
      submitApplication() {
        this.requestApplication({application_type_id: this.applicationTypeId})
        .then(() => {
          this.$router.push('/applications')
        })
      }
    }
  }
</script>