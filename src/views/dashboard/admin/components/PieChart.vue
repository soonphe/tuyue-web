<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import {statsGetClick} from '@/api/server'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      list: null
    }
  },
  mounted() {
    // this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      statsGetClick()
        .then(res => {
          this.list = res.data
          if (this.list.length) {
            this.initChart()
          }
        })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['电影', '游戏', '书吧', '点餐', '城市','城铁']
        },
        calculable: true,
        series: [
          {
            name: '平板点击比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.list[0].movies, name: '电影' },
              { value: this.list[0].game, name: '游戏' },
              { value: this.list[0].book, name: '书吧' },
              { value: this.list[0].food, name: '点餐' },
              { value: this.list[0].city, name: '城市' },
              { value: this.list[0].subway, name: '城铁' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
