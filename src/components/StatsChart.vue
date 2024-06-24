<template>
  <Radar
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
  props: ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'],
  data() {
    return {
      chartData: {
        label: '',
        labels: [
            ['HP', `(${ this.hp })`],
            ['Attack', `(${ this.attack })`],
            ['Defense', `(${ this.defense })`],
            ['Speed', `(${ this.speed })`],
            ['Sp. Defense', `(${ this.specialDefense })`],
            ['Sp. Attack', `(${ this.specialAttack })`],
        ],
        datasets: [{
            label: 'Stats',
            data: [
                parseInt(this.hp),
                parseInt(this.attack),
                parseInt(this.defense),
                parseInt(this.speed),
                parseInt(this.specialDefense),
                parseInt(this.specialAttack),
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
                // suggestedMin: Math.min(
                //   parseInt(this.hp),
                //   parseInt(this.attack),
                //   parseInt(this.defense),
                //   parseInt(this.speed),
                //   parseInt(this.specialAttack),
                //   parseInt(this.specialDefense)),

                suggestedMax: Math.max(
                  parseInt(this.hp),
                  parseInt(this.attack),
                  parseInt(this.defense),
                  parseInt(this.speed),
                  parseInt(this.specialAttack),
                  parseInt(this.specialDefense))
            }
        },
      }
    }
  }
}
</script>