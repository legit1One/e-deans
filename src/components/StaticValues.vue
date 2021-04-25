<template>
  <div class="page-wrapper pt-4">
    <div class="page-breadcrumb bg-white">
      <div class="row align-items-center">
        <div class="w-100">
          <div class="d-md-flex justify-content-end w-100 pr-3">
            <div @click="startCreateStaticValue"
                    class="btn btn-success d-md-block pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">
              Добавить поле
            </div>
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
                  <th class="border-top-0">Поле</th>
                  <th class="border-top-0">Значение</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(staticValue, idx) in staticValues " :key="idx">
                  <td>{{++idx}}</td>
                  <td>{{staticValue.name}}</td>
                  <td>{{staticValue.value}}</td>
                  <td>
                    <i class="fas fa-edit cursor-pointer" @click="startEditStaticValue(staticValue)"></i>
                  </td>
                  <td>
                    <i class="fas fa-trash-alt text-danger cursor-pointer"
                            @click="deleteStaticValue(staticValue.id)"></i>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <b-modal id="staticValueModal" title="Профиль заявителя" ok-title="Сохранить" ok-only
              @ok="!isNew ? editStaticValue(chosenValue) : createNewStaticValue()" v-if="chosenValue">
        <div class="card border-0">
          <div class="card-body py-0">
            <form class="form-horizontal form-material">
              <div class="form-group mb-4">
                <label class="col-md-12 p-0">Поле</label>
                <div class="col-md-12 border-bottom p-0">
                  <input type="text" placeholder="Введите название поля" required v-model="chosenValue.name"
                          class="form-control p-0 border-0"></div>
              </div>
              <div class="form-group mb-4">
                <label class="col-md-12 p-0">Значение</label>
                <div class="col-md-12 border-bottom p-0">
                  <input type="text" placeholder="Введите значение поля" required v-model="chosenValue.value"
                          class="form-control p-0 border-0"></div>
              </div>
            </form>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    data: () => ({
      chosenValue: null,
      isNew: false
    }),
    computed: {
      ...mapState(['staticValues'])
    },
    mounted() {
      this.getStaticValues()
    },
    methods: {
      ...mapActions(['getStaticValues', 'deleteStaticValue', 'editStaticValue', 'createStaticValue']),
      async startEditStaticValue(staticValue) {
        this.chosenValue = {...staticValue}
        await this.$nextTick()
        this.$bvModal.show('staticValueModal')
      },
      async startCreateStaticValue() {
        this.isNew = true
        this.chosenValue = {}
        await this.$nextTick()
        this.$bvModal.show('staticValueModal')
      },
      createNewStaticValue() {
        this.createStaticValue(this.chosenValue)
        this.isNew = false
      }
    }
  }
</script>