<template>
  <div>
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
          <div class="col-12 d-flex">
            <div class="card">
              <div class="card-body">
                <DoughnutChart :data="[
                    statistics.accepted_applications,
                    statistics.rejected_applications
                  ]"
                        :labels="['Подписанные заявки', 'Отказанные заявки']"
                ></DoughnutChart>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <DoughnutChart :data="[
                    statistics.all_applications - statistics.processed_applications,
                    statistics.processed_applications
                  ]"
                        :labels="['Необработанные заявки', 'Обработанные заявки']"
                ></DoughnutChart>
              </div>
            </div>
            <div class="card w-50 d-flex justify-content-center">
              <div class="card-body w-75">
                <div class="d-flex justify-content-between">
                  <div><b>Среднее время обработки заявок:</b></div>
                  <div>1 час</div>
                </div>
                <div class="d-flex justify-content-between">
                  <div><b>Общее количество заявок:</b></div>
                  <div>{{statistics.all_applications}} шт.</div>
                </div>
                <div class="d-flex justify-content-between">
                  <div><b>Общее количество обработанных заявок:</b></div>
                  <div>{{statistics.processed_applications}} шт.</div>
                </div>
                <div class="d-flex justify-content-between">
                  <div><b>Общее количество подтвержденных заявок:</b></div>
                  <div>{{statistics.accepted_applications}} шт.</div>
                </div>
                <div class="d-flex justify-content-between">
                  <div><b>Общее количество отказанных заявок:</b></div>
                  <div>{{statistics.rejected_applications}} шт.</div>
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
  import DoughnutChart from "./DoughnutChart";

  export default {
    components: {
      DoughnutChart
    },
    computed: {
      ...mapState(['statistics'])
    },
    mounted() {
      this.getStatistics()
    },
    methods: {
      ...mapActions(['getStatistics']),
    }
  }
</script>