<template>
  <div>
    <div class="page-wrapper">
      <div class="page-breadcrumb bg-white">
        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
            <h4 class="page-title text-uppercase font-medium font-14">Статистика</h4>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 d-flex flex-wrap">
            <div class="card col-md-5 col-lg-4 col-12">
              <div class="card-body">
                <DoughnutChart :data="[
                    statistics.accepted_applications,
                    statistics.rejected_applications
                  ]"
                        :labels="['Подписанные заявки', 'Отказанные заявки']"
                ></DoughnutChart>
              </div>
            </div>
            <div class="card col-md-5 col-lg-4 col-12">
              <div class="card-body">
                <DoughnutChart :data="[
                    statistics.all_applications - statistics.processed_applications,
                    statistics.processed_applications
                  ]"
                        :labels="['Необработанные заявки', 'Обработанные заявки']"
                ></DoughnutChart>
              </div>
            </div>
            <div class="d-flex justify-content-center ml-lg-2">
              <div>
                <div class="card card-body flex-row d-flex align-items-center">
                  <div>
                    <i class="fas fa-2x fa-wrench text-danger"></i>
                  </div>
                  <div class="ml-3">
                    <div class="h4">1 час</div>
                    <div><b>Среднее время обработки заявок:</b></div>
                  </div>
                </div>
                <div class="card card-body flex-row d-flex align-items-center">
                  <div>
                    <i class="fas fa-2x fa-signal text-danger"></i>
                  </div>
                  <div class="ml-3">
                    <div class="h4">{{statistics.all_applications}} шт.</div>
                    <div><b>Общее количество заявок:</b></div>
                  </div>
                </div>
                <div class="card card-body flex-row d-flex align-items-center">
                  <div>
                    <i class="fas fa-2x fa-pencil-alt text-danger"></i>
                  </div>
                  <div class="ml-3">
                    <div class="h4">{{statistics.processed_applications}} шт.</div>
                    <div><b>Общее количество обработанных заявок:</b></div>
                  </div>
                </div>
                <div class="card card-body flex-row d-flex align-items-center">
                  <div>
                    <i class="fas fa-2x fa-chart-line text-danger"></i>
                  </div>
                  <div class="ml-3">
                    <div class="h4">{{statistics.accepted_applications}} шт.</div>
                    <div><b>Общее количество подтвержденных заявок:</b></div>
                  </div>
                </div>
                <div class="card card-body flex-row d-flex align-items-center">
                  <div>
                    <i class="fas fa-2x fa-chart-bar text-danger"></i>
                  </div>
                  <div class="ml-3">
                    <div class="h4">{{statistics.rejected_applications}} шт.</div>
                    <div><b>Общее количество отказанных заявок:</b></div>
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
