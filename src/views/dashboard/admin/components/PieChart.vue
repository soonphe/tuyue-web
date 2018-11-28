<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import {statsGetStay} from '@/api/server'

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
      statsGetStay()
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
        title: { text: '每日停留统计' },
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
            name: '停留比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '48%'],
            data: [
              { value: this.list[0].moviesTime, name: '电影' },
              { value: this.list[0].gameTime, name: '游戏' },
              { value: this.list[0].bookTime, name: '书吧' },
              { value: this.list[0].foodTime, name: '点餐' },
              { value: this.list[0].cityTime, name: '城市' },
              { value: this.list[0].subwayTime, name: '城铁' }
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
