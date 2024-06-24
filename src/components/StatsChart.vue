<template>
  <Radar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import {
    Radar
} from 'vue-chartjs'
import { 
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
 } from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default {
  name: 'StatsChart',
  components: { Radar },
  props: ['hp', 'attack', 'defense', 'speed', 'height', 'weight'],
  data() {
    return {
      chartData: {
        label: '',
        labels: [
            'HP', 
            'Attack', 
            'Defense',
            'Speed',
            'Height',
            'Weight',
        ],
        datasets: [{
            label: 'Stats',
            data: [
                parseInt(this.hp),
                parseInt(this.attack),
                parseInt(this.defense),
                parseInt(this.speed),
                parseInt(this.height),
                parseInt(this.weight),
            ],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
       ]
      },
      chartOptions: {
        responsive: true,
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: parseInt(this.hp)
            }
        },
      }
    }
  }
}
</script>