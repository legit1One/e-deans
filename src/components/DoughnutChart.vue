<template>
  <canvas ref="chart" width="300" height="700"></canvas>
</template>
<script>
  import {mapActions, mapState} from "vuex";
  import {
    ArcElement,
    Chart,
    DoughnutController,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
  } from 'chart.js'

  Chart.register(LineController, LineElement, PointElement, Legend, Tooltip, LinearScale, Title, DoughnutController, ArcElement);

  export default {
    props: ['data', 'labels'],
    computed: {
      ...mapState(['statistics'])
    },
    mounted() {
      this.getStatistics().then(() => {
        var ctx = this.$refs.chart.getContext('2d');

        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.labels,
            datasets: [{
              backgroundColor: this.getRandomColors(),
              data: this.data
            }]
          },
          options: {
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: 'index',
              callbacks: {
                label: function (tooltipItems, data) {
                  var i, label = [], l = data.datasets.length;
                  for (i = 0; i < l; i += 1) {
                    label[i] = data.datasets[i].label + ': ' + data.datasets[i].data[tooltipItems.index] + '%';
                  }
                  return label;
                }
              }
            }
          }
        })
      })
    },
    methods: {
      ...mapActions(['getStatistics']),
      getRandomColors() {
        let colors = [];

        for (let i of this.data) {

          let r = Math.floor(Math.random() * 255);
          let g = Math.floor(Math.random() * 255);
          let b = Math.floor(Math.random() * 255);
          colors.push("rgb(" + r + "," + g + "," + b + ")");
        }

        return colors
      }
    }
  }
</script>