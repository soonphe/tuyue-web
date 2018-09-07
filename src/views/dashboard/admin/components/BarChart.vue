<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utils'
  import {statsGetClick} from '@/api/server'

  const animationDuration = 6000

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
        list: []
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
    created() {
      this.getList()
    },
    methods: {
      getList() {
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
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: [
              this.list[0].createDate,
              this.list[1].createDate,
              this.list[2].createDate,
              this.list[3].createDate,
              this.list[4].createDate,
              this.list[5].createDate,
              this.list[6].createDate
            ],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '电影',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [
              this.list[0].movies,
              this.list[1].movies,
              this.list[2].movies,
              this.list[3].movies,
              this.list[4].movies,
              this.list[5].movies,
              this.list[6].movies
            ],
            animationDuration
          },
            {
              name: '游戏',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [
                this.list[0].game,
                this.list[1].game,
                this.list[2].game,
                this.list[3].game,
                this.list[4].game,
                this.list[5].game,
                this.list[6].game
              ],
              animationDuration
            },
            {
              name: '书吧',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [
                this.list[0].book,
                this.list[1].book,
                this.list[2].book,
                this.list[3].book,
                this.list[4].book,
                this.list[5].book,
                this.list[6].book
              ],
              animationDuration
            },
            {
              name: '点餐',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [
                this.list[0].food,
                this.list[1].food,
                this.list[2].food,
                this.list[3].food,
                this.list[4].food,
                this.list[5].food,
                this.list[6].food
              ],
              animationDuration
            },
            {
              name: '城市',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [
                this.list[0].city,
                this.list[1].city,
                this.list[2].city,
                this.list[3].city,
                this.list[4].city,
                this.list[5].city,
                this.list[6].city
              ],
              animationDuration
            },
            {
              name: '城铁',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: [
                this.list[0].subway,
                this.list[1].subway,
                this.list[2].subway,
                this.list[3].subway,
                this.list[4].subway,
                this.list[5].subway,
                this.list[6].subway
              ],
              animationDuration
            }
          ]
        })
      }
    }
  }
</script>
