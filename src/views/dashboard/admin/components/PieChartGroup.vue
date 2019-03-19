<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts' // echarts theme
import { debounce } from '@/utils'
import {groupGetStateCount} from '@/api/server'
require('echarts/theme/macarons')

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
  data () {
    return {
      chart: null,
      list: null
    }
  },
  mounted () {
    // this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy () {
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
      groupGetStateCount()
        .then(res => {
          this.list = res.data
          if (this.list) {
            this.initChart()
          }
        })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: { text: '运营车组' },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['运营车组数量', '未运营车组数量']
        },
        calculable: true,
        series: [
          {
            name: '运营车组比例',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '48%'],
            data: [
              { value: this.list.activeNum, name: '运营车组数量' },
              { value: this.list.passiveNum, name: '未运营车组数量' }
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
