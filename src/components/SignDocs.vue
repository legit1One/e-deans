<template>
  <div class="page-wrapper">
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
                  <th class="border-top-0">Заявитель</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(signDoc, idx) in signDocs " :key="idx">
                  <td>{{++idx}}</td>
                  <td>
                    {{getApplicationName(signDoc.application)}}
                  </td>
                  <td><a href="javascript:void(0)"
                          @click="chosenDoc = signDoc;showModal(signDoc.application.applicant.id)">
                    {{signDoc.application.applicant.name}} </a>
                  </td>
                  <td><a href="javascript:void(0)" @click="showPasswordModal(signDoc, true)">Подписать</a></td>
                  <td><a href="javascript:void(0)" @click="showPasswordModal(signDoc, false)">Отказать</a></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="userModal" title="Профиль заявителя" v-if="chosenDoc && userInfo">
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Имя:</div>
        <div class="text-right">{{chosenDoc.application.applicant.name}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Роль:</div>
        <div class="text-right">{{userInfo.userRole.description}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Email:</div>
        <div class="text-right">{{userInfo.email}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Дата рождения:</div>
        <div class="text-right">{{userInfo.birthdate.split('T')[0]}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Кафедра:</div>
        <div class="text-right">{{userInfo.department.cafedranameru}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Специальность:</div>
        <div class="text-right">{{userInfo.studentCard.specialization.name}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Курс:</div>
        <div class="text-right">{{userInfo.studentCard.course}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Национальность:</div>
        <div class="text-right">{{userInfo.nationality.nameru}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Форма обучения:</div>
        <div class="text-right">{{userInfo.studentCard.educationForm.degree.name}}</div>
      </div>
      <div class="d-flex justify-content-between mt-2">
        <div class="font-weight-bold mr-2">Номер:</div>
        <div class="text-right">{{userInfo.phone}}</div>
      </div>
    </b-modal>
    <b-modal id="passwordModal" @hide="password=''" @ok.prevent="checkPassword" ok-only title="Подтвердите действие">
      <div class="card border-0">
        <div class="card-body py-0">
          <form class="form-horizontal form-material" @submit.prevent="checkPassword">
            <div class="form-group mb-4">
              <label class="col-md-12 p-0">Введите пароль от учетной записи</label>
              <div class="col-md-12 border-bottom p-0">
                <input type="password" placeholder="Введите пароль" required v-model="password"
                        class="form-control p-0 border-0">
              </div>
              <p v-if="isPasswordWrong" class="text-danger mt-2">Введен неверный пароль</p>
            </div>
          </form>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    data: () => ({
      chosenDoc: null,
      password: '',
      isPasswordWrong: false,
      signingDoc: null
    }),
    computed: {
      ...mapState(['signDocs', 'applicationTypes', 'userInfo', 'user'])
    },
    mounted() {
      this.getSignDocs()
      this.getApplicationTypes()
    },
    methods: {
      ...mapActions(['getSignDocs', 'getApplicationTypes', 'signApplication', 'getUserCampusInfo', 'verifySigning']),
      getApplicationName(application) {
        return (this.applicationTypes.length && this.applicationTypes.find(type => type.id === application.application_type_id).description) || ''
      },
      signDocument(doc) {
        const data = {
          "sign_doc_id": doc.id,
          signed: doc.signed
        }
        this.signApplication(data).then(() => {
          window.location.reload()
        })
      },
      showModal(userId) {
        this.getUserCampusInfo(userId).then(() => {
          console.log(this.userInfo)
          this.$bvModal.show('userModal')
        })
      },
      showPasswordModal(doc, flag) {
        this.signingDoc = {...doc, signed: flag}
        this.$bvModal.show('passwordModal')
      },
      checkPassword() {
        this.verifySigning({
          username: this.user.username,
          password: this.password
        }).then(() => {
          this.isPasswordWrong = false
          this.signDocument(this.signingDoc)
        }).catch(() => {
          this.isPasswordWrong = true
        })
      }
    }
  }
</script>