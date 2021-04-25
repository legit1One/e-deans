<template>
  <div v-if="userInfo">
    <div class="page-wrapper">
      <div class="page-breadcrumb bg-white">
        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
            <h4 class="page-title text-uppercase font-medium font-14">Профиль</h4>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-xlg-9 col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="form-horizontal form-material">
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Имя:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{`${userInfo.lastname} ${userInfo.firstname} ${userInfo.middlename}`}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Роль:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.userRole.description}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Почта:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.email}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Дата рождения:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.birthdate.split('T')[0]}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Кафедра:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.department.cafedranameru}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Специальность:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.studentCard.specialization.name}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Курс:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.studentCard.course}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Национальность:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.nationality.nameru}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Форма обучения:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.studentCard.educationForm.degree.name}}</span>
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <label class="col-md-12 p-0">Номер:</label>
                    <div class="col-md-12 border-bottom p-0">
                      <span>{{userInfo.phone}}</span>
                    </div>
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
  import {mapActions, mapState} from "vuex";

  export default {
    computed: {
      ...mapState(['userInfo', 'user'])
    },
    mounted() {
      this.getUserCampusInfo(this.user.id).then(() => {
        this.$bvModal.show('userModal')
      })
    },
    methods: {
      ...mapActions(['getUserCampusInfo']),
    }
  }
</script>