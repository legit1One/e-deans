<template>
  <div class="page-wrapper pt-4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="white-box">
            <h3 class="box-title">{{applicationType.description}}</h3>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead class="thead-dark">
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Роль</th>
                  <th class="border-top-0">Участвует в подписании</th>
                </tr>
                </thead>
                <draggable
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        v-model="allSigners"
                        tag="tbody">
                  <template v-for="(signer, idx) in allSigners">
                    <transition-group type="transition" :name="!drag ? 'flip-list' : null" tag="tr" :key="signer.id">
                      <td :key="`id${signer.id}`">{{idx + 1}}</td>
                      <td :key="`name${signer.id}`">{{signer.name}}</td>
                      <td :key="`switch${signer.id}`">
                        <div class="custom-control custom-switch ml-4">
                          <input type="checkbox" class="custom-control-input" :id="`signer${idx}`"
                                  :checked="signer.isSigner">
                          <label class="custom-control-label" :for="`signer${idx}`" @click.prevent.stop="toggleSigner(signer, idx)"></label>
                        </div>
                      </td>
                    </transition-group>
                  </template>
                </draggable>
              </table>
            </div>
            <div class="form-group">
              <div class="col-sm-12 justify-content-end d-flex">
                <button class="btn btn-success btn-lg "
                        @click="updateOrders">Сохранить
                </button>
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
  import draggable from "vuedraggable";

  export default {
    components: {
      draggable
    },
    data: () => ({
      allSigners: [],
      drag: false
    }),
    computed: {
      ...mapState(['roles', 'applicationType']),
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    },
    created() {
      let promises = [this.getRoles(), this.getApplicationType(this.$route.params.id)]
      Promise.all(promises).then(() => {
        this.allSigners = this.roles.map(role => {
          role.isSigner = this.applicationType.signer_orders.includes(role.id)
          return role
        })
        this.allSigners = this.allSigners.filter(signer => signer.name !== 'STUDENT')
        this.sortSigners(this.applicationType.signer_orders)
      })
    },
    methods: {
      ...mapActions(['getApplicationType', 'getRoles', 'updateApplicationType']),
      getRoleName(id) {
        if (this.roles && this.roles.length) {
          return this.roles.find(role => role.id === id).name
        }
      },
      updateOrders() {
        const signers = this.allSigners.filter(signer => signer.isSigner)
        let applicationType = {...this.applicationType}
        applicationType.signer_orders = signers.map(signer => signer.id)
        this.updateApplicationType(applicationType)
        this.sortSigners(applicationType.signer_orders)
      },
      sortSigners(orders) {
        let result = []

        orders.forEach((id) => {
          let found = false;
          this.allSigners = this.allSigners.filter(function(item) {
            if(!found && item.id === id) {
              result.push(item);
              found = true;
              return false;
            } else
              return true;
          })
        })

        this.allSigners = [...result, ...this.allSigners]
      },
      isDisabled(signer) {
        return this.allSigners.filter(a => a.isSigner).length === 1 && signer.isSigner
      },
      toggleSigner(signer, idx) {
        if(this.isDisabled(signer)) {
          alert('Должен быть как минимум 1 подписывающий')
          return
        }
        this.$set(signer, 'isSigner', !signer.isSigner)
        this.$set(this.allSigners, idx, signer)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .custom-control-label {
    transform: scale(1.5);
  }
</style>